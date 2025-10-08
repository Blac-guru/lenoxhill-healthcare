import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

interface ProductsProps {
  onToggleCart: () => void;
}

export default function Products({ onToggleCart }: ProductsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [ageFilter, setAgeFilter] = useState("All Ages");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Generate session ID for cart
  const sessionId = "guest-session";

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products', { 
      category: categoryFilter !== "All Categories" ? categoryFilter : undefined,
      targetAge: ageFilter !== "All Ages" ? ageFilter : undefined,
      search: searchTerm || undefined
    }],
  });

  const addToCartMutation = useMutation({
    mutationFn: async (productId: string) => {
      const response = await apiRequest("POST", "/api/cart", {
        sessionId,
        productId,
        quantity: 1
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart', sessionId] });
      toast({
        title: "Added to cart",
        description: "Product has been added to your cart successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add product to cart. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleAddToCart = (productId: string) => {
    addToCartMutation.mutate(productId);
  };

  if (isLoading) {
    return (
      <section id="products" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="w-full h-48 bg-gray-200"></div>
                <CardContent className="p-4">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4" data-testid="text-products-title">
            Online Pharmacy
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="text-products-description">
            Order prescription and over-the-counter medications online for convenient pickup or delivery.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input 
                type="text" 
                placeholder="Search medications, supplements..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                data-testid="input-product-search"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter} data-testid="select-category-filter">
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Categories">All Categories</SelectItem>
                <SelectItem value="Prescription">Prescription</SelectItem>
                <SelectItem value="Over-the-Counter">Over-the-Counter</SelectItem>
                <SelectItem value="Supplements">Supplements</SelectItem>
                <SelectItem value="Baby Care">Baby Care</SelectItem>
                <SelectItem value="Medical Devices">Medical Devices</SelectItem>
              </SelectContent>
            </Select>
            <Select value={ageFilter} onValueChange={setAgeFilter} data-testid="select-age-filter">
              <SelectTrigger>
                <SelectValue placeholder="All Ages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Ages">All Ages</SelectItem>
                <SelectItem value="Children">Children</SelectItem>
                <SelectItem value="Adults">Adults</SelectItem>
                <SelectItem value="Seniors">Seniors</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <Card key={product.id} className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow" data-testid={`card-product-${product.id}`}>
              <img 
                src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
                data-testid={`img-product-${product.id}`}
              />
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2" data-testid={`text-product-name-${product.id}`}>
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2" data-testid={`text-product-description-${product.id}`}>
                  {product.description}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-healthcare-blue-600" data-testid={`text-product-price-${product.id}`}>
                    KSh {product.price}
                  </span>
                  <Badge 
                    variant={product.inStock ? "default" : "destructive"}
                    className={product.inStock ? "bg-green-100 text-green-800" : ""}
                    data-testid={`badge-product-availability-${product.id}`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
                {product.prescriptionRequired && (
                  <Badge variant="outline" className="mb-3" data-testid={`badge-prescription-required-${product.id}`}>
                    Prescription Required
                  </Badge>
                )}
                <Button 
                  onClick={() => handleAddToCart(product.id)}
                  disabled={!product.inStock || addToCartMutation.isPending}
                  className="w-full bg-healthcare-green-500 hover:bg-healthcare-green-600 text-white py-2 rounded-lg transition-colors disabled:opacity-50"
                  data-testid={`button-add-to-cart-${product.id}`}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {products?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg" data-testid="text-no-products">
              No products found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
