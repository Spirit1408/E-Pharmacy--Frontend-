# E-Pharmacy (Frontend)

A modern web application for managing an online pharmacy system. This frontend application provides a comprehensive interface for managing products, suppliers, customers, and orders in a pharmacy environment.

## Features

- **Product Management**: Add, update, delete, and view pharmaceutical products with filtering and pagination
- **Supplier Management**: Manage supplier information with CRUD operations
- **Customer Management**: Track customer data and purchase history
- **Order Processing**: Handle order creation, tracking, and fulfillment
- **Dashboard**: View key metrics and analytics for business insights
- **Authentication**: Secure login system for staff members

## Tech Stack

- **React 19**: UI library for building the user interface
- **Redux Toolkit**: State management with Redux slices for different entities
- **React Router**: Navigation and routing
- **Axios**: API requests to the backend
- **React Hook Form**: Form handling with validation
- **Yup**: Schema validation for forms
- **React Toastify**: Toast notifications
- **Vite**: Build tool and development server

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd E-Pharmacy-Frontend
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/            # Application pages
│   ├── AllCustomersPage
│   ├── AllOrdersPage
│   ├── AllProductsPage
│   ├── AllSuppliersPage
│   ├── DashboardPage
│   └── LoginPage
├── redux/            # Redux state management
│   ├── auth/
│   ├── customers/
│   ├── dash/
│   ├── orders/
│   ├── products/
│   ├── suppliers/
│   └── store.js
├── utils/            # Utility functions
├── index.css         # Global styles
└── main.jsx          # Application entry point
```

## Build for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory, ready to be deployed.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
