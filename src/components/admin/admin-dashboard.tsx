'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package, 
  Users, 
  Truck, 
  TrendingUp,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Clock,
  Star,
  Home,
  ShoppingBag
} from 'lucide-react';
import { AnalyticsChart } from './analytics-chart';
import { ProductTable } from './product-table';
import { OrderTable } from './order-table';
import { UserTable } from './user-table';
import { DeliveryPartnerTable } from './delivery-partner-table';

// Mock data
const mockStats = {
  totalOrders: 1247,
  totalRevenue: 1542000,
  totalUsers: 892,
  activePartners: 24,
  todayOrders: 45,
  todayRevenue: 67500,
  pendingOrders: 12,
  inTransitOrders: 8
};

const mockAnalytics = {
  dailySales: [
    { date: '2024-01-01', sales: 45000, orders: 23 },
    { date: '2024-01-02', sales: 52000, orders: 28 },
    { date: '2024-01-03', sales: 48000, orders: 25 },
    { date: '2024-01-04', sales: 61000, orders: 32 },
    { date: '2024-01-05', sales: 55000, orders: 29 },
    { date: '2024-01-06', sales: 67000, orders: 35 },
    { date: '2024-01-07', sales: 59000, orders: 31 }
  ],
  zoneWiseOrders: [
    { zone: 'Banjara Hills', orders: 234, revenue: 234000 },
    { zone: 'Gachibowli', orders: 198, revenue: 198000 },
    { zone: 'Hitech City', orders: 187, revenue: 187000 },
    { zone: 'Kukatpally', orders: 156, revenue: 156000 },
    { zone: 'Jubilee Hills', orders: 143, revenue: 143000 },
    { zone: 'Secunderabad', orders: 132, revenue: 132000 }
  ],
  topProducts: [
    { name: 'Cotton Casual T-Shirt', orders: 89, revenue: 26610 },
    { name: 'Denim Jeans', orders: 76, revenue: 60724 },
    { name: 'Floral Summer Dress', orders: 65, revenue: 38935 },
    { name: 'Kurta Set', orders: 54, revenue: 70146 },
    { name: 'Sports T-Shirt', orders: 43, revenue: 17157 }
  ]
};

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Manage your SnapTyle operations in Hyderabad
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#FF6B35]/10 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-[#FF6B35]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold text-foreground">{mockStats.totalOrders}</p>
                <p className="text-xs text-green-600">+12% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-foreground">{formatPrice(mockStats.totalRevenue)}</p>
                <p className="text-xs text-green-600">+18% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold text-foreground">{mockStats.totalUsers}</p>
                <p className="text-xs text-green-600">+8% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Truck className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Partners</p>
                <p className="text-2xl font-bold text-foreground">{mockStats.activePartners}</p>
                <p className="text-xs text-green-600">+3 this week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Orders</p>
                <p className="text-2xl font-bold text-foreground">{mockStats.todayOrders}</p>
              </div>
              <Package className="h-8 w-8 text-[#FF6B35]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Revenue</p>
                <p className="text-2xl font-bold text-foreground">{formatPrice(mockStats.todayRevenue)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Orders</p>
                <p className="text-2xl font-bold text-foreground">{mockStats.pendingOrders}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Transit</p>
                <p className="text-2xl font-bold text-foreground">{mockStats.inTransitOrders}</p>
              </div>
              <Truck className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center space-x-2">
            <Package className="h-4 w-4" />
            <span>Products</span>
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center space-x-2">
            <ShoppingBag className="h-4 w-4" />
            <span>Orders</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Users</span>
          </TabsTrigger>
          <TabsTrigger value="partners" className="flex items-center space-x-2">
            <Truck className="h-4 w-4" />
            <span>Partners</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Sales Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Sales Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <AnalyticsChart data={mockAnalytics.dailySales} />
              </CardContent>
            </Card>

            {/* Zone-wise Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Orders by Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalytics.zoneWiseOrders.map((zone, index) => (
                    <div key={zone.zone} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[#FF6B35]/10 rounded-full flex items-center justify-center">
                          <MapPin className="h-4 w-4 text-[#FF6B35]" />
                        </div>
                        <div>
                          <p className="font-medium">{zone.zone}</p>
                          <p className="text-sm text-muted-foreground">{zone.orders} orders</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[#FF6B35]">{formatPrice(zone.revenue)}</p>
                        <p className="text-xs text-muted-foreground">Revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalytics.topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-[#FF6B35]/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-[#FF6B35]">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.orders} orders</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[#FF6B35]">{formatPrice(product.revenue)}</p>
                      <p className="text-xs text-muted-foreground">Revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products">
          <ProductTable />
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <OrderTable />
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users">
          <UserTable />
        </TabsContent>

        {/* Partners Tab */}
        <TabsContent value="partners">
          <DeliveryPartnerTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
