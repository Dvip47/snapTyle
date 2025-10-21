'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { addToCart, setDeliveryType } from '@/redux/slices/orderSlice';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Heart, 
  ShoppingCart, 
  Home, 
  Clock, 
  Star,
  Truck,
  Shield,
  RotateCcw,
  Plus,
  Minus,
  MapPin,
  CheckCircle,
  MoveLeft
} from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { Product } from '@/redux/slices/productSlice';
import { RelatedProducts } from './related-products';
import { useRouter } from 'next/navigation';

interface ProductDetailProps {
  productId: string;
}

export function ProductDetail({ productId }: ProductDetailProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cart } = useSelector((state: RootState) => state.orders);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [deliveryType, setDeliveryType] = useState<'instant' | 'home_trial'>('instant');

  useEffect(() => {
    const foundProduct = MOCK_PRODUCTS.find(p => p.id === productId);
    setProduct(foundProduct || null);
  }, [productId]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Product not found</h1>
          <p className="text-muted-foreground mt-2">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }

    dispatch(addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      color: selectedColor,
      image: product.images[0],
    }));

    alert('Added to cart!');
  };

  const handleTryAtHome = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }

    dispatch(addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      color: selectedColor,
      image: product.images[0],
    }));

    dispatch(setDeliveryType({ deliveryType: 'home_trial', additionalFee: 25 }));
    alert('Added to cart with Home Trial!');
  };

  const isInCart = cart.some(item => 
    item.productId === product.id && 
    item.size === selectedSize && 
    item.color === selectedColor
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className='mb-4'>
      <MoveLeft
        className="h-5 w-5 cursor-pointer hover:text-blue-500 transition-colors"
        onClick={() => router.back()}
      />          
        </div>
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
            <span className="text-8xl">👗</span>
          </div>
          
          {/* Image Thumbnails */}
          <div className="flex space-x-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-16 h-16 rounded-lg border-2 ${
                  selectedImage === index 
                    ? 'border-[#FF6B35]' 
                    : 'border-gray-200'
                }`}
              >
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-xl">👗</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="secondary" className="bg-[#FF6B35]/10 text-[#FF6B35]">
                {product.brand}
              </Badge>
              {product.originalPrice && (
                <Badge className="bg-red-500 text-white">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
              <span className="font-semibold">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-[#FF6B35]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.size.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedSize(size)}
                  className={selectedSize === size ? 'bg-[#FF6B35] text-white' : ''}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Color</h3>
            <div className="flex flex-wrap gap-2">
              {product.color.map((color) => (
                <Button
                  key={color}
                  variant={selectedColor === color ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedColor(color)}
                  className={selectedColor === color ? 'bg-[#FF6B35] text-white' : ''}
                >
                  {color}
                </Button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Quantity</h3>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-semibold text-lg">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Delivery Options */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Delivery Options</h3>
              <div className="space-y-3">
                <div 
                  className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    deliveryType === 'instant' 
                      ? 'border-[#FF6B35] bg-[#FF6B35]/5' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setDeliveryType('instant')}
                >
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    deliveryType === 'instant' 
                      ? 'border-[#FF6B35] bg-[#FF6B35]' 
                      : 'border-gray-300'
                  }`}>
                    {deliveryType === 'instant' && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-[#FF6B35]" />
                      <span className="font-medium">Instant Delivery</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Free
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Get your order delivered within 15-30 minutes
                    </p>
                  </div>
                </div>

                <div 
                  className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    deliveryType === 'home_trial' 
                      ? 'border-[#FF6B35] bg-[#FF6B35]/5' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setDeliveryType('home_trial')}
                >
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    deliveryType === 'home_trial' 
                      ? 'border-[#FF6B35] bg-[#FF6B35]' 
                      : 'border-gray-300'
                  }`}>
                    {deliveryType === 'home_trial' && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Home className="h-4 w-4 text-purple-600" />
                      <span className="font-medium">Home Trial Premium</span>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                        +₹25
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Try clothes at home with 20-minute wait time (35-50 min total)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button
              size="lg"
              className="flex-1 bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white"
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {isInCart ? 'In Cart' : 'Add to Cart'}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1"
              onClick={handleTryAtHome}
              disabled={!selectedSize || !selectedColor}
            >
              <Home className="h-5 w-5 mr-2" />
              Try at Home +₹25
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsLiked(!isLiked)}
              className={`${isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-4 w-4 text-[#FF6B35]" />
              <span className="text-sm">Free Delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-[#FF6B35]" />
              <span className="text-sm">Secure Payment</span>
            </div>
            <div className="flex items-center space-x-2">
              <RotateCcw className="h-4 w-4 text-[#FF6B35]" />
              <span className="text-sm">Easy Returns</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-[#FF6B35]" />
              <span className="text-sm">Authentic Products</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <RelatedProducts currentProductId={product.id} />
      </div>
    </div>
  );
}
