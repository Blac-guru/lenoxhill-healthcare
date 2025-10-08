import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Search, Menu, X, Calendar } from "lucide-react";

interface HeaderProps {
  onOpenAppointment: () => void;
  onToggleCart: () => void;
}

export default function Header({
  onOpenAppointment,
  onToggleCart,
}: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-healthcare-blue-600">
                  <Heart className="inline-block w-6 h-6 text-healthcare-green-500 mr-2" />
                  Lenox Hill Healthcare
                </h1>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link
                  href="/"
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isActive("/")
                      ? "text-healthcare-blue-600 border-b-2 border-healthcare-blue-600"
                      : "text-gray-700 hover:text-healthcare-blue-600"
                  }`}
                  data-testid="nav-home"
                >
                  Home
                </Link>
                <Link
                  href="/services"
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isActive("/services")
                      ? "text-healthcare-blue-600 border-b-2 border-healthcare-blue-600"
                      : "text-gray-700 hover:text-healthcare-blue-600"
                  }`}
                  data-testid="nav-services"
                >
                  Services
                </Link>
                <Link
                  href="/products"
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isActive("/products")
                      ? "text-healthcare-blue-600 border-b-2 border-healthcare-blue-600"
                      : "text-gray-700 hover:text-healthcare-blue-600"
                  }`}
                  data-testid="nav-products"
                >
                  Products
                </Link>
                <Link
                  href="/about"
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isActive("/about")
                      ? "text-healthcare-blue-600 border-b-2 border-healthcare-blue-600"
                      : "text-gray-700 hover:text-healthcare-blue-600"
                  }`}
                  data-testid="nav-about"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isActive("/contact")
                      ? "text-healthcare-blue-600 border-b-2 border-healthcare-blue-600"
                      : "text-gray-700 hover:text-healthcare-blue-600"
                  }`}
                  data-testid="nav-contact"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Button
                onClick={onOpenAppointment}
                className="bg-healthcare-green-500 hover:bg-healthcare-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                data-testid="button-appointment"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-600 hover:text-healthcare-blue-600"
                data-testid="button-search-toggle"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-healthcare-blue-600"
                data-testid="button-mobile-menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Search Bar */}
        {isSearchOpen && (
          <div
            className="bg-healthcare-blue-50 border-t px-4 py-3"
            data-testid="search-bar"
          >
            <div className="max-w-7xl mx-auto">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search services, products, or medications..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-healthcare-blue-500 focus:border-healthcare-blue-500"
                  data-testid="input-search"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden bg-white border-t"
            data-testid="mobile-menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className={`block px-3 py-2 text-base font-medium ${
                  isActive("/")
                    ? "text-healthcare-blue-600 bg-healthcare-blue-50"
                    : "text-gray-700 hover:text-healthcare-blue-600"
                }`}
                data-testid="mobile-nav-home"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/services"
                className={`block px-3 py-2 text-base font-medium ${
                  isActive("/services")
                    ? "text-healthcare-blue-600 bg-healthcare-blue-50"
                    : "text-gray-700 hover:text-healthcare-blue-600"
                }`}
                data-testid="mobile-nav-services"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/products"
                className={`block px-3 py-2 text-base font-medium ${
                  isActive("/products")
                    ? "text-healthcare-blue-600 bg-healthcare-blue-50"
                    : "text-gray-700 hover:text-healthcare-blue-600"
                }`}
                data-testid="mobile-nav-products"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/about"
                className={`block px-3 py-2 text-base font-medium ${
                  isActive("/about")
                    ? "text-healthcare-blue-600 bg-healthcare-blue-50"
                    : "text-gray-700 hover:text-healthcare-blue-600"
                }`}
                data-testid="mobile-nav-about"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`block px-3 py-2 text-base font-medium ${
                  isActive("/contact")
                    ? "text-healthcare-blue-600 bg-healthcare-blue-50"
                    : "text-gray-700 hover:text-healthcare-blue-600"
                }`}
                data-testid="mobile-nav-contact"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Button
                onClick={() => {
                  onOpenAppointment();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full mt-4 bg-healthcare-green-500 hover:bg-healthcare-green-600 text-white"
                data-testid="mobile-button-appointment"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
