import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ShoppingCart, Plus, Minus, Heart, Shield, Clock, CheckCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const sessionId = "guest-session";

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      if (!product) return;
      const response = await apiRequest("POST", "/api/cart", {
        sessionId,
        productId: product.id,
        quantity
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart', sessionId] });
      toast({
        title: "Added to cart",
        description: `${quantity} ${product?.name} added to your cart successfully.`,
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add product to cart. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleAddToCart = () => {
    addToCartMutation.mutate();
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted ? "Product removed from your wishlist." : "Product added to your wishlist.",
    });
  };

  if (!product) return null;

  const features = [
    "Quality assured medication",
    "Licensed pharmacy verification",
    "Temperature controlled storage",
    "Expiry date guaranteed",
    "Professional pharmacist available"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="product-detail-modal">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900" data-testid="modal-product-title">
            {product.name}
          </DialogTitle>
          <DialogDescription className="text-gray-600" data-testid="modal-product-category">
            Category: {product.category} • Target Age: {product.targetAge}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={product.imageUrl || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"} 
                alt={product.name}
                className="w-full h-full object-cover"
                data-testid="modal-product-image"
              />
            </div>
            
            {/* Product Badges */}
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant={product.inStock ? "default" : "destructive"}
                className={product.inStock ? "bg-green-100 text-green-800" : ""}
                data-testid="modal-availability-badge"
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Badge>
              
              {product.prescriptionRequired && (
                <Badge variant="outline" className="border-orange-200 text-orange-800" data-testid="modal-prescription-badge">
                  <Shield className="w-3 h-3 mr-1" />
                  Prescription Required
                </Badge>
              )}
              
              <Badge variant="secondary" data-testid="modal-category-badge">
                {product.category}
              </Badge>
            </div>
          </div>
          
          {/* Product Details */}
          <div className="space-y-6">
            {/* Price */}
            <div className="text-3xl font-bold text-healthcare-blue-600" data-testid="modal-product-price">
              KSh {product.price}
            </div>
            
            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2" data-testid="modal-description-title">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed" data-testid="modal-product-description">
                {product.description}
              </p>
            </div>
            
            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3" data-testid="modal-features-title">
                Quality Assurance
              </h3>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600" data-testid={`modal-feature-${index}`}>
                    <CheckCircle className="w-4 h-4 text-healthcare-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Prescription Warning */}
            {product.prescriptionRequired && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4" data-testid="modal-prescription-warning">
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-orange-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-orange-800 mb-1">Prescription Required</h4>
                    <p className="text-sm text-orange-700">
                      This medication requires a valid prescription from a licensed healthcare provider. 
                      Please ensure you have your prescription ready before purchasing.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="h-10 w-10 rounded-r-none"
                    data-testid="modal-quantity-decrease"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 font-semibold min-w-[60px] text-center" data-testid="modal-quantity-display">
                    {quantity}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                    className="h-10 w-10 rounded-l-none"
                    data-testid="modal-quantity-increase"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleWishlist}
                  className={`flex items-center ${isWishlisted ? 'text-red-600 border-red-200' : 'text-gray-600'}`}
                  data-testid="modal-wishlist-button"
                >
                  <Heart className={`w-4 h-4 mr-2 ${isWishlisted ? 'fill-current' : ''}`} />
                  {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                </Button>
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  onClick={handleAddToCart}
                  disabled={!product.inStock || addToCartMutation.isPending}
                  className="flex-1 bg-healthcare-green-500 hover:bg-healthcare-green-600 text-white py-3 text-lg font-semibold disabled:opacity-50"
                  data-testid="modal-add-to-cart"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {addToCartMutation.isPending ? "Adding..." : `Add ${quantity} to Cart`}
                </Button>
              </div>
            </div>
            
            {/* Additional Info */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2" data-testid="modal-additional-info">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                <span>Same-day delivery available in Nairobi</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Shield className="w-4 h-4 mr-2" />
                <span>Licensed pharmacy with quality guarantee</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Pharmacist consultation available</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}