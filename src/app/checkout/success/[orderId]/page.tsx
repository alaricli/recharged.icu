"use client";

import { Order } from "@/app/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

async function fetchOrder(orderId: string): Promise<Order | null> {
  try {
    const response = await fetch(`http://localhost:8080/api/user/order/${orderId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const orderData = await response.json();
    if (!response.ok) {
      throw new Error(orderData.message);
    }
    return orderData;
  } catch (error) {
    console.error("Error fetching order", error);
    return null;
  }
}

export default function SuccessPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    async function loadOrderData() {
      const orderData = await fetchOrder(orderId as string);
      setOrder(orderData);
    }

    loadOrderData();
  }, [orderId]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Order {order?.id} Confirmed</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <p className="text-gray-500">Your order has been successfully placed.</p>
          <p className="text-gray-500">You will receive an email confirmation shortly.</p>

          <div className="text-center py-8">
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}