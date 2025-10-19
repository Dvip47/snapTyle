'use client';

import { Card, CardContent } from '@/components/ui/card';

interface AnalyticsChartProps {
  data: Array<{
    date: string;
    sales: number;
    orders: number;
  }>;
}

export function AnalyticsChart({ data }: AnalyticsChartProps) {
  const maxSales = Math.max(...data.map(d => d.sales));
  const maxOrders = Math.max(...data.map(d => d.orders));

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-4">
      {/* Simple Bar Chart */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-foreground">Sales Trend</h4>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-[#FF6B35] rounded"></div>
              <span>Sales</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Orders</span>
            </div>
          </div>
        </div>
        
        <div className="h-48 flex items-end space-x-2">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center space-y-1">
              <div className="w-full flex flex-col items-center space-y-1">
                <div 
                  className="w-full bg-[#FF6B35] rounded-t"
                  style={{ height: `${(item.sales / maxSales) * 120}px` }}
                ></div>
                <div 
                  className="w-full bg-blue-500 rounded-b"
                  style={{ height: `${(item.orders / maxOrders) * 60}px` }}
                ></div>
              </div>
              <div className="text-xs text-muted-foreground text-center">
                {new Date(item.date).toLocaleDateString('en-IN', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
        <div className="text-center">
          <p className="text-2xl font-bold text-[#FF6B35]">
            {formatPrice(data.reduce((sum, item) => sum + item.sales, 0))}
          </p>
          <p className="text-sm text-muted-foreground">Total Sales</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">
            {data.reduce((sum, item) => sum + item.orders, 0)}
          </p>
          <p className="text-sm text-muted-foreground">Total Orders</p>
        </div>
      </div>
    </div>
  );
}
