import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, X, Minus, Plus } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { CartItem, Product } from "@shared/schema";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const [checkoutData, setCheckoutData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });
  const [showCheckout, setShowCheckout] = useState(false);
  
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const sessionId = "guest-session";

  const { data: cartItems } = useQuery<CartItem[]>({
    queryKey: ['/api/cart', sessionId],
  });

  const { data: products } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (productId: string) => {
      await apiRequest("DELETE", `/api/cart/${sessionId}/${productId}`, undefined);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart', sessionId] });
      toast({
        title: "Item removed",
        description: "Product has been removed from your cart.",
      });
    }
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", `/api/cart/${sessionId}`, undefined);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart', sessionId] });
    }
  });

  const orderMutation = useMutation({
    mutationFn: async (data: typeof checkoutData & { total: string; items: string }) => {
      const response = await apiRequest("POST", "/api/orders", data);
      return response.json();
    },
    onSuccess: () => {
      clearCartMutation.mutate();
      toast({
        title: "Order placed",
        description: "Your order has been placed successfully. We'll contact you soon.",
      });
      setShowCheckout(false);
      setCheckoutData({ firstName: "", lastName: "", email: "", phone: "" });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    }
  });

  const getCartItemsWithProducts = () => {
    if (!cartItems || !products) return [];
    
    return cartItems.map(item => {
      const product = products.find(p => p.id === item.productId);
      return { ...item, product };
    }).filter(item => item.product);
  };

  const calculateTotal = () => {
    const items = getCartItemsWithProducts();
    return items.reduce((total, item) => {
      if (item.product) {
        return total + (parseFloat(item.product.price) * (item.quantity || 1));
      }
      return total;
    }, 0);
  };

  const handleCheckout = () => {
    const items = getCartItemsWithProducts();
    const total = calculateTotal();
    
    orderMutation.mutate({
      ...checkoutData,
      total: total.toFixed(2),
      items: JSON.stringify(items.map(item => ({
        productId: item.productId,
        productName: item.product?.name,
        quantity: item.quantity,
        price: item.product?.price
      })))
    });
  };

  const cartItemsWithProducts = getCartItemsWithProducts();
  const total = calculateTotal();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md" data-testid="sheet-cart">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2" data-testid="text-cart-title">
            <ShoppingCart className="w-5 h-5" />
            Shopping Cart
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {cartItemsWithProducts.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500" data-testid="text-cart-empty">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {cartItemsWithProducts.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg" data-testid={`cart-item-${item.productId}`}>
                    <img 
                      src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" 
                      alt={item.product?.name}
                      className="w-16 h-16 object-cover rounded"
                      data-testid={`img-cart-item-${item.productId}`}
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm" data-testid={`text-cart-item-name-${item.productId}`}>
                        {item.product?.name}
                      </h4>
                      <p className="text-sm text-gray-600" data-testid={`text-cart-item-price-${item.productId}`}>
                        KSh {item.product?.price}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 w-6 p-0"
                          onClick={() => {
                            // Would implement quantity decrease here
                          }}
                          data-testid={`button-decrease-quantity-${item.productId}`}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm" data-testid={`text-quantity-${item.productId}`}>
                          {item.quantity || 1}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 w-6 p-0"
                          onClick={() => {
                            // Would implement quantity increase here
                          }}
                          data-testid={`button-increase-quantity-${item.productId}`}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFromCartMutation.mutate(item.productId)}
                      data-testid={`button-remove-item-${item.productId}`}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold" data-testid="text-cart-total-label">Total:</span>
                  <span className="font-bold text-lg text-healthcare-blue-600" data-testid="text-cart-total">
                    KSh {total.toFixed(2)}
                  </span>
                </div>

                {!showCheckout ? (
                  <Button 
                    onClick={() => setShowCheckout(true)}
                    className="w-full bg-healthcare-blue-500 hover:bg-healthcare-blue-600"
                    data-testid="button-checkout"
                  >
                    Proceed to Checkout
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="First Name"
                        value={checkoutData.firstName}
                        onChange={(e) => setCheckoutData(prev => ({ ...prev, firstName: e.target.value }))}
                        data-testid="input-checkout-first-name"
                      />
                      <Input
                        placeholder="Last Name"
                        value={checkoutData.lastName}
                        onChange={(e) => setCheckoutData(prev => ({ ...prev, lastName: e.target.value }))}
                        data-testid="input-checkout-last-name"
                      />
                    </div>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={checkoutData.email}
                      onChange={(e) => setCheckoutData(prev => ({ ...prev, email: e.target.value }))}
                      data-testid="input-checkout-email"
                    />
                    <Input
                      type="tel"
                      placeholder="Phone"
                      value={checkoutData.phone}
                      onChange={(e) => setCheckoutData(prev => ({ ...prev, phone: e.target.value }))}
                      data-testid="input-checkout-phone"
                    />
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setShowCheckout(false)}
                        className="flex-1"
                        data-testid="button-checkout-back"
                      >
                        Back
                      </Button>
                      <Button 
                        onClick={handleCheckout}
                        disabled={orderMutation.isPending}
                        className="flex-1 bg-healthcare-green-500 hover:bg-healthcare-green-600"
                        data-testid="button-place-order"
                      >
                        {orderMutation.isPending ? "Placing..." : "Place Order"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
