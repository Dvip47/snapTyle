import { Product } from '@/redux/slices/productSlice';

// Hyderabad delivery zones
export const HYDERABAD_ZONES = [
  { name: 'Banjara Hills', coordinates: { lat: 17.4065, lng: 78.4772 }, deliveryTime: '15-20 min' },
  { name: 'Gachibowli', coordinates: { lat: 17.4399, lng: 78.3481 }, deliveryTime: '20-25 min' },
  { name: 'Kukatpally', coordinates: { lat: 17.4849, lng: 78.3897 }, deliveryTime: '25-30 min' },
  { name: 'Hitech City', coordinates: { lat: 17.4478, lng: 78.3564 }, deliveryTime: '20-25 min' },
  { name: 'Jubilee Hills', coordinates: { lat: 17.4331, lng: 78.4078 }, deliveryTime: '15-20 min' },
  { name: 'Secunderabad', coordinates: { lat: 17.4399, lng: 78.4981 }, deliveryTime: '25-30 min' },
  { name: 'Kondapur', coordinates: { lat: 17.4849, lng: 78.3897 }, deliveryTime: '20-25 min' },
  { name: 'Madhapur', coordinates: { lat: 17.4484, lng: 78.3908 }, deliveryTime: '20-25 min' },
];

// Partner stores in Hyderabad
export const PARTNER_STORES = [
  {
    id: '1',
    name: 'Zudio - Banjara Hills',
    brand: 'Zudio',
    address: 'Road No. 12, Banjara Hills, Hyderabad',
    coordinates: { lat: 17.4065, lng: 78.4772 },
    zone: 'Banjara Hills',
    phone: '+91 98765 43210',
    operatingHours: '10:00 AM - 10:00 PM',
  },
  {
    id: '2',
    name: 'Max - Gachibowli',
    brand: 'Max',
    address: 'Gachibowli Main Road, Hyderabad',
    coordinates: { lat: 17.4399, lng: 78.3481 },
    zone: 'Gachibowli',
    phone: '+91 98765 43211',
    operatingHours: '10:00 AM - 10:00 PM',
  },
  {
    id: '3',
    name: 'Trends - Kukatpally',
    brand: 'Trends',
    address: 'Kukatpally Housing Board, Hyderabad',
    coordinates: { lat: 17.4849, lng: 78.3897 },
    zone: 'Kukatpally',
    phone: '+91 98765 43212',
    operatingHours: '10:00 AM - 10:00 PM',
  },
  {
    id: '4',
    name: 'Zudio - Hitech City',
    brand: 'Zudio',
    address: 'Hitech City Main Road, Hyderabad',
    coordinates: { lat: 17.4478, lng: 78.3564 },
    zone: 'Hitech City',
    phone: '+91 98765 43213',
    operatingHours: '10:00 AM - 10:00 PM',
  },
  {
    id: '5',
    name: 'Max - Jubilee Hills',
    brand: 'Max',
    address: 'Jubilee Hills Check Post, Hyderabad',
    coordinates: { lat: 17.4331, lng: 78.4078 },
    zone: 'Jubilee Hills',
    phone: '+91 98765 43214',
    operatingHours: '10:00 AM - 10:00 PM',
  },
];

// Mock products with Hyderabad focus
export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Cotton Casual T-Shirt',
    description: 'Comfortable cotton t-shirt perfect for everyday wear',
    price: 299,
    originalPrice: 399,
    images: ['/images/tshirt1.jpg', '/images/tshirt1-2.jpg'],
    brand: 'Zudio',
    category: 'Men\'s T-Shirts',
    size: ['S', 'M', 'L', 'XL'],
    color: ['White', 'Black', 'Navy Blue'],
    inStock: true,
    rating: 4.5,
    reviewCount: 128,
    deliveryTime: '15-30 min',
    tags: ['casual', 'cotton', 'everyday'],
  },
  {
    id: '2',
    name: 'Denim Jeans',
    description: 'Classic blue denim jeans with perfect fit',
    price: 799,
    originalPrice: 999,
    images: ['/images/jeans1.jpg', '/images/jeans1-2.jpg'],
    brand: 'Max',
    category: 'Men\'s Jeans',
    size: ['28', '30', '32', '34', '36'],
    color: ['Blue', 'Dark Blue'],
    inStock: true,
    rating: 4.3,
    reviewCount: 89,
    deliveryTime: '15-30 min',
    tags: ['denim', 'classic', 'jeans'],
  },
  {
    id: '3',
    name: 'Floral Summer Dress',
    description: 'Beautiful floral print dress for summer',
    price: 599,
    originalPrice: 799,
    images: ['/images/dress1.jpg', '/images/dress1-2.jpg'],
    brand: 'Trends',
    category: 'Women\'s Dresses',
    size: ['S', 'M', 'L', 'XL'],
    color: ['Pink', 'Blue', 'Yellow'],
    inStock: true,
    rating: 4.7,
    reviewCount: 156,
    deliveryTime: '15-30 min',
    tags: ['floral', 'summer', 'dress'],
  },
  {
    id: '4',
    name: 'Kurta Set',
    description: 'Traditional Indian kurta with matching bottoms',
    price: 1299,
    originalPrice: 1599,
    images: ['/images/kurta1.jpg', '/images/kurta1-2.jpg'],
    brand: 'Zudio',
    category: 'Women\'s Ethnic',
    size: ['S', 'M', 'L', 'XL'],
    color: ['Red', 'Green', 'Blue', 'Pink'],
    inStock: true,
    rating: 4.6,
    reviewCount: 203,
    deliveryTime: '15-30 min',
    tags: ['ethnic', 'traditional', 'kurta'],
  },
  {
    id: '5',
    name: 'Sports T-Shirt',
    description: 'Moisture-wicking sports t-shirt for active lifestyle',
    price: 399,
    originalPrice: 499,
    images: ['/images/sports1.jpg', '/images/sports1-2.jpg'],
    brand: 'Max',
    category: 'Men\'s Sports',
    size: ['S', 'M', 'L', 'XL'],
    color: ['Black', 'White', 'Grey'],
    inStock: true,
    rating: 4.4,
    reviewCount: 67,
    deliveryTime: '15-30 min',
    tags: ['sports', 'active', 'moisture-wicking'],
  },
  {
    id: '6',
    name: 'Casual Shirt',
    description: 'Formal-casual shirt perfect for office wear',
    price: 699,
    originalPrice: 899,
    images: ['/images/shirt1.jpg', '/images/shirt1-2.jpg'],
    brand: 'Trends',
    category: 'Men\'s Shirts',
    size: ['S', 'M', 'L', 'XL'],
    color: ['White', 'Blue', 'Light Blue'],
    inStock: true,
    rating: 4.2,
    reviewCount: 94,
    deliveryTime: '15-30 min',
    tags: ['formal', 'casual', 'office'],
  },
];

// Delivery partner simulation data
export const DELIVERY_PARTNERS = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    phone: '+91 98765 43220',
    vehicle: 'Bike',
    currentLocation: { lat: 17.4065, lng: 78.4772 },
    status: 'available',
    rating: 4.8,
    completedDeliveries: 1247,
  },
  {
    id: '2',
    name: 'Priya Sharma',
    phone: '+91 98765 43221',
    vehicle: 'Bike',
    currentLocation: { lat: 17.4399, lng: 78.3481 },
    status: 'available',
    rating: 4.9,
    completedDeliveries: 892,
  },
  {
    id: '3',
    name: 'Amit Singh',
    phone: '+91 98765 43222',
    vehicle: 'Bike',
    currentLocation: { lat: 17.4849, lng: 78.3897 },
    status: 'busy',
    rating: 4.7,
    completedDeliveries: 1563,
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    phone: '+91 98765 43223',
    vehicle: 'Bike',
    currentLocation: { lat: 17.4478, lng: 78.3564 },
    status: 'available',
    rating: 4.6,
    completedDeliveries: 734,
  },
];

// Pricing configuration
export const PRICING_CONFIG = {
  deliveryFee: {
    freeThreshold: 299,
    standardFee: 29,
  },
  homeTrial: {
    fee: 25,
    waitTime: 20, // minutes
  },
  instantDelivery: {
    baseTime: 15, // minutes
    maxTime: 30, // minutes
  },
};

// Calculate delivery ETA based on zone and store
export function calculateDeliveryETA(
  userZone: string,
  storeZone: string,
  deliveryType: 'instant' | 'home_trial'
): { eta: string; estimatedMinutes: number } {
  const zoneData = HYDERABAD_ZONES.find(zone => zone.name === userZone);
  const baseMinutes = zoneData ? parseInt(zoneData.deliveryTime.split('-')[0]) : 20;
  
  let estimatedMinutes = baseMinutes;
  if (deliveryType === 'home_trial') {
    estimatedMinutes += 20; // Add wait time for home trial
  }
  
  return {
    eta: `${estimatedMinutes}-${estimatedMinutes + 10} min`,
    estimatedMinutes
  };
}

// Find nearest store to user location
export function findNearestStore(userCoordinates: { lat: number; lng: number }): typeof PARTNER_STORES[0] | null {
  let nearestStore = null;
  let minDistance = Infinity;
  
  PARTNER_STORES.forEach(store => {
    const distance = Math.sqrt(
      Math.pow(store.coordinates.lat - userCoordinates.lat, 2) +
      Math.pow(store.coordinates.lng - userCoordinates.lng, 2)
    );
    
    if (distance < minDistance) {
      minDistance = distance;
      nearestStore = store;
    }
  });
  
  return nearestStore;
}
