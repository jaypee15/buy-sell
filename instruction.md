# Application Requirements

## Overview
The application is a directory for small businesses for sale in Nigeria, with an embeddable widget for B2B tech companies. It includes separate frontend, backend, and widget components, all housed in a monorepo.

---

## Requirements

### **Monorepo Structure**
- No Nx or Turborepo for task orchestration.
- Directory structure:
  ```plaintext
  /monorepo-root
  │---├── /frontend          # Frontend application (React, TypeScript)
  │   ├── /backend           # Backend server (NestJS, MongoDB)
  │   └── /widget            # Standalone embeddable widget (Vanilla JS)         
  └── README.md              # Documentation
  ```

### **Frontend**
- **Stack**: React, TypeScript, TailwindCSS, React Query, ShadCN.
- **Features**:
  - Homepage with search and filters for businesses.
  - Listings page showing business details.
  - Seller dashboard to add/manage listings.
  - Buyer dashboard for saved listings and inquiries.
  - Responsive design for mobile and desktop.
  - Integration with backend APIs for real-time data fetching.
  - Error handling and user feedback for API interactions.
- **Key Folders**:
  - `/pages` (or `/src` for routing).
  - `/components` for reusable UI components.
  - `/hooks` for React Query and custom hooks.
  - `/utils` for helpers and shared logic.

### **Backend**
- **Stack**: NestJS, MongoDB (Mongoose ORM), Passport
- **Features**:
  - Authentication: JWT-based and OAuth2 (Google, Twitter).
  - Listings management: CRUD operations.
  - User Management: Role-based access control (RBAC) for admin, seller, and buyer roles.
  - Search API: Filter businesses by industry, location, price.
  - Notifications: Email alerts for inquiries and offers.
  - Widget integration API: Handle submissions from the widget.
- **Key Folders**:
  - `/src/modules`: Feature-based modules (Auth, Listings, etc.).
  - `/src/shared`: Shared logic (DTOs, pipes).
  - `/src/database`: MongoDB connection setup and schemas.

### **Widget**
- **Stack**: Vanilla JavaScript.
- **Features**:
  - "Sell This Business Now" form.
  - Sends data to backend API.
  - Customizable styling (color, size).
  - Easy integration with partner websites via a script snippet.
  - Validation and error handling for user inputs.
- **Build Output**: Minified JavaScript file (`widget.min.js`).
- **Key Folders**:
  - `/src`: Core widget logic and styles.
  - `/dist`: Compiled, production-ready widget files.

## Deployment

### **Frontend**
- Deploy to **Vercel** or **Netlify**.
- Use `.env` for API URLs.

### **Backend**
- Deploy to **AWS**, **DigitalOcean**, or **Render**.
- MongoDB hosted on **MongoDB Atlas**.

### **Widget**
- Host on a **CDN** (e.g., Cloudflare, AWS S3 with CloudFront).
- Provide embeddable snippet for partners.

---

## Workflow
1. **Development**:
   - Run frontend and backend locally with separate `npm run` scripts.
2. **Build**:
   - Build each app individually using its package.json scripts.
3. **Testing**:
   - Unit tests for backend and frontend.
   - Integration tests for APIs and widget interactions.
