"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Minus, Plus, ShoppingCart } from "lucide-react";
import { formatCurrency } from "../utility/formatCurrency";
import { useAuth } from "../context/auth_context";
import { useCart } from "../context/cart_context";


const CartPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, checkAuth, logout } = useAuth();
  const { cart, setCart, updateCart } = useCart();

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="flex justify-center mb-4">
            <ShoppingCart className="h-16 w-16 text-gray-300" />
          </div>
          <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
          <Link href="/products" className="flex justify-center">
            <Button className="flex items-center">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="bg-white rounded-lg shadow-sm mb-6">
        {cart.items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-start sm:items-center p-4 border-b border-gray-200 last:border-0"
          >
            <div className="flex-shrink-0 w-20 h-20 relative mb-4 sm:mb-0 sm:mr-4">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover rounded-md"
                sizes="80px"
              />
            </div>

            <div className="flex-grow mr-4">
              <Link href={`/products/${item.sku}`}>
                <h3 className="font-medium text-lg hover:text-indigo-600 transition-colors">
                  {item.name}
                </h3>
              </Link>
              <p className="text-gray-500 text-sm">SKU: {item.sku}</p>
              <p className="font-medium">{formatCurrency(item.price)}</p>
            </div>

            <div className="flex items-center mt-4 sm:mt-0">
              <div className="flex border border-gray-300 rounded-md overflow-hidden mr-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-none"
                  onClick={() =>
                    updateCart(item.sku, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value > 0) {
                      updateCart(item.sku, value);
                    }
                  }}
                  className="w-12 text-center border-0 focus:ring-0 h-8 p-0"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-none"
                  onClick={() =>
                    updateCart(item.sku, item.quantity + 1)
                  }
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500 hover:text-red-500"
                onClick={() => updateCart(item.sku, 0)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">
            {formatCurrency(cart.cartSubTotal)}
          </span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-600">Calculated at checkout</span>
        </div>
        <div className="border-t border-gray-200 pt-4 mb-6">
          <div className="flex justify-between">
            <span className="text-lg font-bold">Estimated Total</span>
            <span className="text-lg font-bold">
              {formatCurrency(cart.cartSubTotal)}
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <Button
            className="w-full sm:w-auto"
            onClick={() => router.push("/checkout")}
          >
            Proceed to Checkout
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => router.push("/products")}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
