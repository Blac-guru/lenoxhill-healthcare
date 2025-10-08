import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
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
        message: ""
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4" data-testid="text-contact-title">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600" data-testid="text-contact-description">
            We're here to help with all your healthcare needs. Contact us today.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6" data-testid="text-contact-info-title">
              Contact Information
            </h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-healthcare-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <MapPin className="w-6 h-6 text-healthcare-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900" data-testid="text-location-title">Location</h4>
                  <p className="text-gray-600" data-testid="text-location-address">
                    123 Medical Center Road<br />Nairobi, Kenya
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-healthcare-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Phone className="w-6 h-6 text-healthcare-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900" data-testid="text-phone-title">Phone Numbers</h4>
                  <p className="text-gray-600">
                    <span data-testid="text-main-phone">+254 700 123 456</span> (Main)<br />
                    <span data-testid="text-emergency-phone">+254 700 654 321</span> (Emergency)<br />
                    <span data-testid="text-pharmacy-phone">+254 700 987 654</span> (Pharmacy)
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-healthcare-teal-100 rounded-lg flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-healthcare-teal-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900" data-testid="text-email-title">Email</h4>
                  <p className="text-gray-600">
                    <span data-testid="text-general-email">info@lenoxhillnairobi.com</span><br />
                    <span data-testid="text-appointments-email">appointments@lenoxhillnairobi.com</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-healthcare-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Clock className="w-6 h-6 text-healthcare-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900" data-testid="text-hours-title">Working Hours</h4>
                  <p className="text-gray-600" data-testid="text-working-hours">
                    Monday - Friday: 6:00 AM - 10:00 PM<br />
                    Saturday: 7:00 AM - 8:00 PM<br />
                    Sunday: 8:00 AM - 6:00 PM<br />
                    <span className="text-healthcare-green-600 font-medium">Emergency: 24/7</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <Card className="bg-white rounded-xl shadow-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6" data-testid="text-contact-form-title">
                Send us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <Input 
                      type="text" 
                      required 
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      data-testid="input-first-name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <Input 
                      type="text" 
                      required 
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      data-testid="input-last-name"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    data-testid="input-email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <Input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    data-testid="input-phone"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)} data-testid="select-subject">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                      <SelectItem value="Appointment Request">Appointment Request</SelectItem>
                      <SelectItem value="Prescription Inquiry">Prescription Inquiry</SelectItem>
                      <SelectItem value="Service Information">Service Information</SelectItem>
                      <SelectItem value="Complaint">Complaint</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <Textarea 
                    rows={4} 
                    required 
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    data-testid="textarea-message"
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
  );
}
