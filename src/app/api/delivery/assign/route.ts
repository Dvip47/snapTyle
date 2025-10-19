import { NextRequest, NextResponse } from 'next/server';
import { DELIVERY_PARTNERS, PARTNER_STORES, calculateDeliveryETA, findNearestStore } from '@/lib/mock-data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, userCoordinates, deliveryType, userZone } = body;

    // Find nearest store
    const nearestStore = findNearestStore(userCoordinates);
    if (!nearestStore) {
      return NextResponse.json(
        { error: 'No store available in your area' },
        { status: 400 }
      );
    }

    // Find available delivery partner
    const availablePartner = DELIVERY_PARTNERS.find(
      partner => partner.status === 'available' && 
      partner.currentLocation.lat === nearestStore.coordinates.lat &&
      partner.currentLocation.lng === nearestStore.coordinates.lng
    );

    if (!availablePartner) {
      return NextResponse.json(
        { error: 'No delivery partner available at the moment' },
        { status: 503 }
      );
    }

    // Calculate ETA
    const eta = calculateDeliveryETA(userZone, nearestStore.zone, deliveryType);

    // Simulate delivery assignment
    const deliveryAssignment = {
      orderId,
      partner: {
        id: availablePartner.id,
        name: availablePartner.name,
        phone: availablePartner.phone,
        vehicle: availablePartner.vehicle,
        rating: availablePartner.rating,
      },
      store: {
        id: nearestStore.id,
        name: nearestStore.name,
        address: nearestStore.address,
        phone: nearestStore.phone,
      },
      eta: eta.eta,
      estimatedMinutes: eta.estimatedMinutes,
      status: 'assigned',
      deliveryType,
      zone: userZone,
      assignedAt: new Date().toISOString(),
    };

    return NextResponse.json(deliveryAssignment);
  } catch (error) {
    console.error('Delivery assignment error:', error);
    return NextResponse.json(
      { error: 'Failed to assign delivery partner' },
      { status: 500 }
    );
  }
}
