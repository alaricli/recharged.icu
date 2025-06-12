import React from 'react';

export default function OrdersPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      <div className="bg-white rounded-lg shadow p-6">
        {/* Orders list would go here */}
        <div className="space-y-4">
          <p className="text-gray-500">Your order history will appear here.</p>

          {/* Placeholder for when there are no orders */}
          <div className="text-center py-8">
            <p className="text-gray-400">No orders found</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}