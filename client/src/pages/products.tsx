import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ShoppingCart,
  Pill,
  Heart,
  Baby,
  Thermometer,
  Shield,
  Eye,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Cart from "@/components/cart";
import ProductDetailModal from "@/components/product-detail-modal";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";
import image from "@/assets/image1.jpeg";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [ageFilter, setAgeFilter] = useState("All Ages");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const sessionId = "guest-session";

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", categoryFilter, ageFilter, searchTerm],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (categoryFilter !== "All Categories")
        params.append("category", categoryFilter);
      if (ageFilter !== "All Ages") params.append("targetAge", ageFilter);
      if (searchTerm) params.append("search", searchTerm);

      const response = await fetch(`/api/products?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch products");
      return response.json();
    },
  });

  const addToCartMutation = useMutation({
    mutationFn: async (productId: string) => {
      const response = await apiRequest("POST", "/api/cart", {
        sessionId,
        productId,
        quantity: 1,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
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
    },
  });

  const handleAddToCart = (productId: string) => {
    addToCartMutation.mutate(productId);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
  };

  const closeProductDetail = () => {
    setIsProductDetailOpen(false);
    setSelectedProduct(null);
  };

  const categories = [
    {
      name: "Prescription",
      displayName: "Prescription Medications",
      icon: <Pill className="w-8 h-8" />,
      description:
        "Doctor-prescribed medications requiring valid prescriptions",
      count: products?.filter((p) => p.category === "Prescription").length || 0,
    },
    {
      name: "Over-the-Counter",
      displayName: "Over-the-Counter",
      icon: <Heart className="w-8 h-8" />,
      description: "Common medications available without prescription",
      count:
        products?.filter((p) => p.category === "Over-the-Counter").length || 0,
    },
    {
      name: "Supplements",
      displayName: "Health Supplements",
      icon: <Shield className="w-8 h-8" />,
      description: "Vitamins, minerals, and nutritional supplements",
      count: products?.filter((p) => p.category === "Supplements").length || 0,
    },
    {
      name: "Baby Care",
      displayName: "Baby Care",
      icon: <Baby className="w-8 h-8" />,
      description: "Products for infant and child healthcare",
      count: products?.filter((p) => p.category === "Baby Care").length || 0,
    },
    {
      name: "Medical Devices",
      displayName: "Medical Devices",
      icon: <Thermometer className="w-8 h-8" />,
      description: "Medical equipment and diagnostic tools",
      count:
        products?.filter((p) => p.category === "Medical Devices").length || 0,
    },
  ];

  const filteredProducts = products?.filter((product) => {
    const matchesCategory =
      categoryFilter === "All Categories" ||
      product.category === categoryFilter;
    const matchesAge =
      ageFilter === "All Ages" || product.targetAge === ageFilter;
    const matchesSearch =
      !searchTerm ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesAge && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onOpenAppointment={() => {}}
        onToggleCart={() => setIsCartOpen(!isCartOpen)}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-healthcare-green-600 to-healthcare-green-700 text-white py-20">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1
              className="text-4xl md:text-6xl font-bold mb-6"
              data-testid="text-pharmacy-hero-title"
            >
              Online Pharmacy
            </h1>
            <p
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200"
              data-testid="text-pharmacy-hero-description"
            >
              Order prescription and over-the-counter medications online for
              convenient pickup or delivery in Nairobi.
            </p>
            <div className="flex justify-center">
              <Button
                onClick={() => setIsCartOpen(true)}
                className="bg-white text-healthcare-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                data-testid="button-view-cart"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                View Cart
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pharmacy Information */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-healthcare-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-healthcare-green-600" />
              </div>
              <h3
                className="text-xl font-semibold text-gray-900 mb-2"
                data-testid="text-licensed-pharmacy-title"
              >
                Licensed Pharmacy
              </h3>
              <p
                className="text-gray-600"
                data-testid="text-licensed-pharmacy-description"
              >
                Fully licensed by the Pharmacy and Poisons Board of Kenya with
                qualified pharmacists on duty.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-healthcare-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-healthcare-blue-600" />
              </div>
              <h3
                className="text-xl font-semibold text-gray-900 mb-2"
                data-testid="text-quality-assurance-title"
              >
                Quality Assurance
              </h3>
              <p
                className="text-gray-600"
                data-testid="text-quality-assurance-description"
              >
                All medications are sourced from authorized distributors and
                stored under proper conditions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-healthcare-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Thermometer className="w-8 h-8 text-healthcare-teal-400" />
              </div>
              <h3
                className="text-xl font-semibold text-gray-900 mb-2"
                data-testid="text-temperature-controlled-title"
              >
                Temperature Controlled
              </h3>
              <p
                className="text-gray-600"
                data-testid="text-temperature-controlled-description"
              >
                Climate-controlled storage ensures medication efficacy and
                safety standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold text-gray-900 mb-4"
              data-testid="text-categories-title"
            >
              Product Categories
            </h2>
            <p
              className="text-xl text-gray-600"
              data-testid="text-categories-description"
            >
              Browse our comprehensive range of healthcare products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="bg-white hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setCategoryFilter(category.name)}
                data-testid={`card-category-${index}`}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-healthcare-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-healthcare-blue-600">
                    {category.icon}
                  </div>
                  <h3
                    className="text-xl font-semibold text-gray-900 mb-2"
                    data-testid={`text-category-name-${index}`}
                  >
                    {category.displayName}
                  </h3>
                  <p
                    className="text-gray-600 mb-4"
                    data-testid={`text-category-description-${index}`}
                  >
                    {category.description}
                  </p>
                  <Badge
                    variant="secondary"
                    data-testid={`badge-category-count-${index}`}
                  >
                    {category.count} products
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Search and Filter Controls */}
          <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
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
              <Select
                value={categoryFilter}
                onValueChange={setCategoryFilter}
                data-testid="select-category-filter"
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Categories">All Categories</SelectItem>
                  <SelectItem value="Prescription">Prescription</SelectItem>
                  <SelectItem value="Over-the-Counter">
                    Over-the-Counter
                  </SelectItem>
                  <SelectItem value="Supplements">Supplements</SelectItem>
                  <SelectItem value="Baby Care">Baby Care</SelectItem>
                  <SelectItem value="Medical Devices">
                    Medical Devices
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={ageFilter}
                onValueChange={setAgeFilter}
                data-testid="select-age-filter"
              >
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
          {isLoading ? (
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts?.map((product) => (
                <Card
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 group"
                  data-testid={`card-product-${product.id}`}
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={
                        product.imageUrl ||
                        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                      }
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      data-testid={`img-product-${product.id}`}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button
                        onClick={() => handleProductClick(product)}
                        variant="secondary"
                        size="sm"
                        className="bg-white text-gray-900 hover:bg-gray-100"
                        data-testid={`button-view-details-${product.id}`}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                    {product.prescriptionRequired && (
                      <Badge
                        variant="outline"
                        className="absolute top-2 right-2 bg-white border-orange-200 text-orange-800"
                        data-testid={`badge-prescription-overlay-${product.id}`}
                      >
                        <Shield className="w-3 h-3 mr-1" />
                        Rx
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3
                      className="font-semibold text-gray-900 mb-2 cursor-pointer hover:text-healthcare-blue-600 transition-colors"
                      onClick={() => handleProductClick(product)}
                      data-testid={`text-product-name-${product.id}`}
                    >
                      {product.name}
                    </h3>
                    <p
                      className="text-sm text-gray-600 mb-3 line-clamp-2"
                      data-testid={`text-product-description-${product.id}`}
                    >
                      {product.description.substring(0, 100)}...
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-lg font-bold text-healthcare-blue-600"
                        data-testid={`text-product-price-${product.id}`}
                      >
                        KSh {product.price}
                      </span>
                      <Badge
                        variant={product.inStock ? "default" : "destructive"}
                        className={
                          product.inStock ? "bg-green-100 text-green-800" : ""
                        }
                        data-testid={`badge-product-availability-${product.id}`}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleAddToCart(product.id)}
                        disabled={
                          !product.inStock || addToCartMutation.isPending
                        }
                        className="flex-1 bg-healthcare-green-500 hover:bg-healthcare-green-600 text-white py-2 rounded-lg transition-colors disabled:opacity-50"
                        data-testid={`button-add-to-cart-${product.id}`}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {addToCartMutation.isPending
                          ? "Adding..."
                          : "Add to Cart"}
                      </Button>
                      <Button
                        onClick={() => handleProductClick(product)}
                        variant="outline"
                        size="sm"
                        className="px-3"
                        data-testid={`button-quick-view-${product.id}`}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredProducts?.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p
                className="text-gray-500 text-lg"
                data-testid="text-no-products"
              >
                No products found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Prescription Information */}
      <section className="bg-healthcare-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2
              className="text-4xl font-bold mb-6"
              data-testid="text-prescription-info-title"
            >
              Prescription Medications
            </h2>
            <p
              className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto"
              data-testid="text-prescription-info-description"
            >
              For prescription medications, please ensure you have a valid
              prescription from a licensed healthcare provider. Our pharmacists
              will verify all prescriptions before dispensing medications.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <h3
                  className="text-xl font-semibold mb-2"
                  data-testid="text-valid-prescription-title"
                >
                  Valid Prescription Required
                </h3>
                <p
                  className="text-blue-100"
                  data-testid="text-valid-prescription-description"
                >
                  All prescription medications require a valid prescription from
                  a licensed doctor
                </p>
              </div>
              <div className="text-center">
                <h3
                  className="text-xl font-semibold mb-2"
                  data-testid="text-consultation-available-title"
                >
                  Consultation Available
                </h3>
                <p
                  className="text-blue-100"
                  data-testid="text-consultation-available-description"
                >
                  Our pharmacists are available for medication counseling and
                  advice
                </p>
              </div>
              <div className="text-center">
                <h3
                  className="text-xl font-semibold mb-2"
                  data-testid="text-secure-handling-title"
                >
                  Secure Handling
                </h3>
                <p
                  className="text-blue-100"
                  data-testid="text-secure-handling-description"
                >
                  All prescriptions are handled with complete confidentiality
                  and security
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <ProductDetailModal
        product={selectedProduct}
        isOpen={isProductDetailOpen}
        onClose={closeProductDetail}
      />
    </div>
  );
}
