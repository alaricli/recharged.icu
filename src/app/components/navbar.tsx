"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, UserRound, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../context/auth_context";
import { useCart } from "../context/cart_context";

export function Navbar() {
  const { isAuthenticated, checkAuth, logout } = useAuth();
  const { cart } = useCart();

  return (
    <div className="border-b">
      {/* top bar */}
      <nav className="bg-white py-3">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src={"/bar_logo.svg"}
                alt="rebooted.biz logo"
                width={300}
                height={75}
                className="w-auto h-12"
                priority
              />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-6">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-4 pr-10"
              />
              <Button
                variant="ghost"
                className="absolute right-0 top-0 h-full aspect-square p-0"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Account and Cart buttons */}
          <div className="flex items-center space-x-4">
            <div>
              {isAuthenticated ? (
                <Link href="/account">
                  <Button variant="outline" className="flex items-center">
                    <UserRound className="w-5 h-5 mr-2" />
                    Account
                  </Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button variant="outline" className="flex items-center">
                    <UserRound className="w-5 h-5 mr-2" />
                    Sign In
                  </Button>
                </Link>
              )}
            </div>


            <Link href="/cart">
              <Button
                variant="default"
                className="flex items-center text-white hover:opacity-90"
                style={{ backgroundColor: "#228b22" }}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Cart
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* bottom bar */}
      <nav className="bg-gray-50 py-3 shadow-sm">
        <div className="container mx-auto">
          <ul className="flex items-center justify-center text-base font-medium">
            <li>
              <Link
                href={{
                  pathname: "/products",
                  query: { category: "iphones" },
                }}
              >
                <Button variant="link" className="hover:text-blue-500">
                  iPhones
                </Button>
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: "/products",
                  query: { category: "macbooks" },
                }}
              >
                <Button variant="link" className="hover:text-blue-500">
                  MacBooks
                </Button>
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: "/products",
                  query: { category: "accessories" },
                }}
              >
                <Button variant="link" className="hover:text-blue-500">
                  Accessories
                </Button>
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: "/debug",
                }}
              >
                <Button variant="link" className="hover:text-blue-500">
                  Debug
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
