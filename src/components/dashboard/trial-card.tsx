'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Clock, 
  CheckCircle,
  RotateCcw,
  Heart,
  Star
} from 'lucide-react';

interface TrialCardProps {
  trial: {
    id: string;
    orderId: string;
    status: string;
    items: Array<{
      name: string;
      size: string;
      color: string;
      quantity: number;
      price: number;
    }>;
    trialFee: number;
    trialStartTime: string;
    trialEndTime: string;
    itemsKept: string[];
    itemsReturned: string[];
    totalPaid: number;
  };
}

export function TrialCard({ trial }: TrialCardProps) {
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
      case 'waiting':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'in_progress':
        return <Clock className="h-4 w-4" />;
      default:
        return <Home className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'waiting':
        return 'Waiting for Delivery';
      case 'in_progress':
        return 'Trial in Progress';
      case 'completed':
        return 'Trial Completed';
      case 'cancelled':
        return 'Trial Cancelled';
      default:
        return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Home className="h-5 w-5" />
            <span>Trial #{trial.id}</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(trial.status)}>
              {getStatusIcon(trial.status)}
              <span className="ml-1">{getStatusText(trial.status)}</span>
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">
              +₹{trial.trialFee} Trial Fee
            </Badge>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span>Order #{trial.orderId}</span>
          <span>• Started: {formatDate(trial.trialStartTime)}</span>
          <span>• Ended: {formatDate(trial.trialEndTime)}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Trial Items */}
        <div>
          <h4 className="font-medium text-foreground mb-2">Trial Items ({trial.items.length})</h4>
          <div className="space-y-2">
            {trial.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Size: {item.size} • Color: {item.color}
                  </p>
                </div>
                <div className="text-sm font-medium">
                  {formatPrice(item.price)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trial Results */}
        {trial.status === 'completed' && (
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-3">Trial Results</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Items Kept */}
              <div className="bg-green-50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-900">Items Kept ({trial.itemsKept.length})</span>
                </div>
                {trial.itemsKept.length > 0 ? (
                  <ul className="text-sm text-green-700 space-y-1">
                    {trial.itemsKept.map((item, index) => (
                      <li key={index} className="flex items-center space-x-1">
                        <Heart className="h-3 w-3 fill-current" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-green-700">No items kept</p>
                )}
              </div>

              {/* Items Returned */}
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <RotateCcw className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-900">Items Returned ({trial.itemsReturned.length})</span>
                </div>
                {trial.itemsReturned.length > 0 ? (
                  <ul className="text-sm text-blue-700 space-y-1">
                    {trial.itemsReturned.map((item, index) => (
                      <li key={index} className="flex items-center space-x-1">
                        <RotateCcw className="h-3 w-3" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-blue-700">No items returned</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Trial Timer (if in progress) */}
        {trial.status === 'in_progress' && (
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              <span className="font-medium text-yellow-900">Trial in Progress</span>
            </div>
            <p className="text-sm text-yellow-700">
              You have 20 minutes to try on the items. The delivery partner is waiting.
            </p>
            <div className="mt-3">
              <div className="w-full bg-yellow-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-xs text-yellow-700 mt-1">15 minutes remaining</p>
            </div>
          </div>
        )}

        {/* Trial Summary */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm">
            <div className="flex items-center space-x-4 text-muted-foreground">
              <span>Trial Fee: {formatPrice(trial.trialFee)}</span>
              <span>Items Kept: {trial.itemsKept.length}</span>
              <span>Items Returned: {trial.itemsReturned.length}</span>
            </div>
            <div className="font-semibold text-lg text-[#FF6B35]">
              Total Paid: {formatPrice(trial.totalPaid)}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Star className="h-4 w-4 mr-1" />
              Rate Experience
            </Button>
            {trial.status === 'completed' && (
              <Button size="sm" className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white">
                Order Again
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
