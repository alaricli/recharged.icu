/**
 * Utility functions for cart operations
 */

/**
 * Interface for add to cart parameters
 */
interface CartRequestParams {
  sku: string;
  quantity: number;
  // You can add more parameters here as needed
}

/**
 * Interface for add to cart response
 */
interface AddToCartResponse {
  success: boolean;
  message?: string;
  cartId?: string;
  itemCount?: number;
  // You can add more response fields here as needed
}

// Dummy cart data
const dummyCart = {
  items: [
    {
      id: "1",
      name: "Sample Product 1",
      sku: "SKU001",
      price: 99.99,
      quantity: 1,
      imageUrl: "/placeholder.jpg",
    },
    {
      id: "2",
      name: "Sample Product 2",
      sku: "SKU002",
      price: 149.99,
      quantity: 2,
      imageUrl: "/placeholder.jpg",
    },
  ],
  cartSubTotal: 399.97,
};

/**
 * Adds an item to the cart
 * @param params Object containing SKU and quantity
 * @returns Promise resolving to the API response
 */
export async function addToCart(
  params: CartRequestParams
): Promise<AddToCartResponse> {
  try {
    const response = await fetch("http://localhost:8080/api/user/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
      credentials: "include", // Include cookies for authentication
    });

    if (response.ok) {
      return {
        success: true,
        message: "Item added to cart successfully",
      };
    } else {
      return {
        success: false,
        message: "Failed to add item to cart",
      };
    }
  } catch (error) {
    // Error handling will go here
    console.error(error);

    // Return error response
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

/**
 * Updates the quantity of an item in the cart
 */
export async function updateCart(
  params: CartRequestParams
): Promise<AddToCartResponse> {
  try {
    const response = await fetch("http://localhost:8080/api/user/cart/edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: "Item added to cart successfully",
      };
    } else {
      return {
        success: false,
        message: "Failed to add item to cart",
      };
    }
  } catch (error) {
    console.error("Failed to update cart item:", error);
    return {
      success: false,
      message: "Failed to update cart item",
    };
  }
}

export async function getCart() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return dummyCart;
}
