'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { removeFromCart, updateCartItemQuantity, setDeliveryType, calculateTotal } from '@/redux/slices/orderSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  Clock, 
  Home, 
  Truck,
  MapPin,
  CreditCard,
  ArrowRight,
  Tag
} from 'lucide-react';
import { DeliveryOptions } from '@/components/checkout/delivery-options';

export function CartPage() {
  const dispatch = useDispatch();
  const { cart, cartTotal, currentOrder } = useSelector((state: RootState) => state.orders);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleQuantityChange = (productId: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch(removeFromCart({ productId, size, color }));
    } else {
      dispatch(updateCartItemQuantity({ productId, size, color, quantity }));
    }
    dispatch(calculateTotal());
  };

  const handleRemoveItem = (productId: string, size: string, color: string) => {
    dispatch(removeFromCart({ productId, size, color }));
    dispatch(calculateTotal());
  };

  const handleApplyPromo = () => {
    if (promoCode === 'WELCOME10') {
      setAppliedPromo('WELCOME10');
      // Apply 10% discount logic here
    } else {
      alert('Invalid promo code');
    }
  };

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 299 ? 0 : 29;
  const discount = appliedPromo ? subtotal * 0.1 : 0;
  const total = subtotal + deliveryFee + (currentOrder?.additionalFee || 0) - discount;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Add some items to your cart to get started
          </p>
          <Button asChild className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white">
            <a href="/products">Continue Shopping</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
            <Badge variant="secondary" className="bg-[#FF6B35]/10 text-[#FF6B35]">
              {cart.length} items
            </Badge>
          </div>

          <div className="space-y-4">
            {cart.map((item) => (
              <Card key={`${item.productId}-${item.size}-${item.color}`}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">👗</span>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Size: {item.size} • Color: {item.color}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityChange(item.productId, item.size, item.color, item.quantity - 1)}
                            className="h-8 w-8"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="font-medium w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityChange(item.productId, item.size, item.color, item.quantity + 1)}
                            className="h-8 w-8"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-[#FF6B35]">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {formatPrice(item.price)} each
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item.productId, item.size, item.color)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Delivery Options */}
              <DeliveryOptions />

              <Separator />

              {/* Promo Code */}
              <div>
                <h4 className="font-medium text-foreground mb-3">Promo Code</h4>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    onClick={handleApplyPromo}
                    disabled={!promoCode}
                  >
                    <Tag className="h-4 w-4 mr-1" />
                    Apply
                  </Button>
                </div>
                {appliedPromo && (
                  <div className="mt-2 flex items-center space-x-2 text-green-600">
                    <span className="text-sm">✓ Applied {appliedPromo}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setAppliedPromo(null);
                        setPromoCode('');
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="font-medium">
                    {deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}
                  </span>
                </div>
                {currentOrder?.additionalFee && currentOrder.additionalFee > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Home Trial Fee</span>
                    <span className="font-medium">{formatPrice(currentOrder.additionalFee)}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedPromo})</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-[#FF6B35]">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="h-4 w-4 text-[#FF6B35]" />
                  <span className="font-medium">Delivery to Hyderabad</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>
                    {currentOrder?.deliveryType === 'home_trial' 
                      ? '35-50 minutes (with 20-min trial)' 
                      : '15-30 minutes'
                    }
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                size="lg"
                className="w-full bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Proceed to Checkout
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>

              {/* Payment Methods */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">We accept</p>
                <div className="flex justify-center space-x-4 text-xs text-muted-foreground">
                  <span>UPI</span>
                  <span>•</span>
                  <span>Cards</span>
                  <span>•</span>
                  <span>Net Banking</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
