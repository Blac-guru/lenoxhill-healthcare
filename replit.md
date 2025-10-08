# Lenox Hill Healthcare Nairobi

## Overview

This is a comprehensive healthcare management application for Lenox Hill Healthcare Nairobi. The application serves as a digital platform for managing healthcare services, medication ordering, appointment booking, and patient communication. It features a modern web interface built with React and a robust backend API for managing healthcare data.

The system provides patients with easy access to book appointments, browse and order medications, learn about available services, and contact the healthcare facility. It includes features for service management, product catalog, shopping cart functionality, appointment scheduling, and contact form handling.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type-safe development
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom healthcare-themed color palette and shadcn/ui component library
- **UI Components**: Radix UI primitives for accessible, unstyled components
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Build Tool**: Vite for fast development and optimized builds
- **Component Structure**: Modular component architecture with reusable UI components

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type safety across the entire stack
- **API Design**: RESTful API with JSON responses
- **Development Server**: Integration with Vite for seamless development experience
- **Error Handling**: Centralized error handling middleware
- **Request Logging**: Custom middleware for API request logging and performance monitoring

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Fallback Storage**: In-memory storage implementation for development/testing
- **Session Management**: Session-based cart storage for guest users

### Database Schema Design
- **Users**: Authentication and user management
- **Services**: Healthcare services with descriptions, target audience, hours, and pricing
- **Products**: Medication catalog with categories, age targeting, and prescription requirements
- **Appointments**: Patient appointment scheduling with contact information and service selection
- **Contact Messages**: Patient inquiries and communication
- **Cart System**: Shopping cart for medication orders with session-based storage
- **Orders**: Order management and tracking

### Authentication and Authorization
- **Session Management**: Express sessions for user state management
- **Guest Access**: Full functionality available for guest users with session-based cart storage
- **User Registration**: Basic username/password authentication system
- **Security**: Password hashing and secure session handling

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL database hosting
- **Connection**: @neondatabase/serverless for database connectivity

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework with custom healthcare theme
- **shadcn/ui**: Modern React component library built on Radix UI
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives
- **Lucide React**: Icon library for consistent iconography
- **React Icons**: Additional icon sets including Font Awesome

### Development Tools
- **TypeScript**: Static type checking across the entire application
- **Vite**: Build tool and development server with React plugin
- **Drizzle ORM**: Type-safe database ORM with PostgreSQL support
- **ESBuild**: Fast JavaScript bundler for production builds

### Frontend Libraries
- **TanStack Query**: Server state management, caching, and synchronization
- **React Hook Form**: Form handling with validation
- **Hookform Resolvers**: Form validation integration
- **Wouter**: Lightweight routing library
- **Date-fns**: Date manipulation and formatting utility

### Development and Deployment
- **Replit Integration**: Development environment optimizations and runtime error handling
- **PostCSS**: CSS processing with Autoprefixer
- **ESM Modules**: Modern JavaScript module system throughout