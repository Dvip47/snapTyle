# SnapTyle - Fashion in 30 Minutes or Less

A modern, scalable web application for ultra-fast clothing delivery in Hyderabad, built with Next.js 14, React, Redux, and Prisma.

## 🚀 Features

- **Ultra-Fast Delivery**: Get fashion items delivered within 15-30 minutes
- **Home Trial Premium**: Try clothes at home with ₹25 premium service (20-minute wait)
- **Hyderabad Focus**: 8 delivery zones across Hyderabad with partner stores
- **Modern UI**: Clean, responsive design with dark/light mode support
- **State Management**: Redux Toolkit with Redux Saga for async operations
- **Authentication**: NextAuth.js with Google and email login
- **Database**: PostgreSQL with Prisma ORM
- **Type Safety**: Full TypeScript support
- **Component Library**: shadcn/ui for consistent UI components

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **next-themes**

### State Management
- **Redux Toolkit**
- **Redux Saga**
- **Axios** for API calls

### Backend & Database
- **Next.js API Routes**
- **Prisma ORM**
- **PostgreSQL**
- **NextAuth.js**

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── providers.tsx      # Redux provider
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── landing/           # Landing page components
│   └── theme-provider.tsx # Theme provider
├── features/              # Feature-based organization
│   ├── auth/
│   ├── products/
│   └── orders/
├── redux/
│   ├── store.ts           # Redux store
│   ├── slices/            # Redux slices
│   └── sagas/             # Redux sagas
├── services/
│   └── api/               # API service layer
├── lib/
│   └── prisma.ts          # Prisma client
└── types/                 # TypeScript types
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd snapTyle
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp config.example.env .env.local
   ```
   
   Update the following variables in `.env.local`:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/snaptyle"
   NEXTAUTH_SECRET="your-secret-key-here"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

### Colors
- **Primary**: `#FF6B35` (Vibrant Orange)
- **Secondary**: Various shades for different features
- **Background**: Light/Dark mode support

### Components
- Built with shadcn/ui for consistency
- Responsive design for mobile and desktop
- Accessible components with proper ARIA labels

## 📱 Features Overview

### Landing Page
- Hero section with 30-minute delivery promise
- Features showcase including Home Trial Premium
- How it works (4-step process)
- Hyderabad delivery zones with partner stores
- Newsletter signup and social links

### Delivery System
- **Instant Delivery**: 15-30 minutes across Hyderabad
- **Home Trial Premium**: ₹25 fee with 20-minute wait time
- **Partner Stores**: Zudio, Max, Trends across 8 zones
- **Real-time Tracking**: Live delivery partner tracking
- **Zone-based Logistics**: Optimized delivery routes

### State Management
- **Auth Slice**: User authentication state
- **Product Slice**: Product listing and filtering
- **Order Slice**: Cart and order management
- **Redux Saga**: Async operations and side effects

### API Structure
- RESTful API design
- Type-safe API client with Axios
- Error handling and loading states
- Authentication middleware

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Database Management
- `npx prisma studio` - Open Prisma Studio
- `npx prisma migrate dev` - Create and apply migrations
- `npx prisma generate` - Generate Prisma client

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Database Hosting
- **Railway.app** - Easy PostgreSQL hosting
- **Supabase** - PostgreSQL with additional features
- **Render** - Alternative PostgreSQL hosting

## 📈 Next Steps

### Immediate Tasks
1. Set up product listing page with Hyderabad partner stores
2. Implement checkout flow with delivery options
3. Create user dashboard with order tracking
4. Add admin dashboard for inventory management
5. Implement delivery partner assignment system

### Future Enhancements
- Mobile app with React Native
- Real-time order tracking with GPS
- Push notifications for delivery updates
- Advanced analytics dashboard
- Multi-language support
- Expansion to other cities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@snaptyle.com or create an issue in the repository.

---

**Built with ❤️ for instant fashion delivery**# snapType
