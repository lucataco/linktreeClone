# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Linktree clone - a web application that allows users to create a single landing page with multiple links to their social media profiles, websites, and other online content.

## Common Commands

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type checking (if TypeScript)
npm run type-check
```

### Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test path/to/test-file

# Run end-to-end tests
npm run test:e2e
```

### Database Operations (if applicable)
```bash
# Run database migrations
npm run db:migrate

# Seed database with sample data
npm run db:seed

# Reset database
npm run db:reset

# Generate database client (if using Prisma)
npm run db:generate
```

## Architecture Overview

### Frontend Architecture
- **Framework**: Likely React, Next.js, or Vue.js for the user interface
- **Styling**: CSS Modules, Tailwind CSS, or styled-components for component styling
- **State Management**: Context API, Redux, or Zustand for application state
- **Routing**: React Router or Next.js routing for navigation

### Backend Architecture (if full-stack)
- **API**: RESTful API or GraphQL endpoints for data operations
- **Database**: PostgreSQL, MySQL, or MongoDB for user data and link storage
- **Authentication**: JWT tokens or OAuth for user authentication
- **File Upload**: Cloud storage (AWS S3, Cloudinary) for profile images and assets

### Key Components
- **Link Management**: CRUD operations for user links
- **Profile Customization**: Theme selection, background images, profile pictures
- **Analytics**: Click tracking and basic analytics for link performance
- **Responsive Design**: Mobile-first approach for optimal mobile experience

### Data Models
- **User**: Profile information, authentication, theme preferences
- **Link**: URL, title, description, icon, click count, order
- **Theme**: Background colors, fonts, button styles
- **Analytics**: Click events, timestamps, referrer data

## Development Guidelines

### Component Structure
- Use functional components with hooks
- Implement proper prop validation
- Follow atomic design principles (atoms, molecules, organisms)
- Keep components focused and single-responsibility

### Styling Conventions
- Use consistent naming conventions for CSS classes
- Implement responsive design breakpoints
- Follow mobile-first approach
- Maintain consistent spacing and typography scales

### State Management
- Keep global state minimal
- Use local component state when possible
- Implement proper loading and error states
- Handle optimistic updates for better UX

### Performance Considerations
- Implement image optimization and lazy loading
- Use code splitting for route-based components
- Minimize bundle size with tree shaking
- Implement proper caching strategies

### Security Practices
- Validate and sanitize all user inputs
- Implement proper authentication and authorization
- Use HTTPS for all communications
- Follow OWASP security guidelines

### Accessibility
- Implement proper ARIA labels and roles
- Ensure keyboard navigation works properly
- Maintain sufficient color contrast ratios
- Use semantic HTML elements

## File Structure Patterns

Typical structure for a Linktree clone:
```
src/
├── components/          # Reusable UI components
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── services/           # API services
├── store/              # State management
├── types/              # TypeScript type definitions
├── styles/             # Global styles and themes
└── assets/             # Static assets

public/                 # Static files
├── icons/              # App icons and favicons
└── images/             # Static images

tests/                  # Test files
├── __mocks__/          # Mock files
├── unit/               # Unit tests
├── integration/        # Integration tests
└── e2e/                # End-to-end tests
```

## API Patterns

### Authentication Endpoints
- POST `/api/auth/login` - User login
- POST `/api/auth/register` - User registration
- POST `/api/auth/logout` - User logout
- GET `/api/auth/me` - Get current user

### User Profile Endpoints
- GET `/api/users/:username` - Get public profile
- PUT `/api/users/profile` - Update user profile
- POST `/api/users/avatar` - Upload profile picture

### Link Management Endpoints
- GET `/api/links` - Get user's links
- POST `/api/links` - Create new link
- PUT `/api/links/:id` - Update link
- DELETE `/api/links/:id` - Delete link
- PUT `/api/links/reorder` - Reorder links

### Analytics Endpoints
- POST `/api/analytics/click` - Record link click
- GET `/api/analytics/stats` - Get link statistics

## Environment Variables

Key environment variables to configure:
- `DATABASE_URL` - Database connection string
- `JWT_SECRET` - Secret for JWT token signing
- `CLOUDINARY_URL` - Image upload service configuration
- `GOOGLE_ANALYTICS_ID` - Analytics tracking ID
- `NEXT_PUBLIC_API_URL` - API base URL for frontend
