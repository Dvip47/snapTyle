'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package, 
  Home, 
  User, 
  Clock, 
  Truck, 
  CheckCircle,
  Star,
  MapPin,
  Phone,
  Heart
} from 'lucide-react';
import { OrderCard } from './order-card';
import { TrialCard } from './trial-card';
import { ProfileCard } from './profile-card';

// Mock data
const mockOrders = [
  {
    id: 'ORD-001',
    status: 'out_for_delivery',
    items: [
      { name: 'Cotton Casual T-Shirt', size: 'M', color: 'Blue', quantity: 1, price: 299 },
      { name: 'Denim Jeans', size: '32', color: 'Blue', quantity: 1, price: 799 },
    ],
    total: 1098,
    deliveryType: 'instant',
    deliveryFee: 0,
    additionalFee: 0,
    deliveryAddress: {
      street: '123 Main Street',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500001',
      phone: '+91 98765 43210',
      zone: 'Banjara Hills'
    },
    createdAt: '2024-01-15T10:30:00Z',
    estimatedDelivery: '2024-01-15T11:00:00Z',
    partner: {
      name: 'Rajesh Kumar',
      phone: '+91 98765 43220',
      vehicle: 'Bike',
      rating: 4.8
    }
  },
  {
    id: 'ORD-002',
    status: 'delivered',
    items: [
      { name: 'Floral Summer Dress', size: 'L', color: 'Pink', quantity: 1, price: 599 },
    ],
    total: 624,
    deliveryType: 'home_trial',
    deliveryFee: 0,
    additionalFee: 25,
    deliveryAddress: {
      street: '456 Park Avenue',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032',
      phone: '+91 98765 43211',
      zone: 'Gachibowli'
    },
    createdAt: '2024-01-14T14:20:00Z',
    deliveredAt: '2024-01-14T15:45:00Z',
    partner: {
      name: 'Priya Sharma',
      phone: '+91 98765 43221',
      vehicle: 'Bike',
      rating: 4.9
    }
  }
];

const mockTrials = [
  {
    id: 'TRIAL-001',
    orderId: 'ORD-002',
    status: 'completed',
    items: [
      { name: 'Floral Summer Dress', size: 'L', color: 'Pink', quantity: 1, price: 599 },
    ],
    trialFee: 25,
    trialStartTime: '2024-01-14T15:45:00Z',
    trialEndTime: '2024-01-14T16:05:00Z',
    itemsKept: ['Floral Summer Dress'],
    itemsReturned: [],
    totalPaid: 624
  }
];

export function UserDashboard() {
  const [activeTab, setActiveTab] = useState('orders');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'preparing':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'out_for_delivery':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'out_for_delivery':
        return <Truck className="h-4 w-4" />;
      case 'preparing':
        return <Clock className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Dashboard</h1>
        <p className="text-muted-foreground">
          Track your orders, manage trials, and update your profile
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#FF6B35]/10 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-[#FF6B35]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold text-foreground">{mockOrders.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Home className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Home Trials</p>
                <p className="text-2xl font-bold text-foreground">{mockTrials.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold text-foreground">
                  {formatPrice(mockOrders.reduce((sum, order) => sum + order.total, 0))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="orders" className="flex items-center space-x-2">
            <Package className="h-4 w-4" />
            <span>Orders</span>
          </TabsTrigger>
          <TabsTrigger value="trials" className="flex items-center space-x-2">
            <Home className="h-4 w-4" />
            <span>Trials</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
        </TabsList>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Order History</h2>
            <Button variant="outline">
              <Package className="h-4 w-4 mr-2" />
              View All Orders
            </Button>
          </div>

          <div className="space-y-4">
            {mockOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>

        {/* Trials Tab */}
        <TabsContent value="trials" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Home Trials</h2>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Home className="h-4 w-4" />
              <span>Try before you buy with ₹25 fee</span>
            </div>
          </div>

          <div className="space-y-4">
            {mockTrials.map((trial) => (
              <TrialCard key={trial.id} trial={trial} />
            ))}
          </div>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <ProfileCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
