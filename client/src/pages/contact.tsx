import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Navigation,
  Ambulance,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import image from "@/assets/image2.jpeg";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const departments = [
    {
      name: "Main Reception",
      phone: "+254 718 408 387",
      email: "info@lenoxhillnairobi.com",
      hours: "24/7",
      icon: <Phone className="w-6 h-6" />,
    },
    {
      name: "Emergency Department",
      phone: "+254 768 583 845",
      email: "emergency@lenoxhillnairobi.com",
      hours: "24/7",
      icon: <Ambulance className="w-6 h-6" />,
    },
    {
      name: "Appointments",
      phone: "+254 718 408 387",
      email: "appointments@lenoxhillnairobi.com",
      hours: "Mon-Fri 8AM-6PM",
      icon: <Clock className="w-6 h-6" />,
    },
    {
      name: "Pharmacy",
      phone: "+254 718 408 387",
      email: "pharmacy@lenoxhillnairobi.com",
      hours: "Daily 7AM-10PM",
      icon: <MessageCircle className="w-6 h-6" />,
    },
  ];

  const socialMedia = [
    {
      platform: "Facebook",
      handle: "@LenoxHillNairobi",
      link: "https://facebook.com/LenoxHillNairobi",
    },
    {
      platform: "Twitter",
      handle: "@LenoxHillKE",
      link: "https://twitter.com/LenoxHillKE",
    },
    {
      platform: "Instagram",
      handle: "@lenoxhillnairobi",
      link: "https://instagram.com/lenoxhillnairobi",
    },
    {
      platform: "LinkedIn",
      handle: "Lenox Hill Healthcare Nairobi",
      link: "https://linkedin.com/company/lenoxhillnairobi",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onOpenAppointment={() => {}} onToggleCart={() => {}} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-healthcare-teal-400 to-healthcare-teal-500 text-white py-20">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1
              className="text-4xl md:text-6xl font-bold mb-6"
              data-testid="text-contact-hero-title"
            >
              Get In Touch
            </h1>
            <p
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200"
              data-testid="text-contact-hero-description"
            >
              We're here to help with all your healthcare needs. Contact us
              today through any of our convenient channels.
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Alert */}
      <section className="bg-red-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Ambulance className="w-6 h-6 mr-3" />
            <p
              className="text-lg font-semibold"
              data-testid="text-emergency-alert"
            >
              For medical emergencies, call{" "}
              <span className="text-yellow-300">+254 768 583 845</span> or visit
              our emergency department immediately
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold text-gray-900 mb-4"
              data-testid="text-contact-info-title"
            >
              Contact Information
            </h2>
            <p
              className="text-xl text-gray-600"
              data-testid="text-contact-info-description"
            >
              Multiple ways to reach us for your convenience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {departments.map((dept, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
                data-testid={`card-department-${index}`}
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-healthcare-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-healthcare-blue-600">
                    {dept.icon}
                  </div>
                  <CardTitle
                    className="text-xl"
                    data-testid={`department-name-${index}`}
                  >
                    {dept.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <a
                        href={`tel:${dept.phone.replace(/\s+/g, "")}`}
                        className="font-semibold text-healthcare-blue-600 hover:underline block"
                        data-testid={`department-phone-${index}`}
                      >
                        {dept.phone}
                      </a>
                      <a
                        href={`mailto:${dept.email}`}
                        className="text-sm text-gray-600 hover:underline block"
                        data-testid={`department-email-${index}`}
                      >
                        {dept.email}
                      </a>
                    </div>
                    <Badge
                      variant="secondary"
                      data-testid={`department-hours-${index}`}
                    >
                      {dept.hours}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div>
              <h3
                className="text-3xl font-bold text-gray-900 mb-8"
                data-testid="text-visit-us-title"
              >
                Visit Our Facility
              </h3>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-healthcare-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-healthcare-blue-600" />
                  </div>
                  <div>
                    <h4
                      className="text-xl font-semibold text-gray-900 mb-2"
                      data-testid="text-location-title"
                    >
                      Our Location
                    </h4>
                    <p
                      className="text-gray-600 mb-2"
                      data-testid="text-location-address"
                    >
                      123 Medical Center Road
                      <br />
                      Westlands, Nairobi
                      <br />
                      Kenya, P.O. Box 12345-00100
                    </p>
                    <p
                      className="text-sm text-gray-500"
                      data-testid="text-location-directions"
                    >
                      Located in the heart of Westlands, easily accessible by
                      public transport and private vehicles.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-healthcare-green-100 rounded-lg flex items-center justify-center mr-4">
                    <Clock className="w-6 h-6 text-healthcare-green-600" />
                  </div>
                  <div>
                    <h4
                      className="text-xl font-semibold text-gray-900 mb-2"
                      data-testid="text-operating-hours-title"
                    >
                      Operating Hours
                    </h4>
                    <div className="space-y-1 text-gray-600">
                      <p data-testid="text-weekday-hours">
                        Monday - Friday: 6:00 AM - 10:00 PM
                      </p>
                      <p data-testid="text-saturday-hours">
                        Saturday: 7:00 AM - 8:00 PM
                      </p>
                      <p data-testid="text-sunday-hours">
                        Sunday: 8:00 AM - 6:00 PM
                      </p>
                      <p
                        className="text-healthcare-green-600 font-semibold"
                        data-testid="text-emergency-hours"
                      >
                        Emergency Services: 24/7
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-healthcare-teal-100 rounded-lg flex items-center justify-center mr-4">
                    <Navigation className="w-6 h-6 text-healthcare-teal-400" />
                  </div>
                  <div>
                    <h4
                      className="text-xl font-semibold text-gray-900 mb-2"
                      data-testid="text-parking-title"
                    >
                      Parking & Access
                    </h4>
                    <p
                      className="text-gray-600"
                      data-testid="text-parking-description"
                    >
                      Free parking available on-site. Wheelchair accessible
                      entrances and facilities. Public transport stops within
                      100 meters.
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-12">
                <h4
                  className="text-xl font-semibold text-gray-900 mb-4"
                  data-testid="text-social-media-title"
                >
                  Follow Us
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {socialMedia.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-white p-4 rounded-lg border hover:shadow-md transition"
                      data-testid={`social-${index}`}
                    >
                      <p
                        className="font-semibold text-gray-900"
                        data-testid={`social-platform-${index}`}
                      >
                        {social.platform}
                      </p>
                      <p
                        className="text-sm text-gray-600"
                        data-testid={`social-handle-${index}`}
                      >
                        {social.handle}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle
                  className="text-2xl text-center"
                  data-testid="text-contact-form-title"
                >
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <Input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        data-testid="input-first-name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <Input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        data-testid="input-last-name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      data-testid="input-email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      data-testid="input-phone"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) =>
                        handleInputChange("subject", value)
                      }
                      data-testid="select-subject"
                    >
                      <SelectTrigger className="placeholder:text-gray-400 text-gray-900">
                        {/* 👇 styled placeholder */}
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General Inquiry">
                          General Inquiry
                        </SelectItem>
                        <SelectItem value="Appointment Request">
                          Appointment Request
                        </SelectItem>
                        <SelectItem value="Prescription Inquiry">
                          Prescription Inquiry
                        </SelectItem>
                        <SelectItem value="Service Information">
                          Service Information
                        </SelectItem>
                        <SelectItem value="Insurance Questions">
                          Insurance Questions
                        </SelectItem>
                        <SelectItem value="Billing Questions">
                          Billing Questions
                        </SelectItem>
                        <SelectItem value="Feedback">Feedback</SelectItem>
                        <SelectItem value="Complaint">Complaint</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <Textarea
                      rows={5}
                      required
                      placeholder="Please describe your inquiry in detail..."
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      data-testid="textarea-message"
                      className="placeholder:text-gray-400"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full bg-healthcare-blue-500 hover:bg-healthcare-blue-600 text-white py-3 rounded-lg font-semibold transition-colors"
                    data-testid="button-send-message"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-bold text-gray-900 mb-4"
              data-testid="text-map-title"
            >
              Find Us
            </h2>
            <p
              className="text-xl text-gray-600"
              data-testid="text-map-description"
            >
              Located in the heart of Westlands, Nairobi
            </p>
          </div>

          <div
            className="rounded-xl h-96 overflow-hidden shadow-lg"
            data-testid="map-container"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.194803886235!2d36.8121!3d-1.2681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1736c5e7f1a5%3A0x1f1ef29f3b1c91a9!2sWestlands%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1693312345678!5m2!1sen!2ske"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
