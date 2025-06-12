"use client";

import { useAuth } from "../context/auth_context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Order } from "../types";
import { formatCurrency } from "../utility/formatCurrency";


export default function AccountPage() {
  const router = useRouter();
  const { isAuthenticated, userDetails, checkAuth, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch order history
  const fetchOrderHistory = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/api/user/order-history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include credentials for authentication
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.statusText}`);
      }

      const data = await response.json();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Unable to load your order history. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch orders when the component mounts or when the orders tab is selected
  useEffect(() => {
    if (activeTab === "orders" && isAuthenticated) {
      fetchOrderHistory();
    }
  }, [activeTab, isAuthenticated]);

  const getInitials = () => {
    if (!userDetails?.firstName) return "U";
    return userDetails.firstName[0].toUpperCase();
  };

  return (
    <div className="container mx-auto py-10 px-4">
      {/* User Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={userDetails?.avatarUrl} alt={"/default.svg"} />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">My Account</h1>
            <p className="text-muted-foreground">Welcome, {userDetails?.firstName || "User"}</p>
          </div>
        </div>
        <Button variant="outline" onClick={logout}>Sign Out</Button>
      </div>

      {/* Main Dashboard Content */}
      <Tabs
        defaultValue="overview"
        className="space-y-4"
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Account Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Personal Information</h3>
                <Separator className="my-2" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p>{userDetails?.firstName || "Not provided"}</p>
                    <p>{userDetails?.lastName || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email Address</p>
                    <p>{userDetails?.emailAddress || "Not provided"}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium">Recent Orders</h3>
                <Separator className="my-2" />
                <p className="text-muted-foreground py-2">No recent orders</p>
                {/* You can add your order items here */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Loading your orders...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-500">{error}</p>
                  <Button
                    variant="outline"
                    onClick={fetchOrderHistory}
                    className="mt-4"
                  >
                    Try Again
                  </Button>
                </div>
              ) : orders.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">
                  You haven't placed any orders yet
                </p>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <Card key={order.id} className="shadow-sm">
                      <CardHeader className="bg-muted/50 pb-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium">Order #{order.id}</p>
                            <p className="text-xs text-muted-foreground">
                              {order.created ? new Date(order.created).toLocaleDateString() : 'Date not available'}
                            </p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 font-medium`}>
                            {order.orderStatus}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        {order.orderItems.map((item, index) => (
                          <div key={index} className="flex items-start py-3 gap-4 border-b last:border-0">
                            <div className="w-16 h-16 relative flex-shrink-0">
                              <Image
                                src={item.product.mainImage}
                                alt={item.product.name}
                                fill
                                sizes="64px"
                                className="object-contain"
                              />
                            </div>
                            <div className="flex-grow">
                              <div className="flex justify-between">
                                <h4 className="font-medium">{item.product.name}</h4>
                                <p className="font-semibold">
                                  {formatCurrency(item.product.unitPrice * item.quantity)}
                                </p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {item.product.brand} · SKU: {item.product.sku}
                              </p>
                              <p className="text-sm">Qty: {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                        <div className="flex justify-between mt-4">
                          <p className="font-medium">Order Total</p>
                          <p className="font-bold">
                            {formatCurrency(order.orderItems.reduce(
                              (total, item) => total + item.product.unitPrice * item.quantity,
                              0
                            ))}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Addresses Tab */}
        <TabsContent value="addresses">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Shipping Addresses</CardTitle>
              <Button variant="outline" size="sm">Add Address</Button>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-4">
                You haven't added any addresses yet
              </p>
              {/* Add your addresses here */}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      defaultValue={userDetails?.firstName || ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      defaultValue={userDetails?.lastName || ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <input
                      type="email"
                      className="w-full p-2 border rounded-md"
                      defaultValue={userDetails?.emailAddress || ""}
                      disabled
                    />
                  </div>
                </div>
                <Button className="mt-4">Save Changes</Button>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium text-destructive">Danger Zone</h3>
                <p className="text-sm text-muted-foreground mt-2 mb-4">
                  Permanently delete your account and all associated data.
                </p>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
