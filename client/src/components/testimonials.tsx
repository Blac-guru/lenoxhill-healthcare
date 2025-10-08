import { Star, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      text: "The care I received during my pregnancy was exceptional. The staff was professional, caring, and always available to answer my questions.",
      name: "Sarah M.",
      service: "Antenatal Care Patient"
    },
    {
      id: 2,
      text: "Quick lab results and accurate diagnosis. The online medication ordering system is so convenient, especially for my elderly parents.",
      name: "James K.",
      service: "Family Medicine Patient"
    },
    {
      id: 3,
      text: "The pediatric team is wonderful with children. My daughter actually looks forward to her check-ups now!",
      name: "Mary O.",
      service: "Pediatric Care Parent"
    }
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4" data-testid="text-testimonials-title">
            What Our Patients Say
          </h2>
          <p className="text-xl text-gray-600" data-testid="text-testimonials-description">
            Real experiences from the families we've had the privilege to serve.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-gray-50 rounded-xl" data-testid={`card-testimonial-${testimonial.id}`}>
              <CardContent className="p-6">
                <div className="flex text-healthcare-green-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4" data-testid={`text-testimonial-content-${testimonial.id}`}>
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-healthcare-blue-100 rounded-full flex items-center justify-center mr-4">
                    <User className="w-6 h-6 text-healthcare-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900" data-testid={`text-testimonial-name-${testimonial.id}`}>
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500" data-testid={`text-testimonial-service-${testimonial.id}`}>
                      {testimonial.service}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
