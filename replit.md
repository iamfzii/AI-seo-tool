# Crawlin.io - AI-Powered SEO Audit Tool

## Overview

Crawlin.io is an AI-powered SEO audit tool designed for developers. It allows users to connect their GitHub account, select repositories, run SEO audits on their code, and get AI-generated fixes for SEO issues. The application features a modern dark theme with a clean interface built using React, TypeScript, and shadcn/ui components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with a clear separation between client-side and server-side code:

- **Frontend**: React SPA with TypeScript, built with Vite
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for server state
- **Routing**: Wouter for client-side routing

## Key Components

### Frontend Structure
- **Pages**: Landing page, Dashboard, Reports, History
- **Components**: Reusable UI components built with shadcn/ui
- **Layout**: Header and Footer components with navigation
- **Charts**: Custom chart components using Recharts
- **Hooks**: Custom React hooks for mobile detection and toast notifications

### Backend Structure
- **API Routes**: RESTful endpoints for user management, repository operations, audits, and AI fixes
- **Storage**: In-memory storage implementation with interfaces for future database integration
- **Mock Data**: Development-friendly mock data for testing and demonstration

### Database Schema
- **Users**: User authentication and GitHub integration
- **Repositories**: GitHub repository metadata and status
- **Audits**: SEO audit results and scores
- **AI Fix Reports**: AI-generated fix suggestions and application status

## Data Flow

1. **User Authentication**: Mock user system (GitHub integration planned)
2. **Repository Selection**: Users select repositories from their GitHub account
3. **Audit Execution**: System runs SEO audits on selected repositories
4. **Issue Detection**: Identifies SEO issues with severity levels (critical/warning)
5. **AI Fix Generation**: Creates AI-powered fix suggestions for identified issues
6. **Results Display**: Shows audit results and fix recommendations in organized tables
7. **History Tracking**: Maintains audit and fix history with filtering capabilities

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React 18, React DOM, React Router (Wouter)
- **TypeScript**: Full TypeScript support across the stack
- **Build Tools**: Vite for frontend bundling, ESBuild for backend
- **Database**: Drizzle ORM with PostgreSQL (Neon Database)
- **UI Framework**: shadcn/ui components built on Radix UI
- **State Management**: TanStack Query for server state management
- **Styling**: Tailwind CSS with PostCSS

### Development Dependencies
- **Database Tools**: Drizzle Kit for migrations and schema management
- **Form Handling**: React Hook Form with resolvers
- **Date Handling**: date-fns for date formatting and manipulation
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React for consistent iconography

## Deployment Strategy

### Development
- **Frontend**: Vite development server with hot module replacement
- **Backend**: tsx for TypeScript execution with auto-reload
- **Database**: Environment variable configuration for DATABASE_URL

### Production
- **Build Process**: Vite builds frontend assets, ESBuild bundles backend
- **Static Assets**: Frontend built to `dist/public` directory
- **Server**: Express serves both API endpoints and static files
- **Database**: PostgreSQL connection via environment variables

### Environment Configuration
- **Development**: NODE_ENV=development with development-specific middleware
- **Production**: NODE_ENV=production with optimized builds
- **Database**: Drizzle configuration expects DATABASE_URL environment variable

The application is designed to be easily deployable on platforms like Replit, with proper environment variable configuration and build processes that handle both frontend and backend compilation.