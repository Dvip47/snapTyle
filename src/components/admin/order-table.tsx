'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Search, 
  Eye, 
  Edit, 
  Truck,
  Clock,
  CheckCircle,
  Home,
  MapPin
} from 'lucide-react';

// Mock order data
const mockOrders = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    items: 2,
    total: 1098,
    deliveryType: 'instant',
    status: 'out_for_delivery',
    zone: 'Banjara Hills',
    partner: 'Rajesh Kumar',
    createdAt: '2024-01-15T10:30:00Z',
    estimatedDelivery: '2024-01-15T11:00:00Z'
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    items: 1,
    total: 624,
    deliveryType: 'home_trial',
    status: 'delivered',
    zone: 'Gachibowli',
    partner: 'Priya Sharma',
    createdAt: '2024-01-14T14:20:00Z',
    deliveredAt: '2024-01-14T15:45:00Z'
  },
  {
    id: 'ORD-003',
    customer: 'Mike Johnson',
    items: 3,
    total: 1899,
    deliveryType: 'instant',
    status: 'preparing',
    zone: 'Hitech City',
    partner: null,
    createdAt: '2024-01-15T09:15:00Z',
    estimatedDelivery: '2024-01-15T10:00:00Z'
  }
];

export function OrderTable() {
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
        return <CheckCircle className="h-3 w-3" />;
      case 'out_for_delivery':
        return <Truck className="h-3 w-3" />;
      case 'preparing':
        return <Clock className="h-3 w-3" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'confirmed':
        return 'Confirmed';
      case 'preparing':
        return 'Preparing';
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
          <CardTitle>Order Management</CardTitle>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                className="pl-10 w-64"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Delivery Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Zone</TableHead>
              <TableHead>Partner</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <div className="font-medium">{order.id}</div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{order.customer}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <span className="font-medium">{order.items}</span>
                    <span className="text-muted-foreground">items</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-semibold text-[#FF6B35]">
                    {formatPrice(order.total)}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={order.deliveryType === 'home_trial' ? 'default' : 'secondary'}>
                    {order.deliveryType === 'home_trial' ? (
                      <>
                        <Home className="h-3 w-3 mr-1" />
                        Home Trial
                      </>
                    ) : (
                      <>
                        <Clock className="h-3 w-3 mr-1" />
                        Instant
                      </>
                    )}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(order.status)}>
                    {getStatusIcon(order.status)}
                    <span className="ml-1">{getStatusText(order.status)}</span>
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">{order.zone}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {order.partner ? (
                    <div>
                      <p className="font-medium text-sm">{order.partner}</p>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Not assigned</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{formatDate(order.createdAt)}</p>
                    {order.estimatedDelivery && (
                      <p className="text-muted-foreground">
                        ETA: {formatDate(order.estimatedDelivery)}
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
