'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  Clock, 
  Truck, 
  CheckCircle,
  MapPin,
  Phone,
  Home,
  Eye
} from 'lucide-react';

interface OrderCardProps {
  order: {
    id: string;
    status: string;
    items: Array<{
      name: string;
      size: string;
      color: string;
      quantity: number;
      price: number;
    }>;
    total: number;
    deliveryType: string;
    deliveryFee: number;
    additionalFee: number;
    deliveryAddress: {
      street: string;
      city: string;
      state: string;
      pincode: string;
      phone: string;
      zone: string;
    };
    createdAt: string;
    estimatedDelivery?: string;
    deliveredAt?: string;
    partner?: {
      name: string;
      phone: string;
      vehicle: string;
      rating: number;
    };
  };
}

export function OrderCard({ order }: OrderCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Order Pending';
      case 'confirmed':
        return 'Order Confirmed';
      case 'preparing':
        return 'Preparing Order';
      case 'out_for_delivery':
        return 'Out for Delivery';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Order #{order.id}</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(order.status)}>
              {getStatusIcon(order.status)}
              <span className="ml-1">{getStatusText(order.status)}</span>
            </Badge>
            {order.deliveryType === 'home_trial' && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">
                <Home className="h-3 w-3 mr-1" />
                Home Trial
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span>Ordered on {formatDate(order.createdAt)}</span>
          {order.estimatedDelivery && (
            <span>• ETA: {formatDate(order.estimatedDelivery)}</span>
          )}
          {order.deliveredAt && (
            <span>• Delivered on {formatDate(order.deliveredAt)}</span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Items */}
        <div>
          <h4 className="font-medium text-foreground mb-2">Items ({order.items.length})</h4>
          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                  </p>
                </div>
                <div className="text-sm font-medium">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Info */}
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="h-4 w-4 text-[#FF6B35]" />
            <span className="font-medium">Delivery Address</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {order.deliveryAddress.street}, {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
          </p>
          <p className="text-sm text-muted-foreground">
            Zone: {order.deliveryAddress.zone} • Phone: {order.deliveryAddress.phone}
          </p>
        </div>

        {/* Delivery Partner */}
        {order.partner && order.status === 'out_for_delivery' && (
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Truck className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-900">Delivery Partner</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">{order.partner.name}</p>
                <p className="text-xs text-muted-foreground">{order.partner.vehicle}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  <Phone className="h-3 w-3 mr-1" />
                  Call
                </Button>
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-muted-foreground">Rating:</span>
                  <span className="text-sm font-medium">{order.partner.rating}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Order Summary */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm">
            <div className="flex items-center space-x-4 text-muted-foreground">
              <span>Subtotal: {formatPrice(order.total - order.deliveryFee - order.additionalFee)}</span>
              {order.deliveryFee > 0 && <span>Delivery: {formatPrice(order.deliveryFee)}</span>}
              {order.additionalFee > 0 && <span>Trial Fee: {formatPrice(order.additionalFee)}</span>}
            </div>
            <div className="font-semibold text-lg text-[#FF6B35]">
              Total: {formatPrice(order.total)}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              View Details
            </Button>
            {order.status === 'delivered' && (
              <Button size="sm" className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white">
                Reorder
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
