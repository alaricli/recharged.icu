"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";
import { useAuth } from "../context/auth_context";

// Create a simple login page that mimics the debug page's approach
const LoginPage = () => {
  const { isAuthenticated, checkAuth, logout } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Use a direct handler like in debug page
  const handleLogin = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      setWrongPassword(false);
      console.log("Login attempt with:", { username, password });

      const response = await fetch("http://localhost:8080/api/public/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
        credentials: "include",
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        console.log("Login successful");
        await checkAuth();
        setTimeout(() => {
          router.push("/account");
        }, 100);
      } else {
        console.log("Login failed");
        setWrongPassword(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setWrongPassword(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Username</label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          {wrongPassword && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md flex items-start gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>Invalid username and/or password</div>
            </div>
          )}

          <Button className="w-full" onClick={handleLogin} disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-gray-600">Don't have an account?</p>
            <Button
              onClick={() => router.push("/registration")}
              variant="outline"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
