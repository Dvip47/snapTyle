'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  ShoppingCart, 
  Home, 
  Clock, 
  Star,
  Plus,
  Eye
} from 'lucide-react';
import { Product } from '@/redux/slices/productSlice';

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
  selectedZone: string;
}

export function ProductCard({ product, viewMode, selectedZone }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to cart logic
    console.log('Added to cart:', product.id);
  };

  const handleTryAtHome = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Try at home logic
    console.log('Try at home:', product.id);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getDeliveryBadge = () => {
    if (selectedZone === 'All Zones') {
      return (
        <Badge variant="secondary" className="bg-[#FF6B35]/10 text-[#FF6B35] border-[#FF6B35]/20">
          <Clock className="h-3 w-3 mr-1" />
          {product.deliveryTime}
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
        <Clock className="h-3 w-3 mr-1" />
        Available
      </Badge>
    );
  };

  if (viewMode === 'list') {
    return (
      <Card 
        className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-6">
          <div className="flex gap-6">
            {/* Product Image */}
            <div className="relative w-32 h-32 flex-shrink-0">
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-4xl">👗</span>
              </div>
              {product.originalPrice && (
                <Badge className="absolute -top-2 -left-2 bg-red-500 text-white">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>

            {/* Product Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {product.brand} • {product.category}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsLiked(!isLiked)}
                  className={`${isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                </Button>
              </div>

              <div className="flex items-center space-x-2 mb-3">
                <span className="text-xl font-bold text-[#FF6B35]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">({product.reviewCount})</span>
                </div>
                {getDeliveryBadge()}
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleTryAtHome}
                >
                  <Home className="h-4 w-4 mr-2" />
                  Try at Home +₹25
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        <Link href={`/products/${product.id}`}>
          <div className="relative">
            {/* Product Image */}
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center">
              <span className="text-6xl">👗</span>
            </div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.originalPrice && (
                <Badge className="bg-red-500 text-white">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
              {getDeliveryBadge()}
            </div>

            {/* Like Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 bg-white/80 hover:bg-white"
              onClick={(e) => {
                e.preventDefault();
                setIsLiked(!isLiked);
              }}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'text-red-500 fill-current' : 'text-muted-foreground'}`} />
            </Button>

            {/* Hover Actions */}
            {isHovered && (
              <div className="absolute inset-0 bg-black/20 rounded-t-lg flex items-center justify-center">
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    className="bg-white text-[#FF6B35] hover:bg-white/90"
                    onClick={handleAddToCart}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Quick Add
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleTryAtHome}
                  >
                    <Home className="h-4 w-4 mr-1" />
                    Try at Home
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Link>

        {/* Product Info */}
        <div className="p-4">
          <div className="mb-2">
            <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              {product.brand}
            </p>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 text-yellow-500 fill-current" />
              <span className="text-xs font-medium">{product.rating}</span>
              <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-[#FF6B35]">
                {formatPrice(product.price)}
              </div>
              {product.originalPrice && (
                <div className="text-xs text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              className="flex-1 bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-3 w-3 mr-1" />
              Add to Cart
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1"
              onClick={handleTryAtHome}
            >
              <Home className="h-3 w-3 mr-1" />
              Try at Home
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
