import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";

interface AddToCartButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: "default" | "sm" | "lg";
  sku?: string;
  quantity?: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  onClick,
  isLoading = false,
  disabled = false,
  fullWidth = true,
  size = "lg",
  sku,
  quantity,
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || isLoading}
      size={size}
      className={`${
        fullWidth ? "w-full" : ""
      } flex items-center justify-center`}
      aria-label="Add to cart"
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <>
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </>
      )}
    </Button>
  );
};

export default AddToCartButton;
