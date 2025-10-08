import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Pill,
  ArrowRight,
  Heart,
  Shield,
  Users,
  Clock,
  Star,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AppointmentModal from "@/components/appointment-modal";
import Testimonials from "@/components/testimonials";
import type { Service, Product } from "@shared/schema";
import image from "@/assets/image8.jpeg";

export default function Home() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const { data: services } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const featuredServices = services?.slice(0, 3) || [];
  const featuredProducts = products?.slice(0, 4) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onOpenAppointment={() => setIsAppointmentModalOpen(true)}
        onToggleCart={() => {}}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-healthcare-blue-600 to-healthcare-blue-700 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div
          className="absolute inset-0 bg-cover bg-center pt-148"
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <Badge
              className="bg-healthcare-green-500 text-white mb-4"
              data-testid="badge-level-2"
            >
              Level 2 Medical Clinic
            </Badge>
            <h1
              className="text-4xl md:text-6xl font-bold mb-6"
              data-testid="text-hero-title"
            >
              Let Us Take Care Of You...
            </h1>
            <p
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200"
              data-testid="text-hero-description"
            >
              Comprehensive healthcare services and quality medications
              delivered with compassion and excellence in Nairobi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setIsAppointmentModalOpen(true)}
                className="bg-healthcare-green-500 hover:bg-healthcare-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                data-testid="button-hero-appointment"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Appointment
              </Button>
              <Link href="/products">
                <Button
                  variant="outline"
                  className="bg-white text-healthcare-blue-600 hover:bg-gray-100 border-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                  data-testid="button-hero-medications"
                >
                  <Pill className="w-5 h-5 mr-2" />
                  Order Medications
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div
                className="text-4xl font-bold text-healthcare-blue-600 mb-2"
                data-testid="stat-patients"
              >
                15,000+
              </div>
              <div className="text-gray-600">Patients Served</div>
            </div>
            <div className="text-center">
              <div
                className="text-4xl font-bold text-healthcare-green-500 mb-2"
                data-testid="stat-specialists"
              >
                25+
              </div>
              <div className="text-gray-600">Medical Specialists</div>
            </div>
            <div className="text-center">
              <div
                className="text-4xl font-bold text-healthcare-teal-400 mb-2"
                data-testid="stat-services"
              >
                12
              </div>
              <div className="text-gray-600">Healthcare Services</div>
            </div>
            <div className="text-center">
              <div
                className="text-4xl font-bold text-healthcare-blue-600 mb-2"
                data-testid="stat-emergency"
              >
                24/7
              </div>
              <div className="text-gray-600">Emergency Care</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold text-gray-900 mb-4"
              data-testid="text-why-choose-title"
            >
              Why Choose Lenox Hill Healthcare?
            </h2>
            <p
              className="text-xl text-gray-600"
              data-testid="text-why-choose-description"
            >
              Your trusted healthcare partner in Nairobi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center bg-white shadow-sm hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-healthcare-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-healthcare-blue-600" />
                </div>
                <h3
                  className="text-xl font-semibold text-gray-900 mb-4"
                  data-testid="text-licensed-care-title"
                >
                  Licensed Level 2 Care
                </h3>
                <p
                  className="text-gray-600"
                  data-testid="text-licensed-care-description"
                >
                  Fully certified medical facility providing comprehensive
                  healthcare services with modern equipment and qualified
                  professionals.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-sm hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-healthcare-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-healthcare-green-600" />
                </div>
                <h3
                  className="text-xl font-semibold text-gray-900 mb-4"
                  data-testid="text-compassionate-care-title"
                >
                  Compassionate Care
                </h3>
                <p
                  className="text-gray-600"
                  data-testid="text-compassionate-care-description"
                >
                  Patient-centered approach ensuring every individual receives
                  personalized attention and care tailored to their specific
                  needs.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-sm hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-healthcare-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-healthcare-teal-400" />
                </div>
                <h3
                  className="text-xl font-semibold text-gray-900 mb-4"
                  data-testid="text-available-247-title"
                >
                  Available 24/7
                </h3>
                <p
                  className="text-gray-600"
                  data-testid="text-available-247-description"
                >
                  Round-the-clock emergency services and extended hours for
                  regular consultations, ensuring healthcare when you need it
                  most.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2
                className="text-4xl font-bold text-gray-900 mb-4"
                data-testid="text-featured-services-title"
              >
                Our Healthcare Services
              </h2>
              <p
                className="text-xl text-gray-600"
                data-testid="text-featured-services-description"
              >
                Comprehensive medical care for all your health needs
              </p>
            </div>
            <Link href="/services">
              <Button
                variant="outline"
                className="hidden sm:flex"
                data-testid="button-view-all-services"
              >
                View All Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <Card
                key={service.id}
                className="hover:shadow-lg transition-shadow"
                data-testid={`card-featured-service-${service.id}`}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-healthcare-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-healthcare-blue-600" />
                  </div>
                  <CardTitle
                    data-testid={`text-featured-service-name-${service.id}`}
                  >
                    {service.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className="text-gray-600 mb-4"
                    data-testid={`text-featured-service-description-${service.id}`}
                  >
                    {service.description}
                  </p>
                  <Button
                    onClick={() => setIsAppointmentModalOpen(true)}
                    className="w-full bg-healthcare-blue-500 hover:bg-healthcare-blue-600"
                    data-testid={`button-book-featured-service-${service.id}`}
                  >
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link href="/services">
              <Button
                variant="outline"
                data-testid="button-view-all-services-mobile"
              >
                View All Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2
                className="text-4xl font-bold text-gray-900 mb-4"
                data-testid="text-featured-products-title"
              >
                Online Pharmacy
              </h2>
              <p
                className="text-xl text-gray-600"
                data-testid="text-featured-products-description"
              >
                Quality medications available for order and delivery
              </p>
            </div>
            <Link href="/products">
              <Button
                variant="outline"
                className="hidden sm:flex"
                data-testid="button-browse-pharmacy"
              >
                Browse Pharmacy
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="hover:shadow-lg transition-shadow"
                data-testid={`card-featured-product-${product.id}`}
              >
                <img
                  src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200"
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-t-lg"
                  data-testid={`img-featured-product-${product.id}`}
                />
                <CardContent className="p-4">
                  <h3
                    className="font-semibold text-gray-900 mb-2"
                    data-testid={`text-featured-product-name-${product.id}`}
                  >
                    {product.name}
                  </h3>
                  <p
                    className="text-sm text-gray-600 mb-3"
                    data-testid={`text-featured-product-description-${product.id}`}
                  >
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span
                      className="text-lg font-bold text-healthcare-blue-600"
                      data-testid={`text-featured-product-price-${product.id}`}
                    >
                      KSh {product.price}
                    </span>
                    <Badge
                      variant="secondary"
                      data-testid={`badge-featured-product-category-${product.id}`}
                    >
                      {product.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link href="/products">
              <Button
                variant="outline"
                data-testid="button-browse-pharmacy-mobile"
              >
                Browse Pharmacy
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Call to Action */}
      <section className="bg-healthcare-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6" data-testid="text-cta-title">
            Ready to Experience Quality Healthcare?
          </h2>
          <p
            className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
            data-testid="text-cta-description"
          >
            Join thousands of satisfied patients who trust Lenox Hill Healthcare
            for their medical needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setIsAppointmentModalOpen(true)}
              className="bg-healthcare-green-500 hover:bg-healthcare-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold"
              data-testid="button-cta-appointment"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Your Appointment
            </Button>
            <Link href="/contact">
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-healthcare-blue-600 px-8 py-4 rounded-lg text-lg font-semibold"
                data-testid="button-cta-contact"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />
    </div>
  );
}
