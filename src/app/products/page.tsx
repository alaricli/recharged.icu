"use client";

import { useState, useEffect } from "react";
import { Product } from "../types";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

async function fetchProducts(category: string): Promise<Product[]> {
  const response = await fetch(
    `http://localhost:8080/api/get/products/${category}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const products: Product[] = await response.json();
  return products;
}

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "all";
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const products = await fetchProducts(category);
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    loadProducts();
  }, [category]);

  const renderHeading = () => {
    switch (category) {
      case "component":
        return "PC Components";
      case "system":
        return "Desktops & Laptops";
      case "component":
        return "Accessories";
      default:
        return "All Products";
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center my-8">
        {renderHeading()}
      </h1>
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 container mx-auto">
        {products.map((product) => (
          <div key={product.id} className="items-center">
            <Link
              href={{ pathname: `/products/${product.id}` }}
              className="space-y-2"
            >
              <div>
                <Image
                  src={product.productImage}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="object-cover rounded-lg"
                />
              </div>
              <h2>{product.name}</h2>
              <p>${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
