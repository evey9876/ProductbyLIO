# LIO Offsite 2025 Event Website

## Overview

This is a password-protected event website for the LIO Product Meeting Q2 FY25 company offsite. The application provides secure access to event information including agenda, travel details, and attendee forms through a clean, corporate-grade interface. The website follows a premium event platform design approach with password authentication as the primary security mechanism.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS
- **State Management**: React hooks for local state with TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Authentication Flow**: Simple password-based authentication with hardcoded credentials stored in component state

### Backend Architecture
- **Server**: Express.js with TypeScript running in ESM mode
- **Session Management**: In-memory storage implementation with placeholder for database operations
- **API Design**: RESTful endpoints prefixed with `/api` (currently minimal implementation)
- **Development**: Vite middleware integration for hot module replacement

### Data Storage Solutions
- **Database ORM**: Drizzle ORM configured for PostgreSQL with Neon Database serverless
- **Schema**: User management with username/password authentication structure
- **Current State**: Memory-based storage implementation as placeholder for database operations
- **Migration System**: Drizzle Kit for schema migrations to `/migrations` directory

### Styling and Design System
- **CSS Framework**: Tailwind CSS with custom design tokens
- **Theme System**: CSS custom properties for colors supporting light/dark modes
- **Brand Colors**: Corporate palette including Cisco Blue (#02C8FF), Midnight Blue (#071B2D), and accent colors
- **Typography**: Inter font family for professional, corporate appearance
- **Component System**: Comprehensive UI component library with consistent spacing and elevation patterns

### Authentication and Authorization
- **Security Model**: Password-protected access with hardcoded credentials ("Product2025")
- **Session Handling**: Client-side authentication state management
- **Access Control**: Single-tier access - users either have full access or no access

### Development and Build System
- **Bundling**: Vite for frontend, esbuild for backend production builds
- **TypeScript**: Strict mode configuration with path mapping for clean imports
- **Hot Reload**: Development server with runtime error overlay integration
- **Asset Management**: Static asset handling through Vite with custom alias configuration

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form with Zod validation
- **Build Tools**: Vite, TypeScript, esbuild for production bundling
- **Development**: tsx for TypeScript execution, Replit-specific development plugins

### UI and Styling
- **Component Library**: Radix UI primitives for accessible component foundations
- **Styling**: Tailwind CSS with PostCSS, class-variance-authority for component variants
- **Icons**: Lucide React for consistent iconography
- **Utilities**: clsx and tailwind-merge for conditional styling

### Backend and Database
- **Database**: Neon Database serverless PostgreSQL with connection pooling
- **ORM**: Drizzle ORM with Zod schema validation integration
- **Session Store**: connect-pg-simple for PostgreSQL session storage (configured but not active)

### Data Management
- **HTTP Client**: TanStack Query for server state management and caching
- **Date Handling**: date-fns for date manipulation and formatting
- **Form Management**: React Hook Form with Hookform resolvers for validation

### Development Tools
- **Code Quality**: TypeScript strict mode for type safety
- **Runtime**: Node.js with ESM module support
- **Environment**: Replit-optimized with cartographer and runtime error modal plugins