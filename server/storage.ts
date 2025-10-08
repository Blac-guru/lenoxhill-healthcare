import { 
  type User, type InsertUser,
  type Service, type InsertService,
  type Product, type InsertProduct,
  type Appointment, type InsertAppointment,
  type ContactMessage, type InsertContactMessage,
  type CartItem, type InsertCartItem,
  type Order, type InsertOrder
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Services
  getServices(): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  
  // Products
  getProducts(filters?: { category?: string; targetAge?: string; search?: string }): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Appointments
  getAppointments(): Promise<Appointment[]>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  
  // Contact Messages
  getContactMessages(): Promise<ContactMessage[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  
  // Cart
  getCartItems(sessionId: string): Promise<CartItem[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  removeFromCart(sessionId: string, productId: string): Promise<void>;
  clearCart(sessionId: string): Promise<void>;
  
  // Orders
  getOrders(): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private services: Map<string, Service>;
  private products: Map<string, Product>;
  private appointments: Map<string, Appointment>;
  private contactMessages: Map<string, ContactMessage>;
  private cartItems: Map<string, CartItem>;
  private orders: Map<string, Order>;

  constructor() {
    this.users = new Map();
    this.services = new Map();
    this.products = new Map();
    this.appointments = new Map();
    this.contactMessages = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    
    // Initialize with sample data
    this.initializeData();
  }

  private async initializeData() {
    // Services
    const services: InsertService[] = [
      {
        name: "General Consultation",
        description: "Comprehensive health assessments and medical consultations for all age groups.",
        targetAudience: "All ages",
        hours: "Mon-Fri 8AM-6PM",
        location: "Ground Floor",
        icon: "fa-stethoscope"
      },
      {
        name: "Pharmacy Services",
        description: "Full-service pharmacy with prescription and over-the-counter medications.",
        targetAudience: "All patients",
        hours: "Daily 7AM-10PM",
        location: "Main Building",
        icon: "fa-pills"
      },
      {
        name: "Antenatal Care",
        description: "Comprehensive prenatal care for expectant mothers and their babies.",
        targetAudience: "Expectant mothers",
        hours: "Mon-Sat 8AM-5PM",
        location: "Second Floor",
        icon: "fa-baby"
      },
      {
        name: "Laboratory Services",
        description: "Complete diagnostic testing with accurate and timely results.",
        targetAudience: "All patients",
        hours: "Daily 6AM-8PM",
        location: "Ground Floor",
        icon: "fa-flask"
      },
      {
        name: "Family Planning",
        description: "Comprehensive reproductive health and family planning services.",
        targetAudience: "Adults",
        hours: "Mon-Fri 9AM-5PM",
        location: "Second Floor",
        icon: "fa-heartbeat"
      },
      {
        name: "Immunization",
        description: "Vaccination services for children and adults, including travel vaccines.",
        targetAudience: "All ages",
        hours: "Mon-Sat 8AM-4PM",
        location: "First Floor",
        icon: "fa-shield-alt"
      }
    ];

    for (const service of services) {
      await this.createService(service);
    }

    // Products
    const products: InsertProduct[] = [
      // Prescription Medications
      {
        name: "Amoxicillin 250mg Capsules",
        description: "Broad-spectrum antibiotic for bacterial infections. Effective against respiratory tract infections, urinary tract infections, and skin infections. Take as prescribed by your doctor.",
        price: "180.00",
        category: "Prescription",
        targetAge: "Adults",
        inStock: true,
        prescriptionRequired: true,
        imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        name: "Metformin 500mg Tablets",
        description: "First-line medication for Type 2 diabetes management. Helps control blood sugar levels and improves insulin sensitivity. Take with meals to reduce stomach upset.",
        price: "320.00",
        category: "Prescription",
        targetAge: "Adults",
        inStock: true,
        prescriptionRequired: true,
        imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        name: "Lisinopril 10mg Tablets",
        description: "ACE inhibitor for hypertension and heart failure management. Helps lower blood pressure and protects kidney function. Monitor blood pressure regularly during treatment.",
        price: "280.00",
        category: "Prescription",
        targetAge: "Adults",
        inStock: true,
        prescriptionRequired: true,
        imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        name: "Prednisolone 5mg Tablets",
        description: "Corticosteroid for inflammation and autoimmune conditions. Used for asthma, allergies, and inflammatory disorders. Follow tapering instructions carefully.",
        price: "240.00",
        category: "Prescription",
        targetAge: "Adults",
        inStock: true,
        prescriptionRequired: true,
        imageUrl: "https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        name: "Azithromycin 250mg Tablets",
        description: "Macrolide antibiotic for respiratory and soft tissue infections. Effective against atypical pneumonia and sexually transmitted infections. Complete full course.",
        price: "450.00",
        category: "Prescription",
        targetAge: "Adults",
        inStock: true,
        prescriptionRequired: true,
        imageUrl: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      
      // Over-the-Counter Medications
      {
        name: "Paracetamol 500mg Tablets",
        description: "Effective pain reliever and fever reducer for headaches, muscle pain, and fever. Safe for most adults and children over 12. Maximum 4g per day.",
        price: "120.00",
        category: "Over-the-Counter",
        targetAge: "Adults",
        inStock: true,
        prescriptionRequired: false,
        imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        name: "Ibuprofen 400mg Tablets",
        description: "Anti-inflammatory pain reliever for arthritis, back pain, and menstrual cramps. Reduces inflammation and fever. Take with food to protect stomach.",
        price: "150.00",
        category: "Over-the-Counter",
        targetAge: "Adults",
        inStock: true,
        prescriptionRequired: false,
        imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        name: "Loratadine 10mg Tablets",
        description: "Non-drowsy antihistamine for allergies, hay fever, and hives. Provides 24-hour relief from sneezing, runny nose, and itchy eyes.",
        price: "180.00",
        category: "Over-the-Counter",
        targetAge: "Adults",
        inStock: true,
        prescriptionRequired: false,
        imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        name: "Omeprazole 20mg Capsules",
        description: "Proton pump inhibitor for heartburn and acid reflux. Reduces stomach acid production for up to 24 hours. Best taken before breakfast.",
        price: "220.00",
        category: "Over-the-Counter",
        targetAge: "Adults",
        inStock: true,
        prescriptionRequired: false,
        imageUrl: "https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        name: "Hydrocortisone 1% Cream",
        description: "Topical corticosteroid for eczema, dermatitis, and insect bites. Reduces inflammation, itching, and redness. Apply thin layer 2-3 times daily.",
        price: "160.00",
        category: "Over-the-Counter",
        targetAge: "All ages",
        inStock: true,
        prescriptionRequired: false,
        imageUrl: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      
      // Health Supplements
      {
        name: "Vitamin D3 1000IU Tablets",
        description: "Essential vitamin for bone health, immune function, and muscle strength. Supports calcium absorption and helps prevent osteoporosis. Take with fatty meal.",
        price: "850.00",
        category: "Supplements",
        targetAge: "Adults",
        inStock: true,
        prescriptionRequired: false,
        imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        name: "Omega-3 Fish Oil Capsules",
        description: "High-quality EPA and DHA for heart health, brain function, and inflammation reduction. Supports cardiovascular health and cognitive function.",
        price: "1200.00",
        category: "Supplements",
        targetAge: "Adults",
        inStock: true,
        prescriptionRequired: false,
        imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        name: "Multivitamin Complex",
        description: "Complete daily vitamin and mineral supplement with 23 essential nutrients. Supports energy, immunity, and overall wellness. One tablet daily with breakfast.",
        price: "980.00",
        category: "Supplements",
        targetAge: "Adults",
        inStock: true,
        prescriptionRequired: false,
        imageUrl: "https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        name: "Iron 65mg Tablets",
        description: "Iron supplement for anemia treatment and prevention. Supports red blood cell formation and oxygen transport. Take on empty stomach for best absorption.",
        price: "420.00",
        category: "Supplements",
        targetAge: "Adults",
        inStock: true,
        prescriptionRequired: false,
        imageUrl: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        name: "Calcium + Vitamin D Tablets",
        description: "Combined calcium and vitamin D for bone health. Helps prevent osteoporosis and supports muscle function. Essential for women over 40.",
        price: "650.00",
        category: "Supplements",
        targetAge: "Adults",
        inStock: true,
        prescriptionRequired: false,
        imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      
      // Baby Care Products
      {
        name: "Infant Formula Stage 1 (0-6 months)",
        description: "Complete nutrition for newborns and infants up to 6 months. Enriched with DHA, ARA, and essential vitamins for healthy brain and eye development.",
        price: "1200.00",
        category: "Baby Care",
        targetAge: "Children",
        inStock: true,
        prescriptionRequired: false,
        imageUrl: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        name: "Baby Paracetamol Suspension",
        description: "Safe fever and pain relief for infants and children 2 months to 6 years. Sugar-free strawberry flavor. Includes dosing syringe for accurate measurement.",
        price: "280.00",
        category: "Baby Care",
        targetAge: "Children",
        inStock: true,
        prescriptionRequired: false,
        imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        name: "Baby Cough & Cold Syrup",
        description: "Gentle relief for children's cough and cold symptoms. Natural honey-based formula suitable for children over 1 year. Soothes throat irritation.",
        price: "320.00",
        category: "Baby Care",
        targetAge: "Children",
        inStock: true,
        prescriptionRequired: false,
        imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        name: "Baby Zinc Oxide Diaper Cream",
        description: "Protective barrier cream for diaper rash prevention and treatment. Contains 40% zinc oxide for maximum protection. Fragrance-free and hypoallergenic.",
        price: "450.00",
        category: "Baby Care",
        targetAge: "Children",
        inStock: true,
        prescriptionRequired: false,
        imageUrl: "https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        name: "Children's Multivitamin Gummies",
        description: "Delicious gummy vitamins with essential nutrients for growing children. Supports immune system, brain development, and healthy growth. Ages 2-12.",
        price: "680.00",
        category: "Baby Care",
        targetAge: "Children",
        inStock: true,
        prescriptionRequired: false,
        imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      
      // Medical Devices
      {
        name: "Digital Thermometer",
        description: "Fast and accurate oral, rectal, and underarm temperature measurement. Fever alert feature with memory recall. Waterproof and easy to clean.",
        price: "450.00",
        category: "Medical Devices",
        targetAge: "All ages",
        inStock: true,
        prescriptionRequired: false,
        imageUrl: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        name: "Blood Pressure Monitor",
        description: "Automatic upper arm blood pressure monitor with irregular heartbeat detection. Large LCD display and memory for 2 users. WHO indicator included.",
        price: "2800.00",
        category: "Medical Devices",
        targetAge: "Adults",
        inStock: true,
        prescriptionRequired: false,
        imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        name: "Glucose Meter Kit",
        description: "Complete blood glucose monitoring system for diabetes management. Includes meter, test strips, lancets, and carrying case. No coding required.",
        price: "1800.00",
        category: "Medical Devices",
        targetAge: "Adults",
        inStock: true,
        prescriptionRequired: false,
        imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        name: "Pulse Oximeter",
        description: "Fingertip pulse oximeter measures blood oxygen saturation and pulse rate. LED display with adjustable brightness. Essential for respiratory monitoring.",
        price: "1200.00",
        category: "Medical Devices",
        targetAge: "All ages",
        inStock: true,
        prescriptionRequired: false,
        imageUrl: "https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        name: "First Aid Kit Complete",
        description: "Comprehensive first aid kit with 100+ pieces including bandages, antiseptics, pain relievers, and emergency supplies. Perfect for home and travel.",
        price: "2200.00",
        category: "Medical Devices",
        targetAge: "All ages",
        inStock: true,
        prescriptionRequired: false,
        imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      }
    ];

    for (const product of products) {
      await this.createProduct(product);
    }
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Services
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getService(id: string): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = randomUUID();
    const service: Service = { 
      ...insertService, 
      id, 
      available: true,
      estimatedCost: insertService.estimatedCost ?? null
    };
    this.services.set(id, service);
    return service;
  }

  // Products
  async getProducts(filters?: { category?: string; targetAge?: string; search?: string }): Promise<Product[]> {
    let products = Array.from(this.products.values());
    
    if (filters?.category && filters.category !== "All Categories") {
      products = products.filter(p => p.category === filters.category);
    }
    
    if (filters?.targetAge && filters.targetAge !== "All Ages") {
      products = products.filter(p => p.targetAge === filters.targetAge);
    }
    
    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
      );
    }
    
    return products;
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      ...insertProduct, 
      id,
      inStock: insertProduct.inStock ?? null,
      prescriptionRequired: insertProduct.prescriptionRequired ?? null,
      imageUrl: insertProduct.imageUrl ?? null
    };
    this.products.set(id, product);
    return product;
  }

  // Appointments
  async getAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointments.values());
  }

  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const id = randomUUID();
    const appointment: Appointment = { 
      ...insertAppointment, 
      id, 
      status: "pending",
      createdAt: new Date(),
      notes: insertAppointment.notes ?? null
    };
    this.appointments.set(id, appointment);
    return appointment;
  }

  // Contact Messages
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      status: "new",
      createdAt: new Date(),
      phone: insertMessage.phone ?? null
    };
    this.contactMessages.set(id, message);
    return message;
  }

  // Cart
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(item => item.sessionId === sessionId);
  }

  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const existingItem = Array.from(this.cartItems.values()).find(
      item => item.sessionId === insertItem.sessionId && item.productId === insertItem.productId
    );

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + (insertItem.quantity || 1);
      return existingItem;
    }

    const id = randomUUID();
    const item: CartItem = { 
      ...insertItem, 
      id,
      createdAt: new Date(),
      quantity: insertItem.quantity ?? null
    };
    this.cartItems.set(id, item);
    return item;
  }

  async removeFromCart(sessionId: string, productId: string): Promise<void> {
    const itemToRemove = Array.from(this.cartItems.entries()).find(
      ([, item]) => item.sessionId === sessionId && item.productId === productId
    );
    
    if (itemToRemove) {
      this.cartItems.delete(itemToRemove[0]);
    }
  }

  async clearCart(sessionId: string): Promise<void> {
    const itemsToRemove = Array.from(this.cartItems.entries()).filter(
      ([, item]) => item.sessionId === sessionId
    );
    
    itemsToRemove.forEach(([id]) => this.cartItems.delete(id));
  }

  // Orders
  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = { 
      ...insertOrder, 
      id,
      createdAt: new Date(),
      status: insertOrder.status ?? null
    };
    this.orders.set(id, order);
    return order;
  }
}

export const storage = new MemStorage();
