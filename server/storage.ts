import {
  type User,
  type InsertUser,
  type Service,
  type InsertService,
  type Product,
  type InsertProduct,
  type Appointment,
  type InsertAppointment,
  type ContactMessage,
  type InsertContactMessage,
  type CartItem,
  type InsertCartItem,
  type Order,
  type InsertOrder,
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
  getProducts(filters?: {
    category?: string;
    targetAge?: string;
    search?: string;
  }): Promise<Product[]>;
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

    // Initialize with sample data synchronously
    this.initializeDataSync();
  }

  private initializeDataSync() {
    // Services
    const services: InsertService[] = [
      {
        name: "General Consultation",
        description:
          "Comprehensive health assessments and medical consultations for all age groups.",
        targetAudience: "All ages",
        hours: "Mon-Fri 8AM-6PM",
        location: "Ground Floor",
        icon: "fa-stethoscope",
      },
      {
        name: "Pharmacy Services",
        description:
          "Full-service pharmacy with prescription and over-the-counter medications.",
        targetAudience: "All patients",
        hours: "Daily 7AM-10PM",
        location: "Main Building",
        icon: "fa-pills",
      },
      {
        name: "Antenatal Care",
        description:
          "Comprehensive prenatal care for expectant mothers and their babies.",
        targetAudience: "Expectant mothers",
        hours: "Mon-Sat 8AM-5PM",
        location: "Second Floor",
        icon: "fa-baby",
      },
      {
        name: "Laboratory Services",
        description:
          "Complete diagnostic testing with accurate and timely results.",
        targetAudience: "All patients",
        hours: "Daily 6AM-8PM",
        location: "Ground Floor",
        icon: "fa-flask",
      },
      {
        name: "Family Planning",
        description:
          "Comprehensive reproductive health and family planning services.",
        targetAudience: "Adults",
        hours: "Mon-Fri 9AM-5PM",
        location: "Second Floor",
        icon: "fa-heartbeat",
      },
      {
        name: "Immunization",
        description:
          "Vaccination services for children and adults, including travel vaccines.",
        targetAudience: "All ages",
        hours: "Mon-Sat 8AM-4PM",
        location: "First Floor",
        icon: "fa-shield-alt",
      },
    ];

    for (const service of services) {
      const id = randomUUID();
      const fullService = {
        ...service,
        id,
        available: true,
        estimatedCost: service.estimatedCost ?? null,
      };
      this.services.set(id, fullService as Service);
    }

    // Products
    const products: InsertProduct[] = [
      // Prescription Medications
      {
        name: "Amoxicillin 500mg Capsules (20s)",
        description:
          "Broad-spectrum antibiotic for bacterial infections such as respiratory, ear, and urinary tract infections. Use only with a valid prescription and complete the full course.",
        price: "420.00",
        category: "Prescription",
        targetAge: "Adults",
        inStock: true,
        prescriptionRequired: true,
        imageUrl:
          "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      },
      {
        name: "Metformin 500mg Tablets (60s)",
        description:
          "First-line treatment for Type 2 diabetes. Helps improve insulin sensitivity and control blood sugar. Take with meals to reduce stomach upset.",
        price: "650.00",
        category: "Prescription",
        targetAge: "Adults",
        inStock: true,
        prescriptionRequired: true,
        imageUrl:
          "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      },
      {
        name: "Amlodipine 5mg Tablets (30s)",
        description:
          "Calcium channel blocker used to manage high blood pressure and angina. Helps relax blood vessels for improved blood flow.",
        price: "480.00",
        category: "Prescription",
        targetAge: "Adults",
        inStock: true,
        prescriptionRequired: true,
        imageUrl:
          "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      },
      {
        name: "Salbutamol Inhaler 100mcg (200 doses)",
        description:
          "Relieves bronchospasm in asthma and COPD. Fast-acting inhaler for wheezing and shortness of breath. Use as directed by your clinician.",
        price: "750.00",
        category: "Prescription",
        targetAge: "All ages",
        inStock: true,
        prescriptionRequired: true,
        imageUrl:
          "https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      },

      // Over-the-Counter Medications
      {
        name: "Paracetamol 500mg Tablets (100s)",
        description:
          "Pain relief and fever reduction for headaches, muscle aches, and colds. Do not exceed 4g per day in adults.",
        price: "220.00",
        category: "Over-the-Counter",
        targetAge: "All ages",
        inStock: true,
        prescriptionRequired: false,
        imageUrl:
          "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      },
      {
        name: "Ibuprofen 400mg Tablets (20s)",
        description:
          "Anti-inflammatory for pain, swelling, and fever. Take with food to reduce stomach irritation.",
        price: "180.00",
        category: "Over-the-Counter",
        targetAge: "Adults",
        inStock: true,
        prescriptionRequired: false,
        imageUrl:
          "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      },
      {
        name: "Cetirizine 10mg Tablets (10s)",
        description:
          "Non-drowsy antihistamine for allergies, sneezing, and itchy eyes. Provides up to 24-hour relief.",
        price: "150.00",
        category: "Over-the-Counter",
        targetAge: "Adults",
        inStock: true,
        prescriptionRequired: false,
        imageUrl:
          "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      },
      {
        name: "Omeprazole 20mg Capsules (14s)",
        description:
          "Reduces stomach acid for heartburn and reflux. Best taken before breakfast for full-day relief.",
        price: "320.00",
        category: "Over-the-Counter",
        targetAge: "Adults",
        inStock: true,
        prescriptionRequired: false,
        imageUrl:
          "https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      },
      {
        name: "Oral Rehydration Salts Sachets (10s)",
        description:
          "Electrolyte replacement for dehydration from diarrhea, vomiting, or heat. Mix one sachet in clean water as directed.",
        price: "300.00",
        category: "Over-the-Counter",
        targetAge: "All ages",
        inStock: true,
        prescriptionRequired: false,
        imageUrl:
          "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      },
      {
        name: "Guaifenesin Cough Syrup 100ml",
        description:
          "Expectorant syrup to loosen mucus and relieve productive coughs. Measure doses with the supplied cup.",
        price: "260.00",
        category: "Over-the-Counter",
        targetAge: "All ages",
        inStock: true,
        prescriptionRequired: false,
        imageUrl:
          "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      },

      // Health Supplements
      {
        name: "Vitamin C 1000mg Tablets (20s)",
        description:
          "Supports immune health and collagen formation. Take one tablet daily with food.",
        price: "350.00",
        category: "Supplements",
        targetAge: "Adults",
        inStock: true,
        prescriptionRequired: false,
        imageUrl:
          "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      },
      {
        name: "Vitamin D3 1000IU Tablets (60s)",
        description:
          "Supports bone health and immune function. Take with a meal containing fat for better absorption.",
        price: "900.00",
        category: "Supplements",
        targetAge: "Adults",
        inStock: true,
        prescriptionRequired: false,
        imageUrl:
          "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      },
      {
        name: "Iron + Folic Acid Tablets (30s)",
        description:
          "Supports healthy red blood cell production, especially during pregnancy and anemia prevention. Take as directed by a clinician.",
        price: "380.00",
        category: "Supplements",
        targetAge: "Adults",
        inStock: true,
        prescriptionRequired: false,
        imageUrl:
          "https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      },

      // Baby Care Products
      {
        name: "Infant Formula Stage 1 (0-6 months, 900g)",
        description:
          "Complete nutrition for infants when breastfeeding is not possible. Enriched with DHA and essential vitamins for growth and development.",
        price: "1650.00",
        category: "Baby Care",
        targetAge: "Children",
        inStock: true,
        prescriptionRequired: false,
        imageUrl:
          "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      },
      {
        name: "Baby Paracetamol Suspension 60ml",
        description:
          "Fever and pain relief for infants and children. Sugar-free with dosing syringe for accurate measurement.",
        price: "280.00",
        category: "Baby Care",
        targetAge: "Children",
        inStock: true,
        prescriptionRequired: false,
        imageUrl:
          "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      },

      // Medical Devices
      {
        name: "Digital Thermometer",
        description:
          "Fast and accurate temperature measurement with fever alert. Suitable for oral, underarm, or rectal use and easy to clean.",
        price: "450.00",
        category: "Medical Devices",
        targetAge: "All ages",
        inStock: true,
        prescriptionRequired: false,
        imageUrl:
          "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      },
    ];

    for (const product of products) {
      const id = randomUUID();
      const fullProduct = {
        ...product,
        id,
        inStock: product.inStock ?? null,
        prescriptionRequired: product.prescriptionRequired ?? null,
        imageUrl: product.imageUrl ?? null,
      };
      this.products.set(id, fullProduct as Product);
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
      estimatedCost: insertService.estimatedCost ?? null,
    };
    this.services.set(id, service);
    return service;
  }

  // Products
  async getProducts(filters?: {
    category?: string;
    targetAge?: string;
    search?: string;
  }): Promise<Product[]> {
    let products = Array.from(this.products.values());

    if (filters?.category && filters.category !== "All Categories") {
      products = products.filter((p) => p.category === filters.category);
    }

    if (filters?.targetAge && filters.targetAge !== "All Ages") {
      products = products.filter((p) => p.targetAge === filters.targetAge);
    }

    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm),
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
      imageUrl: insertProduct.imageUrl ?? null,
    };
    this.products.set(id, product);
    return product;
  }

  // Appointments
  async getAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointments.values());
  }

  async createAppointment(
    insertAppointment: InsertAppointment,
  ): Promise<Appointment> {
    const id = randomUUID();
    const appointment: Appointment = {
      ...insertAppointment,
      id,
      status: "pending",
      createdAt: new Date(),
      notes: insertAppointment.notes ?? null,
    };
    this.appointments.set(id, appointment);
    return appointment;
  }

  // Contact Messages
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async createContactMessage(
    insertMessage: InsertContactMessage,
  ): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      ...insertMessage,
      id,
      status: "new",
      createdAt: new Date(),
      phone: insertMessage.phone ?? null,
    };
    this.contactMessages.set(id, message);
    return message;
  }

  // Cart
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      (item) => item.sessionId === sessionId,
    );
  }

  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const existingItem = Array.from(this.cartItems.values()).find(
      (item) =>
        item.sessionId === insertItem.sessionId &&
        item.productId === insertItem.productId,
    );

    if (existingItem) {
      existingItem.quantity =
        (existingItem.quantity || 1) + (insertItem.quantity || 1);
      return existingItem;
    }

    const id = randomUUID();
    const item: CartItem = {
      ...insertItem,
      id,
      createdAt: new Date(),
      quantity: insertItem.quantity ?? null,
    };
    this.cartItems.set(id, item);
    return item;
  }

  async removeFromCart(sessionId: string, productId: string): Promise<void> {
    const itemToRemove = Array.from(this.cartItems.entries()).find(
      ([, item]) =>
        item.sessionId === sessionId && item.productId === productId,
    );

    if (itemToRemove) {
      this.cartItems.delete(itemToRemove[0]);
    }
  }

  async clearCart(sessionId: string): Promise<void> {
    const itemsToRemove = Array.from(this.cartItems.entries()).filter(
      ([, item]) => item.sessionId === sessionId,
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
      status: insertOrder.status ?? null,
    };
    this.orders.set(id, order);
    return order;
  }
}

export const storage = new MemStorage();
