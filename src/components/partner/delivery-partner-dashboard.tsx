'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Truck, 
  Clock, 
  MapPin, 
  Phone, 
  CheckCircle,
  Home,
  Star,
  Navigation,
  Timer,
  AlertCircle
} from 'lucide-react';

// Mock data for delivery partner
const mockPartner = {
  id: 'DP-001',
  name: 'Rajesh Kumar',
  phone: '+91 98765 43220',
  vehicle: 'Bike',
  rating: 4.8,
  completedDeliveries: 1247,
  currentLocation: {
    lat: 17.4065,
    lng: 78.4772,
    address: 'Near Banjara Hills'
  },
  status: 'available',
  zone: 'Banjara Hills',
  earnings: {
    today: 1250,
    thisWeek: 8750,
    thisMonth: 35000
  }
};

const mockAssignedOrders = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    phone: '+91 98765 43210',
    address: '123 Main Street, Banjara Hills, Hyderabad - 500001',
    items: [
      { name: 'Cotton Casual T-Shirt', size: 'M', color: 'Blue' },
      { name: 'Denim Jeans', size: '32', color: 'Blue' }
    ],
    total: 1098,
    deliveryType: 'instant',
    status: 'assigned',
    estimatedTime: '15-20 min',
    distance: '2.3 km',
    specialInstructions: 'Call before delivery'
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    phone: '+91 98765 43211',
    address: '456 Park Avenue, Banjara Hills, Hyderabad - 500001',
    items: [
      { name: 'Floral Summer Dress', size: 'L', color: 'Pink' }
    ],
    total: 624,
    deliveryType: 'home_trial',
    status: 'picked_up',
    estimatedTime: '10-15 min',
    distance: '1.8 km',
    trialWaitTime: 20,
    specialInstructions: 'Wait for trial completion'
  }
];

export function DeliveryPartnerDashboard() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [trialTimer, setTrialTimer] = useState(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'picked_up':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'in_transit':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'assigned':
        return 'Assigned';
      case 'picked_up':
        return 'Picked Up';
      case 'in_transit':
        return 'In Transit';
      case 'delivered':
        return 'Delivered';
      default:
        return status;
    }
  };

  const handleStartDelivery = (orderId: string) => {
    console.log('Starting delivery for order:', orderId);
    // Update order status to 'picked_up'
  };

  const handleCompleteDelivery = (orderId: string) => {
    console.log('Completing delivery for order:', orderId);
    // Update order status to 'delivered'
  };

  const handleStartTrial = (orderId: string) => {
    console.log('Starting trial for order:', orderId);
    setTrialTimer(20 * 60); // 20 minutes in seconds
    // Start countdown timer
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Delivery Partner Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Manage your deliveries and track your performance
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Online
            </Badge>
            <Button variant="outline">
              <Navigation className="h-4 w-4 mr-2" />
              Navigation
            </Button>
          </div>
        </div>
      </div>

      {/* Partner Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#FF6B35]/10 rounded-lg flex items-center justify-center">
                <Truck className="h-6 w-6 text-[#FF6B35]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Today's Earnings</p>
                <p className="text-2xl font-bold text-foreground">{formatPrice(mockPartner.earnings.today)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed Deliveries</p>
                <p className="text-2xl font-bold text-foreground">{mockPartner.completedDeliveries}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rating</p>
                <p className="text-2xl font-bold text-foreground">{mockPartner.rating}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Location */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Current Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{mockPartner.currentLocation.address}</p>
              <p className="text-sm text-muted-foreground">Zone: {mockPartner.zone}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Navigation className="h-4 w-4 mr-1" />
                Update Location
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assigned Orders */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Assigned Orders</h2>
          <Badge variant="secondary" className="bg-[#FF6B35]/10 text-[#FF6B35]">
            {mockAssignedOrders.length} orders
          </Badge>
        </div>

        <div className="grid gap-6">
          {mockAssignedOrders.map((order) => (
            <Card key={order.id} className={selectedOrder === order.id ? 'ring-2 ring-[#FF6B35]' : ''}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Truck className="h-5 w-5" />
                    <span>Order #{order.id}</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusText(order.status)}
                    </Badge>
                    {order.deliveryType === 'home_trial' && (
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                        <Home className="h-3 w-3 mr-1" />
                        Home Trial
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Customer Info */}
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Customer Details</h4>
                    <Button variant="ghost" size="sm">
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">{order.phone}</p>
                    <p className="text-sm text-muted-foreground">{order.address}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h4 className="font-medium mb-2">Order Items</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Size: {item.size} • Color: {item.color}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-[#FF6B35]" />
                    <div>
                      <p className="text-sm font-medium">{order.estimatedTime}</p>
                      <p className="text-xs text-muted-foreground">ETA</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">{order.distance}</p>
                      <p className="text-xs text-muted-foreground">Distance</p>
                    </div>
                  </div>
                </div>

                {/* Special Instructions */}
                {order.specialInstructions && (
                  <div className="bg-yellow-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium text-yellow-900">Special Instructions</span>
                    </div>
                    <p className="text-sm text-yellow-700 mt-1">{order.specialInstructions}</p>
                  </div>
                )}

                {/* Trial Timer */}
                {order.deliveryType === 'home_trial' && order.status === 'picked_up' && (
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Timer className="h-4 w-4 text-purple-600" />
                        <span className="font-medium text-purple-900">Trial in Progress</span>
                      </div>
                      <span className="text-sm font-medium text-purple-700">
                        {Math.floor(trialTimer / 60)}:{(trialTimer % 60).toString().padStart(2, '0')}
                      </span>
                    </div>
                    <div className="w-full bg-purple-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${((20 * 60 - trialTimer) / (20 * 60)) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-purple-700 mt-1">
                      Customer is trying on items. Wait for completion.
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center space-x-2 pt-4 border-t">
                  {order.status === 'assigned' && (
                    <Button 
                      className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white"
                      onClick={() => handleStartDelivery(order.id)}
                    >
                      <Truck className="h-4 w-4 mr-2" />
                      Start Delivery
                    </Button>
                  )}
                  {order.status === 'picked_up' && order.deliveryType === 'instant' && (
                    <Button 
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handleCompleteDelivery(order.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Complete Delivery
                    </Button>
                  )}
                  {order.status === 'picked_up' && order.deliveryType === 'home_trial' && (
                    <Button 
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => handleStartTrial(order.id)}
                    >
                      <Home className="h-4 w-4 mr-2" />
                      Start Trial
                    </Button>
                  )}
                  <Button variant="outline">
                    <Navigation className="h-4 w-4 mr-2" />
                    Navigate
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
