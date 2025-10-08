import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  MapPin,
  Users,
  Calendar,
  Star,
  Shield,
  Award,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AppointmentModal from "@/components/appointment-modal";
import type { Service } from "@shared/schema";
import image from "@/assets/image6.jpeg";
import image2 from "@/assets/image4.jpeg";

export default function ServicesPage() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const getIconClass = (icon: string) => {
    const iconMap: Record<string, string> = {
      "fa-stethoscope": "🩺",
      "fa-pills": "💊",
      "fa-baby": "👶",
      "fa-flask": "🧪",
      "fa-heartbeat": "❤️",
      "fa-shield-alt": "🛡️",
    };
    return iconMap[icon] || "🏥";
  };

  const specialtyServices = [
    {
      name: "Emergency Medicine",
      description: "24/7 emergency care for critical and urgent conditions",
      features: [
        "Trauma care",
        "Cardiac emergencies",
        "Respiratory distress",
        "Urgent surgical cases",
      ],
    },
    {
      name: "Internal Medicine",
      description: "Comprehensive care for adult medical conditions",
      features: [
        "Diabetes management",
        "Hypertension care",
        "Chronic disease management",
        "Health screenings",
      ],
    },
    {
      name: "Pediatric Services",
      description:
        "Specialized healthcare for children from infancy to adolescence",
      features: [
        "Well-child visits",
        "Immunizations",
        "Growth monitoring",
        "Pediatric emergencies",
      ],
    },
    {
      name: "Women's Health",
      description: "Comprehensive reproductive and maternal healthcare",
      features: [
        "Antenatal care",
        "Family planning",
        "Gynecological exams",
        "Obstetric services",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onOpenAppointment={() => setIsAppointmentModalOpen(true)}
        onToggleCart={() => {}}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-healthcare-blue-600 to-healthcare-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge
              className="bg-healthcare-green-500 text-white mb-4"
              data-testid="badge-facility-level"
            >
              Level 2 Medical Clinic
            </Badge>
            <h1
              className="text-4xl md:text-6xl font-bold mb-6"
              data-testid="text-services-hero-title"
            >
              Comprehensive Healthcare Services
            </h1>
            <p
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200"
              data-testid="text-services-hero-description"
            >
              Providing quality medical care with modern facilities and
              experienced healthcare professionals in Nairobi.
            </p>
          </div>
        </div>
      </section>

      {/* Accreditation & Quality */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold text-gray-900 mb-4"
              data-testid="text-quality-title"
            >
              Quality & Accreditation
            </h2>
            <p
              className="text-xl text-gray-600"
              data-testid="text-quality-description"
            >
              Licensed Level 2 Medical Clinic meeting international healthcare
              standards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-healthcare-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-healthcare-blue-600" />
              </div>
              <h3
                className="text-xl font-semibold text-gray-900 mb-2"
                data-testid="text-licensed-title"
              >
                Licensed & Certified
              </h3>
              <p
                className="text-gray-600"
                data-testid="text-licensed-description"
              >
                Fully licensed by the Ministry of Health Kenya with all required
                certifications for Level 2 operations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-healthcare-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-healthcare-green-600" />
              </div>
              <h3
                className="text-xl font-semibold text-gray-900 mb-2"
                data-testid="text-standards-title"
              >
                International Standards
              </h3>
              <p
                className="text-gray-600"
                data-testid="text-standards-description"
              >
                Following WHO guidelines and international best practices in
                patient care and safety.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-healthcare-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-healthcare-teal-400" />
              </div>
              <h3
                className="text-xl font-semibold text-gray-900 mb-2"
                data-testid="text-excellence-title"
              >
                Excellence in Care
              </h3>
              <p
                className="text-gray-600"
                data-testid="text-excellence-description"
              >
                Committed to providing exceptional healthcare services with
                compassion and professionalism.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold text-gray-900 mb-4"
              data-testid="text-main-services-title"
            >
              Our Healthcare Services
            </h2>
            <p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              data-testid="text-main-services-description"
            >
              Comprehensive medical care designed to meet all your healthcare
              needs with professional excellence.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services?.map((service) => (
                <Card
                  key={service.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow"
                  data-testid={`card-service-${service.id}`}
                >
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-healthcare-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-2xl">
                          {getIconClass(service.icon)}
                        </span>
                      </div>
                      <CardTitle
                        className="text-xl text-gray-900"
                        data-testid={`text-service-name-${service.id}`}
                      >
                        {service.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p
                      className="text-gray-600 mb-4"
                      data-testid={`text-service-description-${service.id}`}
                    >
                      {service.description}
                    </p>
                    <div className="space-y-2 text-sm text-gray-500 mb-6">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-healthcare-green-500" />
                        <span data-testid={`text-service-target-${service.id}`}>
                          {service.targetAudience}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-healthcare-green-500" />
                        <span data-testid={`text-service-hours-${service.id}`}>
                          {service.hours}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-healthcare-green-500" />
                        <span
                          data-testid={`text-service-location-${service.id}`}
                        >
                          {service.location}
                        </span>
                      </div>
                    </div>
                    <Button
                      onClick={() => setIsAppointmentModalOpen(true)}
                      className="w-full bg-healthcare-blue-500 hover:bg-healthcare-blue-600 text-white py-2 rounded-lg transition-colors"
                      data-testid={`button-book-service-${service.id}`}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Appointment
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Specialty Services */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold text-gray-900 mb-4"
              data-testid="text-specialty-title"
            >
              Specialty Medical Services
            </h2>
            <p
              className="text-xl text-gray-600"
              data-testid="text-specialty-description"
            >
              Advanced medical care across multiple specialties
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {specialtyServices.map((specialty, index) => (
              <Card
                key={index}
                className="bg-gray-50 border-l-4 border-healthcare-blue-500"
                data-testid={`card-specialty-${index}`}
              >
                <CardContent className="p-8">
                  <h3
                    className="text-2xl font-semibold text-gray-900 mb-4"
                    data-testid={`text-specialty-name-${index}`}
                  >
                    {specialty.name}
                  </h3>
                  <p
                    className="text-gray-600 mb-6"
                    data-testid={`text-specialty-description-${index}`}
                  >
                    {specialty.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {specialty.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center"
                        data-testid={`feature-${index}-${featureIndex}`}
                      >
                        <div className="w-2 h-2 bg-healthcare-green-500 rounded-full mr-3"></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="bg-healthcare-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-4xl font-bold mb-6"
                data-testid="text-emergency-title"
              >
                24/7 Emergency Services
              </h2>
              <p
                className="text-xl text-blue-100 mb-8"
                data-testid="text-emergency-description"
              >
                Our emergency department is equipped to handle critical medical
                situations around the clock. With experienced emergency
                physicians and modern equipment, we provide immediate care when
                you need it most.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-healthcare-green-500 rounded-full flex items-center justify-center mr-4">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <span data-testid="text-24-7-availability">
                    24/7 Emergency availability
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-healthcare-green-500 rounded-full flex items-center justify-center mr-4">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <span data-testid="text-trauma-ready">
                    Trauma-ready facilities
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-healthcare-green-500 rounded-full flex items-center justify-center mr-4">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <span data-testid="text-emergency-specialists">
                    Emergency medicine specialists
                  </span>
                </div>
              </div>
              <div className="mt-8">
                <p
                  className="text-2xl font-bold text-healthcare-green-400"
                  data-testid="text-emergency-hotline"
                >
                  Emergency Hotline: +254 768 583 845
                </p>
              </div>
            </div>
            <div>
              <img
                src={image2}
                alt="Emergency medical equipment"
                className="rounded-xl shadow-lg w-full h-auto"
                data-testid="img-emergency-facility"
              />
            </div>
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
