import { Button } from "@/components/ui/button";
import { Calendar, Pill } from "lucide-react";

interface HeroProps {
  onOpenAppointment: () => void;
}

export default function Hero({ onOpenAppointment }: HeroProps) {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative bg-gradient-to-r from-healthcare-blue-600 to-healthcare-blue-700 text-white">
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
        }}
      ></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6" data-testid="text-hero-title">
            Let Us Take Care Of You...
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200" data-testid="text-hero-description">
            Comprehensive healthcare services and quality medications delivered with compassion and excellence in Nairobi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onOpenAppointment}
              className="bg-healthcare-green-500 hover:bg-healthcare-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              data-testid="button-hero-appointment"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Appointment
            </Button>
            <Button 
              onClick={scrollToProducts}
              variant="outline"
              className="bg-white text-healthcare-blue-600 hover:bg-gray-100 border-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              data-testid="button-hero-medications"
            >
              <Pill className="w-5 h-5 mr-2" />
              Order Medications
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
