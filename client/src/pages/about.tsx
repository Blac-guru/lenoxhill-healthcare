import { CheckCircle, Heart, Users, Award, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/header";
import Footer from "@/components/footer";
import image from "@/assets/image7.jpeg";
import image2 from "@/assets/image5.jpeg";
import image3 from "@/assets/image6.jpeg";

export default function AboutPage() {
  const milestones = [
    {
      year: "2010",
      title: "Foundation",
      description: "Lenox Hill Healthcare Nairobi was established",
    },
    {
      year: "2015",
      title: "Level 2 Certification",
      description: "Achieved Level 2 Medical Clinic status",
    },
    {
      year: "2018",
      title: "Digital Services",
      description: "Launched online pharmacy and appointment booking",
    },
    {
      year: "2020",
      title: "Expansion",
      description: "Added specialized departments and 24/7 emergency care",
    },
    {
      year: "2023",
      title: "Excellence Award",
      description: "Recognized for outstanding healthcare delivery",
    },
  ];

  const team = [
    {
      name: "Dr. Lenox",
      position: "Chief Medical Officer",
      specialization: "Internal Medicine",
      experience: "15+ years",
    },
    {
      name: "Wilson Titus",
      position: "Emergency Medicine Director",
      specialization: "Emergency Medicine",
      experience: "12+ years",
    },
    {
      name: "Joseph Ouma",
      position: "Pediatrics Head",
      specialization: "Pediatric Medicine",
      experience: "10+ years",
    },
    {
      name: "John Njoroge",
      position: "Pharmacy Director",
      specialization: "Clinical Pharmacy",
      experience: "8+ years",
    },
  ];

  const certifications = [
    "Ministry of Health Kenya License",
    "Pharmacy and Poisons Board License",
    "Kenya Medical Practitioners License",
    "ISO 9001:2015 Quality Management",
    "WHO Good Manufacturing Practice",
    "Clinical Laboratory License",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onOpenAppointment={() => {}} onToggleCart={() => {}} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-healthcare-blue-600 to-healthcare-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${image2})`,
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge
              className="bg-healthcare-green-500 text-white mb-4"
              data-testid="badge-established"
            >
              Established 2010
            </Badge>
            <h1
              className="text-4xl md:text-6xl font-bold mb-6"
              data-testid="text-about-hero-title"
            >
              About Lenox Hill Healthcare
            </h1>
            <p
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200"
              data-testid="text-about-hero-description"
            >
              Providing compassionate, quality healthcare to the Nairobi
              community for over a decade.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-4xl font-bold text-gray-900 mb-6"
                data-testid="text-our-story-title"
              >
                Our Story
              </h2>
              <p
                className="text-lg text-gray-600 mb-6"
                data-testid="text-our-story-description"
              >
                For over a decade, Lenox Hill Healthcare Nairobi has been
                committed to providing accessible, reliable, and
                patient-centered healthcare services to our community. We
                combine medical excellence with compassionate care to ensure
                every patient receives the attention they deserve.
              </p>
              <p
                className="text-lg text-gray-600 mb-8"
                data-testid="text-level-2-description"
              >
                As a certified Level 2 Medical Clinic, we provide comprehensive
                healthcare services including emergency care, outpatient
                services, diagnostic facilities, and specialized medical care.
                Our facility meets all regulatory requirements and maintains the
                highest standards of medical practice.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-healthcare-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3
                      className="text-xl font-semibold text-gray-900 mb-2"
                      data-testid="text-mission-title"
                    >
                      Our Mission
                    </h3>
                    <p
                      className="text-gray-600"
                      data-testid="text-mission-description"
                    >
                      To deliver comprehensive healthcare services that improve
                      the quality of life for our patients and community through
                      excellence, innovation, and compassionate care.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-healthcare-blue-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3
                      className="text-xl font-semibold text-gray-900 mb-2"
                      data-testid="text-vision-title"
                    >
                      Our Vision
                    </h3>
                    <p
                      className="text-gray-600"
                      data-testid="text-vision-description"
                    >
                      To be the leading healthcare provider in Nairobi,
                      recognized for our commitment to patient care, medical
                      excellence, and community health improvement.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-healthcare-teal-400 rounded-full flex items-center justify-center mr-4 mt-1">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3
                      className="text-xl font-semibold text-gray-900 mb-2"
                      data-testid="text-values-title"
                    >
                      Our Values
                    </h3>
                    <p
                      className="text-gray-600"
                      data-testid="text-values-description"
                    >
                      Excellence, compassion, integrity, innovation, and respect
                      guide everything we do in patient care and community
                      service.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src={image}
                alt="Modern healthcare facility"
                className="rounded-xl shadow-lg w-full h-auto"
                data-testid="img-facility"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold text-gray-900 mb-4"
              data-testid="text-milestones-title"
            >
              Our Journey
            </h2>
            <p
              className="text-xl text-gray-600"
              data-testid="text-milestones-description"
            >
              Key milestones in our commitment to healthcare excellence
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-healthcare-blue-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                  data-testid={`milestone-${index}`}
                >
                  <div
                    className={`w-full lg:w-5/12 ${
                      index % 2 === 0 ? "lg:pr-8" : "lg:pl-8"
                    }`}
                  >
                    <Card className="bg-white shadow-lg">
                      <CardContent className="p-6">
                        <div
                          className="text-2xl font-bold text-healthcare-blue-600 mb-2"
                          data-testid={`milestone-year-${index}`}
                        >
                          {milestone.year}
                        </div>
                        <h3
                          className="text-xl font-semibold text-gray-900 mb-2"
                          data-testid={`milestone-title-${index}`}
                        >
                          {milestone.title}
                        </h3>
                        <p
                          className="text-gray-600"
                          data-testid={`milestone-description-${index}`}
                        >
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-8 h-8 bg-healthcare-blue-500 rounded-full border-4 border-white shadow-md relative z-10 mx-auto lg:mx-0"></div>
                  <div className="w-full lg:w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold text-gray-900 mb-4"
              data-testid="text-leadership-title"
            >
              Our Leadership Team
            </h2>
            <p
              className="text-xl text-gray-600"
              data-testid="text-leadership-description"
            >
              Experienced healthcare professionals dedicated to your wellbeing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="bg-gray-50 text-center"
                data-testid={`team-member-${index}`}
              >
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-healthcare-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-12 h-12 text-healthcare-blue-600" />
                  </div>
                  <h3
                    className="text-xl font-semibold text-gray-900 mb-2"
                    data-testid={`member-name-${index}`}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="text-healthcare-blue-600 font-medium mb-2"
                    data-testid={`member-position-${index}`}
                  >
                    {member.position}
                  </p>
                  <p
                    className="text-gray-600 text-sm mb-2"
                    data-testid={`member-specialization-${index}`}
                  >
                    {member.specialization}
                  </p>
                  <Badge
                    variant="secondary"
                    data-testid={`member-experience-${index}`}
                  >
                    {member.experience}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-healthcare-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-4"
              data-testid="text-certifications-title"
            >
              Certifications & Accreditations
            </h2>
            <p
              className="text-xl text-blue-100"
              data-testid="text-certifications-description"
            >
              We maintain the highest standards through continuous compliance
              and certification
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 rounded-lg p-6 text-center"
                data-testid={`certification-${index}`}
              >
                <div className="w-12 h-12 bg-healthcare-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <p
                  className="font-semibold"
                  data-testid={`certification-name-${index}`}
                >
                  {cert}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Information */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold text-gray-900 mb-4"
              data-testid="text-facility-title"
            >
              Our Facility
            </h2>
            <p
              className="text-xl text-gray-600"
              data-testid="text-facility-description"
            >
              Modern healthcare infrastructure designed for optimal patient care
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={image3}
                alt="Healthcare facility exterior"
                className="rounded-xl shadow-lg w-full h-auto"
                data-testid="img-facility-exterior"
              />
            </div>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-healthcare-blue-500 rounded-full flex items-center justify-center mr-4 mt-1">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3
                    className="text-xl font-semibold text-gray-900 mb-2"
                    data-testid="text-location-title"
                  >
                    Strategic Location
                  </h3>
                  <p
                    className="text-gray-600"
                    data-testid="text-location-description"
                  >
                    Conveniently located in central Nairobi with easy access to
                    public transportation and parking facilities.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-healthcare-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3
                    className="text-xl font-semibold text-gray-900 mb-2"
                    data-testid="text-modern-equipment-title"
                  >
                    Modern Equipment
                  </h3>
                  <p
                    className="text-gray-600"
                    data-testid="text-modern-equipment-description"
                  >
                    State-of-the-art medical equipment and diagnostic tools to
                    ensure accurate diagnosis and effective treatment.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-healthcare-teal-400 rounded-full flex items-center justify-center mr-4 mt-1">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3
                    className="text-xl font-semibold text-gray-900 mb-2"
                    data-testid="text-accessibility-title"
                  >
                    24/7 Accessibility
                  </h3>
                  <p
                    className="text-gray-600"
                    data-testid="text-accessibility-description"
                  >
                    Round-the-clock emergency services with fully equipped
                    emergency department and ambulance services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
