'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Home, CreditCard } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setDeliveryType, calculateTotal } from '@/redux/slices/orderSlice';

interface DeliveryOptionsProps {
  onDeliveryTypeChange?: (type: 'instant' | 'home_trial') => void;
}

export function DeliveryOptions({ onDeliveryTypeChange }: DeliveryOptionsProps) {
  const dispatch = useDispatch();
  const { currentOrder, cartTotal } = useSelector((state: RootState) => state.orders);
  const [selectedType, setSelectedType] = useState<'instant' | 'home_trial'>('instant');

  const handleDeliveryTypeChange = (type: 'instant' | 'home_trial') => {
    setSelectedType(type);
    dispatch(setDeliveryType({ 
      deliveryType: type, 
      additionalFee: type === 'home_trial' ? 25 : 0 
    }));
    dispatch(calculateTotal());
    onDeliveryTypeChange?.(type);
  };

  const deliveryOptions = [
    {
      type: 'instant' as const,
      title: 'Instant Delivery',
      description: 'Get your order delivered within 15-30 minutes',
      icon: Clock,
      price: 'Free',
      time: '15-30 min',
      color: 'text-[#FF6B35]',
      bgColor: 'bg-[#FF6B35]/10',
      borderColor: 'border-[#FF6B35]/20',
    },
    {
      type: 'home_trial' as const,
      title: 'Home Trial Premium',
      description: 'Try clothes at home with 20-minute wait time',
      icon: Home,
      price: '₹25',
      time: '35-50 min',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      borderColor: 'border-purple-200',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Delivery Options</h3>
        <p className="text-sm text-muted-foreground">
          Choose your preferred delivery method
        </p>
      </div>

      <div className="grid gap-4">
        {deliveryOptions.map((option) => (
          <Card 
            key={option.type}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedType === option.type 
                ? `border-2 ${option.borderColor} shadow-md` 
                : 'border border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleDeliveryTypeChange(option.type)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${option.bgColor} rounded-xl flex items-center justify-center`}>
                    <option.icon className={`h-6 w-6 ${option.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-foreground">{option.title}</h4>
                      {option.type === 'home_trial' && (
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">
                          Premium
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {option.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{option.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{option.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 ${
                    selectedType === option.type 
                      ? `border-[#FF6B35] bg-[#FF6B35]` 
                      : 'border-gray-300'
                  }`}>
                    {selectedType === option.type && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Order Summary */}
      <Card className="bg-muted/30">
        <CardContent className="p-6">
          <h4 className="font-semibold text-foreground mb-4">Order Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">₹{cartTotal - (currentOrder?.additionalFee || 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery Fee</span>
              <span className="font-medium">Free</span>
            </div>
            {currentOrder?.additionalFee && currentOrder.additionalFee > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Home Trial Fee</span>
                <span className="font-medium">₹{currentOrder.additionalFee}</span>
              </div>
            )}
            <div className="border-t pt-2">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{cartTotal}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
