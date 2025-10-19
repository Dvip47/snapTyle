import { NextRequest, NextResponse } from 'next/server';

// Mock delivery tracking data
const deliveryStatuses = [
  { status: 'assigned', message: 'Delivery partner assigned', timestamp: 0 },
  { status: 'picked_up', message: 'Order picked up from store', timestamp: 5 },
  { status: 'in_transit', message: 'On the way to your location', timestamp: 15 },
  { status: 'arrived', message: 'Arrived at your location', timestamp: 25 },
  { status: 'delivered', message: 'Order delivered successfully', timestamp: 30 },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Simulate delivery tracking based on order creation time
    const orderCreatedAt = new Date(); // In real app, get from database
    const minutesElapsed = Math.floor((Date.now() - orderCreatedAt.getTime()) / (1000 * 60));
    
    let currentStatus = 'assigned';
    let progress = 0;
    
    if (minutesElapsed >= 30) {
      currentStatus = 'delivered';
      progress = 100;
    } else if (minutesElapsed >= 25) {
      currentStatus = 'arrived';
      progress = 90;
    } else if (minutesElapsed >= 15) {
      currentStatus = 'in_transit';
      progress = 70;
    } else if (minutesElapsed >= 5) {
      currentStatus = 'picked_up';
      progress = 40;
    } else {
      currentStatus = 'assigned';
      progress = 20;
    }

    const trackingInfo = {
      orderId,
      status: currentStatus,
      progress,
      message: deliveryStatuses.find(s => s.status === currentStatus)?.message || 'Processing...',
      estimatedDelivery: new Date(Date.now() + (30 - minutesElapsed) * 60000).toISOString(),
      partner: {
        name: 'Rajesh Kumar',
        phone: '+91 98765 43220',
        vehicle: 'Bike',
        rating: 4.8,
      },
      location: {
        lat: 17.4065,
        lng: 78.4772,
        address: 'Near your location',
      },
      timeline: deliveryStatuses.map(status => ({
        ...status,
        completed: minutesElapsed >= status.timestamp,
        timestamp: new Date(orderCreatedAt.getTime() + status.timestamp * 60000).toISOString(),
      })),
    };

    return NextResponse.json(trackingInfo);
  } catch (error) {
    console.error('Delivery tracking error:', error);
    return NextResponse.json(
      { error: 'Failed to track delivery' },
      { status: 500 }
    );
  }
}
