import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
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
import Cart from "@/components/cart";
import type { Service, Product } from "@shared/schema";
import image from "@/assets/image8.jpeg";
import image2 from "@/assets/image2.jpeg";
import image3 from "@/assets/image3.jpeg";
import image4 from "@/assets/image4.jpeg";
import image5 from "@/assets/image5.jpeg";

export default function Home() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { data: services } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const featuredServices = services?.slice(0, 3) || [];
  const featuredProducts = products?.slice(0, 4) || [];

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

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <Header
        onOpenAppointment={() => setIsAppointmentModalOpen(true)}
        onToggleCart={() => setIsCartOpen(true)}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0e2a47] text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.22),_transparent_55%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(59,130,246,0.35),_transparent_55%)]"></div>
          <div className="absolute inset-0 bg-black/40"></div>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{
              backgroundImage: `url(${image})`,
            }}
          ></div>
          <div className="absolute -top-24 right-[-120px] h-72 w-72 rounded-full bg-healthcare-green-500/20 blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-[-120px] left-[-80px] h-80 w-80 rounded-full bg-healthcare-blue-500/20 blur-3xl animate-float"></div>
        </div>
        <motion.div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <div className="text-center">
            <motion.div variants={fadeUp}>
              <Badge
                className="bg-healthcare-green-500 text-white mb-6"
                data-testid="badge-level-2"
              >
                Level 2 Medical Clinic
              </Badge>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-semibold mb-6 tracking-tight"
              style={{ fontFamily: '"Playfair Display", serif' }}
              data-testid="text-hero-title"
              variants={fadeUp}
            >
              Modern care for Nairobi, delivered with heart.
            </motion.h1>
            <motion.p
              className="text-lg md:text-2xl mb-10 max-w-3xl mx-auto text-blue-100"
              data-testid="text-hero-description"
              variants={fadeUp}
            >
              Book trusted clinicians, manage prescriptions, and get medicines
              delivered with a pharmacy team that knows your name.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeUp}
            >
              <Button
                onClick={() => setIsAppointmentModalOpen(true)}
                className="bg-healthcare-green-500 hover:bg-healthcare-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors btn-elevate"
                data-testid="button-hero-appointment"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Appointment
              </Button>
              <Link href="/products">
                <Button
                  variant="outline"
                  className="bg-white/10 text-white hover:bg-white/20 border-white/20 px-8 py-4 rounded-full text-lg font-semibold transition-colors btn-elevate"
                  data-testid="button-hero-medications"
                >
                  <Pill className="w-5 h-5 mr-2" />
                  Order Medications
                </Button>
              </Link>
            </motion.div>
            <motion.div
              className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-blue-100"
              variants={fadeUp}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-healthcare-green-300" />
                PPB-licensed pharmacy
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-healthcare-green-300" />
                Same-day delivery in Nairobi
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-healthcare-green-300" />
                4.9 patient satisfaction
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <div className="section-divider"></div>

      <section className="relative bg-white py-20">
        <div className="absolute inset-0 pattern-grid opacity-60"></div>
        <motion.div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={stagger}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp}>
              <p className="text-sm uppercase tracking-[0.2em] text-healthcare-blue-600 mb-4">
                Clinic Experience
              </p>
              <h2
                className="text-4xl font-semibold text-gray-900 mb-4"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                A calm, guided journey from consultation to pharmacy.
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our Nairobi facility combines compassionate care, modern
                diagnostics, and a fully licensed pharmacy. You can plan your
                visit, chat with our team, and receive medication seamlessly.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="rounded-full border border-gray-200 px-4 py-2">
                  Digital records
                </div>
                <div className="rounded-full border border-gray-200 px-4 py-2">
                  Fast lab results
                </div>
                <div className="rounded-full border border-gray-200 px-4 py-2">
                  Pharmacy pickup
                </div>
              </div>
            </motion.div>

            <motion.div className="grid grid-cols-2 gap-4" variants={stagger}>
              {[image2, image3, image4, image5].map((img, index) => (
                <motion.div
                  key={img}
                  className={`relative overflow-hidden rounded-2xl shadow-lg ${
                    index === 1 ? "row-span-2" : ""
                  }`}
                  variants={fadeUp}
                >
                  <img
                    src={img}
                    alt="Lenox Hill Healthcare Nairobi"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent"></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white py-16">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={stagger}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                label: "Patients Served",
                value: "15,000+",
                color: "text-healthcare-blue-600",
              },
              {
                label: "Medical Specialists",
                value: "25+",
                color: "text-healthcare-green-600",
              },
              {
                label: "Healthcare Services",
                value: "12",
                color: "text-healthcare-teal-400",
              },
              {
                label: "Emergency Care",
                value: "24/7",
                color: "text-healthcare-blue-600",
              },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="text-center rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm"
                variants={fadeUp}
                whileHover={{
                  y: -6,
                  boxShadow: "0 20px 40px -24px rgba(15, 23, 42, 0.45)",
                }}
              >
                <div className={`text-4xl font-semibold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-20">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={stagger}
        >
          <motion.div className="text-center mb-16" variants={fadeUp}>
            <h2
              className="text-4xl font-semibold text-gray-900 mb-4"
              style={{ fontFamily: '"Playfair Display", serif' }}
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
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Licensed Level 2 Care",
                description:
                  "Fully certified medical facility providing comprehensive healthcare services with modern equipment and qualified professionals.",
                icon: <Shield className="w-8 h-8 text-healthcare-blue-600" />,
                tone: "bg-healthcare-blue-100",
              },
              {
                title: "Compassionate Care",
                description:
                  "Patient-centered approach ensuring every individual receives personalized attention and care tailored to their specific needs.",
                icon: <Heart className="w-8 h-8 text-healthcare-green-600" />,
                tone: "bg-healthcare-green-100",
              },
              {
                title: "Available 24/7",
                description:
                  "Round-the-clock emergency services and extended hours for regular consultations, ensuring healthcare when you need it most.",
                icon: <Clock className="w-8 h-8 text-healthcare-teal-400" />,
                tone: "bg-healthcare-teal-100",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Card className="text-center bg-white shadow-sm transition-all duration-300 group-hover:shadow-xl">
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 ${item.tone} rounded-full flex items-center justify-center mx-auto mb-6`}
                    >
                      {item.icon}
                    </div>
                    <h3
                      className="text-xl font-semibold text-gray-900 mb-4"
                      data-testid={`text-${item.title.replace(/\s+/g, "-").toLowerCase()}`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Featured Services */}
      <section className="bg-white py-20">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={stagger}
        >
          <motion.div
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12"
            variants={fadeUp}
          >
            <div>
              <h2
                className="text-4xl font-semibold text-gray-900 mb-4"
                style={{ fontFamily: '"Playfair Display", serif' }}
                data-testid="text-featured-services-title"
              >
                Our Healthcare Services
              </h2>
              <p
                className="text-xl text-gray-600"
                data-testid="text-featured-services-description"
              >
                Comprehensive medical care for every stage of life.
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
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <motion.div
                key={service.id}
                variants={fadeUp}
                whileHover={{ y: -8 }}
              >
                <Card
                  className="group border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl"
                  data-testid={`card-featured-service-${service.id}`}
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-healthcare-blue-100 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
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
                      className="w-full bg-healthcare-blue-500 hover:bg-healthcare-blue-600 btn-elevate"
                      data-testid={`button-book-featured-service-${service.id}`}
                    >
                      Book Appointment
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
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
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-20">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={stagger}
        >
          <motion.div
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12"
            variants={fadeUp}
          >
            <div>
              <h2
                className="text-4xl font-semibold text-gray-900 mb-4"
                style={{ fontFamily: '"Playfair Display", serif' }}
                data-testid="text-featured-products-title"
              >
                Online Pharmacy
              </h2>
              <p
                className="text-xl text-gray-600"
                data-testid="text-featured-products-description"
              >
                Quality medications available for order and delivery.
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
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={fadeUp}
                whileHover={{ y: -8 }}
              >
                <Card
                  className="group border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl"
                  data-testid={`card-featured-product-${product.id}`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        product.imageUrl ||
                        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200"
                      }
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-105"
                      data-testid={`img-featured-product-${product.id}`}
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3
                      className="font-semibold text-gray-900 mb-2"
                      data-testid={`text-featured-product-name-${product.id}`}
                    >
                      {product.name}
                    </h3>
                    <p
                      className="text-sm text-gray-600 mb-3 line-clamp-2"
                      data-testid={`text-featured-product-description-${product.id}`}
                    >
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span
                        className="text-lg font-bold text-healthcare-blue-600"
                        data-testid={`text-featured-product-price-${product.id}`}
                      >
                        {formatPrice(product.price)}
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
              </motion.div>
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
        </motion.div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Call to Action */}
      <section className="bg-healthcare-blue-600 text-white py-20">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={stagger}
        >
          <motion.h2
            className="text-4xl font-semibold mb-6"
            style={{ fontFamily: '"Playfair Display", serif' }}
            data-testid="text-cta-title"
            variants={fadeUp}
          >
            Ready to Experience Quality Healthcare?
          </motion.h2>
          <motion.p
            className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
            data-testid="text-cta-description"
            variants={fadeUp}
          >
            Join thousands of satisfied patients who trust Lenox Hill Healthcare
            for their medical needs.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeUp}
          >
            <Button
              onClick={() => setIsAppointmentModalOpen(true)}
              className="bg-healthcare-green-500 hover:bg-healthcare-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold btn-elevate"
              data-testid="button-cta-appointment"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Your Appointment
            </Button>
            <Link href="/contact">
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-healthcare-blue-600 px-8 py-4 rounded-full text-lg font-semibold btn-elevate"
                data-testid="button-cta-contact"
              >
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Footer />

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />
    </div>
  );
}
