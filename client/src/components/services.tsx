import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Users } from "lucide-react";
import type { Service } from "@shared/schema";

interface ServicesProps {
  onOpenAppointment: () => void;
}

export default function Services({ onOpenAppointment }: ServicesProps) {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  const getIconClass = (icon: string) => {
    const iconMap: Record<string, string> = {
      'fa-stethoscope': '🩺',
      'fa-pills': '💊',
      'fa-baby': '👶',
      'fa-flask': '🧪',
      'fa-heartbeat': '❤️',
      'fa-shield-alt': '🛡️'
    };
    return iconMap[icon] || '🏥';
  };

  if (isLoading) {
    return (
      <section id="services" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
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
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4" data-testid="text-services-title">
            Our Healthcare Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="text-services-description">
            Comprehensive medical care designed to meet all your healthcare needs with professional excellence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service) => (
            <Card key={service.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow" data-testid={`card-service-${service.id}`}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-healthcare-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">{getIconClass(service.icon)}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900" data-testid={`text-service-name-${service.id}`}>
                    {service.name}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4" data-testid={`text-service-description-${service.id}`}>
                  {service.description}
                </p>
                <div className="space-y-2 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-healthcare-green-500" />
                    <span data-testid={`text-service-target-${service.id}`}>{service.targetAudience}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-healthcare-green-500" />
                    <span data-testid={`text-service-hours-${service.id}`}>{service.hours}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-healthcare-green-500" />
                    <span data-testid={`text-service-location-${service.id}`}>{service.location}</span>
                  </div>
                </div>
                <Button 
                  onClick={onOpenAppointment}
                  className="w-full bg-healthcare-blue-500 hover:bg-healthcare-blue-600 text-white py-2 rounded-lg transition-colors"
                  data-testid={`button-book-service-${service.id}`}
                >
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
