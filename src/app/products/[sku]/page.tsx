"use client";

import { useEffect, useState } from "react";
import { Product } from "@/app/types";
import { useParams } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "@/app/components/AddToCartButton";
import { formatCurrency } from "@/app/utility/formatCurrency";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  ChevronRight,
  Star,
  Truck,
  ShieldCheck,
  BadgeCheck,
  BadgeAlert,
  Heart,
  Share2,
  Minus,
  Plus,
} from "lucide-react";
import { addToCart } from "@/app/utility/cartUtils";

async function fetchProduct(sku: string): Promise<Product | null> {
  try {
    const response = await fetch(
      `http://localhost:8080/api/public/get/products/sku/${sku}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

const ProductPage = () => {
  const { sku } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    if (!sku) {
      setIsLoading(false);
      return;
    }

    async function loadProductData() {
      setIsLoading(true);
      const productData = await fetchProduct(sku as string);
      setProduct(productData);
      setIsLoading(false);
    }

    loadProductData();
  }, [sku]);

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && (!product?.stock || value <= product.stock)) {
      setQuantity(value);
    }
  };

  // Create a gallery of images, or use the main image if no productImages
  const galleryImages =
    product && product.productImages && product.productImages.length > 0
      ? product.productImages
      : product?.mainImage
        ? [product.mainImage]
        : [];

  // Function to render stock status
  const renderStockStatus = () => {
    if (!product) return null;

    if (product.stock === 0) {
      return (
        <span className="text-red-500 flex items-center">
          <BadgeAlert className="w-4 h-4 mr-1" /> Out of Stock
        </span>
      );
    } else if (product.stock < 5) {
      return (
        <span className="text-amber-500 flex items-center">
          <BadgeCheck className="w-4 h-4 mr-1" /> Low Stock: {product.stock}{" "}
          left
        </span>
      );
    } else {
      return (
        <span className="text-green-600 flex items-center">
          <BadgeCheck className="w-4 h-4 mr-1" /> In Stock
        </span>
      );
    }
  };

  // Add this handler function
  const handleAddToCart = async () => {
    if (!product) return;

    try {
      const result = await addToCart({
        sku: product.sku,
        quantity: quantity,
      });

      if (result.success) {
        // Handle success (could show a toast notification or update cart count)
        alert(`Added ${quantity} of ${product.name} to cart`);
      } else {
        // Handle the error state
        alert(`${result.message}`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-6 w-2/3 bg-gray-200 rounded mb-4"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 aspect-square bg-gray-200 rounded"></div>
            <div className="w-full md:w-1/2 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">
          Sorry, we couldn't find the product you're looking for.
        </p>
        <Button asChild>
          <Link href="/products">Return to Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <ol className="flex items-center flex-wrap">
          <li className="flex items-center">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
          </li>
          <li className="flex items-center">
            <Link href="/products" className="hover:text-blue-600">
              Products
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
          </li>
          <li className="flex items-center">
            <Link
              href={`/products?category=${product.category.toLowerCase()}`}
              className="hover:text-blue-600"
            >
              {product.category}
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
          </li>
          <li className="text-gray-700 font-medium truncate">{product.name}</li>
        </ol>
      </nav>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Product Images */}
        <div className="w-full md:w-1/2">
          {/* Main Image */}
          <div className="aspect-square relative bg-white rounded-lg overflow-hidden border border-gray-200 mb-4">
            <Image
              src={galleryImages[selectedImageIndex] || "/placeholder.png"}
              alt={product.name}
              fill
              className="object-contain p-4"
              priority
            />
          </div>

          {/* Thumbnails */}
          {galleryImages.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  className={`aspect-square relative bg-white rounded border ${selectedImageIndex === index
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-gray-200 hover:border-gray-300"
                    } overflow-hidden`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - image ${index + 1}`}
                    fill
                    className="object-contain p-1"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Product Details */}
        <div className="w-full md:w-1/2">
          {/* Product header info */}
          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <span className="font-medium text-gray-700 mr-2">
                SKU: {product.sku}
              </span>
              {product.modelNumber && (
                <>
                  <span className="mx-2">|</span>
                  <span>Model: {product.modelNumber}</span>
                </>
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>

            <div className="flex items-center mb-2">
              <div className="flex text-amber-400 mr-2">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4" />
              </div>
              <Link
                href="#reviews"
                className="text-sm text-blue-600 hover:underline"
              >
                4.0 (24 reviews)
              </Link>
            </div>

            <div className="flex items-center text-sm mb-4">
              <span className="text-gray-700">Brand: </span>
              <span className="font-medium ml-1">{product.brand}</span>
              {product.condition && (
                <>
                  <span className="mx-2">•</span>
                  <span className="text-gray-700">Condition: </span>
                  <span className="font-medium ml-1">{product.condition}</span>
                </>
              )}
              {product.color && (
                <>
                  <span className="mx-2">•</span>
                  <span className="text-gray-700">Color: </span>
                  <span className="font-medium ml-1">{product.color}</span>
                </>
              )}
            </div>

            <div className="text-3xl font-bold text-gray-900 mb-4">
              {formatCurrency(product.unitPrice)}
            </div>

            {/* Stock status */}
            <div className="mb-6">{renderStockStatus()}</div>
          </div>

          {/* Blurb */}
          {product.blurb && (
            <div className="mb-6">
              <p className="text-gray-700">{product.blurb}</p>
            </div>
          )}

          {/* Add to cart section */}
          <div className="p-4 bg-gray-50 rounded-lg mb-6">
            <div className="flex items-center mb-4">
              <div className="mr-4">
                <Label htmlFor="quantity" className="sr-only">
                  Quantity
                </Label>
                <div className="flex border border-gray-300 rounded-md overflow-hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-none"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max={product.stock || 99}
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(parseInt(e.target.value) || 1)
                    }
                    className="w-16 text-center border-0 focus:ring-0"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-none"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={
                      product.stock !== undefined && quantity >= product.stock
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <AddToCartButton
                onClick={handleAddToCart}
                quantity={quantity}
                disabled={product.stock === 0}
                sku={product.sku}
              />

              <Button
                variant="ghost"
                size="icon"
                className="ml-2"
                aria-label="Add to Wishlist"
              >
                <Heart className="h-5 w-5" />
              </Button>

              <Button variant="ghost" size="icon" aria-label="Share Product">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Shipping & Returns */}
            <div className="text-sm">
              <div className="flex items-center text-gray-700 mb-2">
                <Truck className="h-4 w-4 mr-2" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center text-gray-700">
                <ShieldCheck className="h-4 w-4 mr-2" />
                <span>30-day return policy</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-6">
              <button
                className={`py-2 text-sm font-medium border-b-2 ${activeTab === "description"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={`py-2 text-sm font-medium border-b-2 ${activeTab === "specifications"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                onClick={() => setActiveTab("specifications")}
              >
                Specifications
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="prose max-w-none mb-8">
            {activeTab === "description" && (
              <div>
                {product.description ? (
                  <p>{product.description}</p>
                ) : (
                  <p className="text-gray-500 italic">
                    No description available for this product.
                  </p>
                )}
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.category && (
                  <div>
                    <dt className="font-medium text-gray-700">Category</dt>
                    <dd>{product.category}</dd>
                  </div>
                )}
                {product.subCategory && (
                  <div>
                    <dt className="font-medium text-gray-700">Subcategory</dt>
                    <dd>{product.subCategory}</dd>
                  </div>
                )}
                {product.brand && (
                  <div>
                    <dt className="font-medium text-gray-700">Brand</dt>
                    <dd>{product.brand}</dd>
                  </div>
                )}
                {product.modelNumber && (
                  <div>
                    <dt className="font-medium text-gray-700">Model Number</dt>
                    <dd>{product.modelNumber}</dd>
                  </div>
                )}
                {product.condition && (
                  <div>
                    <dt className="font-medium text-gray-700">Condition</dt>
                    <dd>{product.condition}</dd>
                  </div>
                )}
                {product.color && (
                  <div>
                    <dt className="font-medium text-gray-700">Color</dt>
                    <dd>{product.color}</dd>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <Link
                    key={index}
                    href={`/products?tag=${tag}`}
                    className="px-3 py-1 text-xs bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
