'use client';

import { useState } from 'react';
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
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Package,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

// Mock product data
const mockProducts = [
  {
    id: '1',
    name: 'Cotton Casual T-Shirt',
    brand: 'Zudio',
    category: 'Men\'s T-Shirts',
    price: 299,
    originalPrice: 399,
    stock: 45,
    sold: 89,
    rating: 4.5,
    status: 'active',
    deliveryTime: '15-30 min',
    zones: ['Banjara Hills', 'Gachibowli', 'Hitech City']
  },
  {
    id: '2',
    name: 'Denim Jeans',
    brand: 'Max',
    category: 'Men\'s Jeans',
    price: 799,
    originalPrice: 999,
    stock: 32,
    sold: 76,
    rating: 4.3,
    status: 'active',
    deliveryTime: '15-30 min',
    zones: ['Banjara Hills', 'Gachibowli', 'Kukatpally']
  },
  {
    id: '3',
    name: 'Floral Summer Dress',
    brand: 'Trends',
    category: 'Women\'s Dresses',
    price: 599,
    originalPrice: 799,
    stock: 28,
    sold: 65,
    rating: 4.7,
    status: 'active',
    deliveryTime: '15-30 min',
    zones: ['Banjara Hills', 'Jubilee Hills', 'Hitech City']
  },
  {
    id: '4',
    name: 'Kurta Set',
    brand: 'Zudio',
    category: 'Women\'s Ethnic',
    price: 1299,
    originalPrice: 1599,
    stock: 15,
    sold: 54,
    rating: 4.6,
    status: 'active',
    deliveryTime: '15-30 min',
    zones: ['Banjara Hills', 'Gachibowli', 'Secunderabad']
  },
  {
    id: '5',
    name: 'Sports T-Shirt',
    brand: 'Max',
    category: 'Men\'s Sports',
    price: 399,
    originalPrice: 499,
    stock: 0,
    sold: 43,
    rating: 4.4,
    status: 'out_of_stock',
    deliveryTime: '15-30 min',
    zones: ['Gachibowli', 'Hitech City', 'Kukatpally']
  }
];

export function ProductTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = mockProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.brand.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'out_of_stock':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'out_of_stock':
        return 'Out of Stock';
      case 'inactive':
        return 'Inactive';
      default:
        return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Product Management
          </CardTitle>
          <Button className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>{filteredProducts.length} products</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Sold</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Zones</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-lg">👗</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{product.brand}</Badge>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-semibold text-[#FF6B35]">{formatPrice(product.price)}</p>
                    {product.originalPrice && (
                      <p className="text-xs text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{product.stock}</span>
                    {product.stock < 10 && product.stock > 0 && (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                        Low Stock
                      </Badge>
                    )}
                    {product.stock === 0 && (
                      <Badge variant="secondary" className="bg-red-100 text-red-700">
                        Out of Stock
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="font-medium">{product.sold}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <span className="font-medium">{product.rating}</span>
                    <span className="text-yellow-500">★</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(product.status)}>
                    {getStatusText(product.status)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {product.zones.slice(0, 2).map((zone) => (
                      <Badge key={zone} variant="outline" className="text-xs">
                        {zone}
                      </Badge>
                    ))}
                    {product.zones.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{product.zones.length - 2}
                      </Badge>
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
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
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
