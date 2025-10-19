'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  MapPin, 
  Phone, 
  CheckCircle, 
  Truck, 
  User,
  Star
} from 'lucide-react';

interface DeliveryTrackingProps {
  orderId: string;
}

interface TrackingData {
  orderId: string;
  status: string;
  progress: number;
  message: string;
  estimatedDelivery: string;
  partner: {
    name: string;
    phone: string;
    vehicle: string;
    rating: number;
  };
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  timeline: Array<{
    status: string;
    message: string;
    timestamp: string;
    completed: boolean;
  }>;
}

export function DeliveryTracking({ orderId }: DeliveryTrackingProps) {
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        const response = await fetch(`/api/delivery/track?orderId=${orderId}`);
        const data = await response.json();
        setTrackingData(data);
      } catch (error) {
        console.error('Failed to fetch tracking data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackingData();
    const interval = setInterval(fetchTrackingData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [orderId]);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!trackingData) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-muted-foreground">Unable to load tracking information</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'arrived':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'in_transit':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'picked_up':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5" />;
      case 'arrived':
        return <MapPin className="h-5 w-5" />;
      case 'in_transit':
        return <Truck className="h-5 w-5" />;
      case 'picked_up':
        return <Clock className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {getStatusIcon(trackingData.status)}
              <div>
                <h3 className="font-semibold text-foreground">{trackingData.message}</h3>
                <p className="text-sm text-muted-foreground">
                  ETA: {new Date(trackingData.estimatedDelivery).toLocaleTimeString()}
                </p>
              </div>
            </div>
            <Badge className={getStatusColor(trackingData.status)}>
              {trackingData.status.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-[#FF6B35] h-2 rounded-full transition-all duration-500"
              style={{ width: `${trackingData.progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-muted-foreground">
            {trackingData.progress}% Complete
          </p>
        </CardContent>
      </Card>

      {/* Delivery Partner Info */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-semibold text-foreground mb-4">Delivery Partner</h4>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[#FF6B35]/10 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-[#FF6B35]" />
            </div>
            <div className="flex-1">
              <h5 className="font-medium text-foreground">{trackingData.partner.name}</h5>
              <p className="text-sm text-muted-foreground">{trackingData.partner.vehicle}</p>
              <div className="flex items-center space-x-1 mt-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm text-muted-foreground">{trackingData.partner.rating}</span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              Call
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-semibold text-foreground mb-4">Delivery Timeline</h4>
          <div className="space-y-4">
            {trackingData.timeline.map((event, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  event.completed 
                    ? 'bg-[#FF6B35] text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {event.completed ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Clock className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1">
                  <h5 className={`font-medium ${
                    event.completed ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {event.message}
                  </h5>
                  <p className="text-sm text-muted-foreground">
                    {new Date(event.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
