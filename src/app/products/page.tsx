"use client";

import { useState, useEffect } from "react";
import { Product } from "../types";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { formatCurrency } from "../utility/formatCurrency";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  ArrowUpDown,
} from "lucide-react";

async function fetchPageInformation(category: string) {
  const [priceRangeResponse, brandsResponse, countsResponse] = await Promise.all([
    fetch(`http://localhost:8080/api/public/get/products/prices/${category}`),
    fetch(`http://localhost:8080/api/public/get/products/brands/${category}`),
    fetch(`http://localhost:8080/api/public/get/products/count/${category}`),
  ]);

  if (!priceRangeResponse.ok || !brandsResponse.ok || !countsResponse.ok) {
    throw new Error("Failed to fetch page information");
  }

  const priceRange = await priceRangeResponse.json();
  const brands = await brandsResponse.json();
  const counts = await countsResponse.json();

  return { priceRange, brands, counts };
}

async function fetchProducts(
  category: string,
  page: number,
  pageSize: number
): Promise<Product[]> {
  const response = await fetch(
    `http://localhost:8080/api/public/get/products/category/${category}?page=${page}&size=${pageSize}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();

  // Check if the response is an object with a content property
  if (data && data.content && Array.isArray(data.content)) {
    return data.content;
  } else if (data && Array.isArray(data)) {
    return data;
  }

  console.error("Unexpected API response structure:", data);
  return [];
}

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "all";
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const [sortOption, setSortOption] = useState("featured");

  // Mock filter states
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function loadPageInformation() {
      try {
        const { priceRange, brands, counts } = await fetchPageInformation(category);
        console.log("Fetched page information:", { priceRange, brands, counts }); // Debug log
        setPriceRange(priceRange);
        setSelectedBrands(brands.brands);
        setItemCount(counts.items);
        setTotalPages(counts.pages);
      } catch (error) {
        console.error("Error fetching page information:", error);
        setError("Failed to fetch page information");
      }
    }

    async function loadProducts() {
      try {
        const fetchedProducts = await fetchProducts(category, page, pageSize);
        console.log("Fetched products:", fetchedProducts); // Debug log
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products");
      }
    }

    loadPageInformation();
    loadProducts();
  }, [category, page, pageSize]);

  const renderHeading = () => {
    switch (category) {
      case "components":
        return "PC Components";
      case "systems":
        return "Desktops & Laptops";
      case "accessories":
        return "Accessories";
      default:
        return "All Products";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header with Sort Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">{renderHeading()}</h1>
        <div className="flex items-center mt-4 md:mt-0 space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="md:hidden"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <div className="flex items-center">
            <Label htmlFor="sort" className="mr-2 text-sm">
              Sort by:
            </Label>
            <select
              id="sort"
              className="h-9 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <aside
          className={`md:w-64 flex-shrink-0 ${isFiltersOpen ? "block" : "hidden md:block"
            }`}
        >
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={() => {
                  setPriceRange({ min: 0, max: 1000 });
                  setSelectedBrands([]);
                }}
              >
                Reset
              </Button>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="min-price" className="text-xs">
                      Min
                    </Label>
                    <Input
                      id="min-price"
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          min: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="max-price" className="text-xs">
                      Max
                    </Label>
                    <Input
                      id="max-price"
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          max: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Apply
                </Button>
              </div>
            </div>

            {/* Brand Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Brands</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {selectedBrands.map((brand) => (
                  <div key={brand} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`brand-${brand}`}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => {
                        if (selectedBrands.includes(brand)) {
                          setSelectedBrands(
                            selectedBrands.filter((b) => b !== brand)
                          );
                        } else {
                          setSelectedBrands([...selectedBrands, brand]);
                        }
                      }}
                    />
                    <label
                      htmlFor={`brand-${brand}`}
                      className="ml-2 text-sm text-gray-600"
                    >
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional filter sections would go here */}
            <div className="pt-2">
              <Button className="w-full">Apply Filters</Button>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {Array.isArray(products) && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((product) => (
                <div
                  key={product.sku}
                  className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <Link href={`/products/${product.sku}`} className="block">
                    <div className="aspect-square relative bg-gray-100">
                      <Image
                        src={product.mainImage || "/placeholder.png"}
                        alt={product.name || "Product image"}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 min-h-[2.5rem]">
                        {product.name || "Unknown Product"}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {product.brand || "Unknown Brand"}
                      </p>
                      <p className="text-xs text-gray-600 line-clamp-2 min-h-[2rem]">
                        {product.blurb || ""}
                      </p>
                      <p className="font-bold text-lg mt-2">
                        {formatCurrency(product.unitPrice) || "$0.00"}
                      </p>
                    </div>
                  </Link>
                  <div className="px-4 pb-4">
                    <Button className="w-full" size="sm">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500">
                {error || "No products found matching your criteria"}
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setPage(0);
                  setPriceRange({ min: 0, max: 1000 });
                  setSelectedBrands([]);
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {products.length > 0 && (
            <div className="mt-8 flex items-center justify-center">
              <nav
                className="inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-l-md"
                  disabled={page === 0}
                  onClick={() => setPage((prev) => Math.max(0, prev - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Page number buttons */}
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i}
                    variant={page === i ? "default" : "outline"}
                    size="sm"
                    className="hidden sm:inline-flex"
                    onClick={() => setPage(i)}
                  >
                    {i + 1}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-r-md"
                  disabled={page === totalPages - 1}
                  onClick={() =>
                    setPage((prev) => Math.min(totalPages - 1, prev + 1))
                  }
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </nav>
              <div className="ml-4 text-sm text-gray-500">
                Page {page + 1} of {totalPages}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;