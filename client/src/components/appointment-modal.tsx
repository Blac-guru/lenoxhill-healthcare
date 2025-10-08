import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, X } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Service } from "@shared/schema";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    serviceId: "",
    preferredDate: "",
    preferredTime: "",
    notes: ""
  });
  const { toast } = useToast();

  const { data: services } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  const appointmentMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/appointments", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Appointment booked",
        description: "We'll contact you soon to confirm your appointment.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        serviceId: "",
        preferredDate: "",
        preferredTime: "",
        notes: ""
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to book appointment. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    appointmentMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Generate time slots
  const timeSlots = [
    "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-screen overflow-y-auto" data-testid="modal-appointment">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-900" data-testid="text-appointment-title">
            Book an Appointment
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-4 top-4"
            data-testid="button-close-appointment"
          >
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <Input 
                type="text" 
                required 
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                data-testid="input-appointment-first-name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <Input 
                type="text" 
                required 
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                data-testid="input-appointment-last-name"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <Input 
                type="email" 
                required 
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                data-testid="input-appointment-email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <Input 
                type="tel" 
                required 
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                data-testid="input-appointment-phone"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
            <Select 
              value={formData.serviceId} 
              onValueChange={(value) => handleInputChange('serviceId', value)}
              required
              data-testid="select-appointment-service"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services?.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
              <Input 
                type="date" 
                required 
                min={new Date().toISOString().split('T')[0]}
                value={formData.preferredDate}
                onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                data-testid="input-appointment-date"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
              <Select 
                value={formData.preferredTime} 
                onValueChange={(value) => handleInputChange('preferredTime', value)}
                required
                data-testid="select-appointment-time"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
            <Textarea 
              rows={3} 
              placeholder="Any specific concerns or requirements..."
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              data-testid="textarea-appointment-notes"
            />
          </div>
          
          <div className="flex gap-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={onClose}
              className="flex-1"
              data-testid="button-appointment-cancel"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={appointmentMutation.isPending}
              className="flex-1 bg-healthcare-blue-500 hover:bg-healthcare-blue-600 text-white"
              data-testid="button-appointment-submit"
            >
              <Calendar className="w-4 h-4 mr-2" />
              {appointmentMutation.isPending ? "Booking..." : "Book Appointment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
