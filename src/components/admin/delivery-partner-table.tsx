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
  Star,
  MapPin,
  Clock,
  Phone
} from 'lucide-react';

// Mock delivery partner data
const mockPartners = [
  {
    id: 'DP-001',
    name: 'Rajesh Kumar',
    phone: '+91 98765 43220',
    vehicle: 'Bike',
    zone: 'Banjara Hills',
    rating: 4.8,
    completedDeliveries: 1247,
    todayDeliveries: 8,
    status: 'available',
    earnings: {
      today: 1250,
      thisWeek: 8750
    }
  },
  {
    id: 'DP-002',
    name: 'Priya Sharma',
    phone: '+91 98765 43221',
    vehicle: 'Bike',
    zone: 'Gachibowli',
    rating: 4.9,
    completedDeliveries: 892,
    todayDeliveries: 6,
    status: 'busy',
    earnings: {
      today: 980,
      thisWeek: 6540
    }
  },
  {
    id: 'DP-003',
    name: 'Amit Singh',
    phone: '+91 98765 43222',
    vehicle: 'Bike',
    zone: 'Hitech City',
    rating: 4.7,
    completedDeliveries: 1563,
    todayDeliveries: 10,
    status: 'available',
    earnings: {
      today: 1450,
      thisWeek: 10200
    }
  }
];

export function DeliveryPartnerTable() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'busy':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'offline':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'busy':
        return 'Busy';
      case 'offline':
        return 'Offline';
      default:
        return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Truck className="h-5 w-5 mr-2" />
            Delivery Partner Management
          </CardTitle>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search partners..."
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
              <TableHead>Partner</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Zone</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Deliveries</TableHead>
              <TableHead>Today's Earnings</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPartners.map((partner) => (
              <TableRow key={partner.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#FF6B35]/10 rounded-full flex items-center justify-center">
                      <Truck className="h-4 w-4 text-[#FF6B35]" />
                    </div>
                    <div>
                      <p className="font-medium">{partner.name}</p>
                      <p className="text-xs text-muted-foreground">{partner.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div>
                      <p className="font-medium text-sm">{partner.phone}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Phone className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{partner.vehicle}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">{partner.zone}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="font-medium">{partner.rating}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{partner.completedDeliveries}</p>
                    <p className="text-xs text-muted-foreground">
                      {partner.todayDeliveries} today
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-semibold text-[#FF6B35]">
                      {formatPrice(partner.earnings.today)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatPrice(partner.earnings.thisWeek)} this week
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(partner.status)}>
                    {getStatusText(partner.status)}
                  </Badge>
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
