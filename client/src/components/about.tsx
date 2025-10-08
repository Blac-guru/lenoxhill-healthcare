import { CheckCircle } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="bg-healthcare-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6" data-testid="text-about-title">
              About Lenox Hill Healthcare
            </h2>
            <p className="text-lg text-gray-600 mb-6" data-testid="text-about-description">
              For over a decade, Lenox Hill Healthcare Nairobi has been committed to providing accessible, 
              reliable, and patient-centered healthcare services to our community. We combine medical 
              excellence with compassionate care to ensure every patient receives the attention they deserve.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-healthcare-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900" data-testid="text-mission-title">Our Mission</h3>
                  <p className="text-gray-600" data-testid="text-mission-description">
                    To deliver comprehensive healthcare services that improve the quality of life for our patients and community.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-healthcare-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900" data-testid="text-values-title">Our Values</h3>
                  <p className="text-gray-600" data-testid="text-values-description">
                    Excellence, compassion, integrity, and innovation guide everything we do in patient care.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-healthcare-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900" data-testid="text-commitment-title">Our Commitment</h3>
                  <p className="text-gray-600" data-testid="text-commitment-description">
                    Continuous improvement in healthcare delivery through advanced technology and ongoing professional development.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Modern healthcare facility" 
              className="rounded-xl shadow-lg w-full h-auto"
              data-testid="img-facility"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
