import { Heart } from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3
              className="text-2xl font-bold mb-4"
              data-testid="text-footer-title"
            >
              <Heart className="inline-block w-6 h-6 text-healthcare-green-500 mr-2" />
              Lenox Hill Healthcare Nairobi
            </h3>
            <p
              className="text-gray-300 mb-6"
              data-testid="text-footer-description"
            >
              Dedicated to providing comprehensive, compassionate healthcare
              services to our community. Your health is our priority.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-healthcare-blue-400 transition-colors"
                data-testid="link-facebook"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-healthcare-blue-400 transition-colors"
                data-testid="link-twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-healthcare-blue-400 transition-colors"
                data-testid="link-instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-healthcare-blue-400 transition-colors"
                data-testid="link-linkedin"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4
              className="text-lg font-semibold mb-4"
              data-testid="text-quick-links-title"
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services"
                  className="text-gray-300 hover:text-white transition-colors"
                  data-testid="button-footer-services"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-300 hover:text-white transition-colors"
                  data-testid="button-footer-pharmacy"
                >
                  Online Pharmacy
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                  data-testid="button-footer-about"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                  data-testid="button-footer-contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4
              className="text-lg font-semibold mb-4"
              data-testid="text-emergency-title"
            >
              Emergency
            </h4>
            <p className="text-gray-300 mb-2">24/7 Emergency Line:</p>
            <p
              className="text-healthcare-green-400 font-semibold text-lg"
              data-testid="text-emergency-number"
            >
              +254 768 583 845
            </p>
            <p
              className="text-gray-400 text-sm mt-4"
              data-testid="text-emergency-note"
            >
              For life-threatening emergencies, call immediately or visit our
              emergency department.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm" data-testid="text-copyright">
              © 2025 Lenox Hill Healthcare Nairobi. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
                data-testid="link-privacy"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
                data-testid="link-terms"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
                data-testid="link-disclaimer"
              >
                Medical Disclaimer
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
