import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Cart from "@/components/cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useWishlist } from "@/hooks/useWishlist";
import type { Product } from "@shared/schema";

export default function WishlistPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();
  const { wishlistIds, remove } = useWishlist();
  const sessionId = "guest-session";
  const queryClient = useQueryClient();

  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const formatPrice = (price: string | number | null) => {
    const amount = typeof price === "string" ? Number(price) : (price ?? 0);
    if (Number.isNaN(amount)) {
      return "KES 0.00";
    }

    return `KES ${amount.toLocaleString("en-KE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const wishlistProducts = (products || []).filter((product) =>
    wishlistIds.includes(product.id),
  );

  const handleRemove = (productId: string) => {
    remove(productId);
    toast({
      title: "Removed from wishlist",
      description: "Product removed from your wishlist.",
    });
  };

  const handleAddToCart = async (productId: string) => {
    await apiRequest("POST", "/api/cart", {
      sessionId,
      productId,
      quantity: 1,
    });

    queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });

    toast({
      title: "Added to cart",
      description: "Product has been added to your cart successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onOpenAppointment={() => {}}
        onToggleCart={() => setIsCartOpen(true)}
      />

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 text-healthcare-blue-600 mb-3">
              <Heart className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">
                Wishlist
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Saved Medications
            </h1>
            <p className="text-lg text-gray-600">
              Review and manage the items you have saved for later.
            </p>
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-6">
                Your wishlist is empty. Browse our pharmacy to save products.
              </p>
              <Link href="/products">
                <Button className="bg-healthcare-blue-600 hover:bg-healthcare-blue-700 text-white">
                  Browse Products
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistProducts.map((product) => (
                <Card
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-lg"
                >
                  <img
                    src={
                      product.imageUrl ||
                      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                    }
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <CardContent className="p-5 space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-healthcare-blue-600">
                        {formatPrice(product.price)}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemove(product.id)}
                      >
                        Remove
                      </Button>
                    </div>
                    <Button
                      onClick={() => handleAddToCart(product.id)}
                      className="w-full bg-healthcare-green-500 hover:bg-healthcare-green-600 text-white"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
