'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Clock, Heart } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { Product } from '@/redux/slices/productSlice';

interface RelatedProductsProps {
  currentProductId: string;
}

export function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const currentProduct = MOCK_PRODUCTS.find(p => p.id === currentProductId);
  const relatedProducts = MOCK_PRODUCTS
    .filter(p => p.id !== currentProductId && p.category === currentProduct?.category)
    .slice(0, 4);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">You might also like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
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
                    <Badge variant="secondary" className="bg-[#FF6B35]/10 text-[#FF6B35] border-[#FF6B35]/20">
                      <Clock className="h-3 w-3 mr-1" />
                      {product.deliveryTime}
                    </Badge>
                  </div>

                  {/* Like Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                  >
                    <Heart className="h-4 w-4 text-muted-foreground" />
                  </Button>
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

                <Button
                  size="sm"
                  className="w-full bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white"
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
