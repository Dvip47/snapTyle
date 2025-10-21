import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Truck, 
  Shield, 
  Heart, 
  Star, 
  Smartphone,
  CreditCard,
  RefreshCw
} from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Ultra-Fast Delivery',
    description: 'Get your orders delivered within 15-30 minutes. No more waiting hours for your favorite clothes.',
    color: 'text-[#FF6B35]',
    bgColor: 'bg-[#FF6B35]/10',
  },
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'Enjoy free delivery on all orders above ₹299. No hidden charges, no surprises.',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Your payments are protected with bank-level security. Shop with confidence.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    icon: Heart,
    title: 'Home Trial Premium',
    description: 'Try clothes at home with our ₹25 premium service. 20-minute wait time for perfect fit.',
    color: 'text-pink-600',
    bgColor: 'bg-pink-100',
  },
  {
    icon: Star,
    title: 'Curated Collections',
    description: 'Handpicked fashion items from top brands and emerging designers.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  },
  {
    icon: Smartphone,
    title: 'Easy Returns and Exchanges',
    description: 'Simple same day return and 7-day exchange policy. Return items you don\'t love, no questions asked.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-[#FF6B35]/10 text-[#FF6B35] border-[#FF6B35]/20">
            Why Choose SnapTyle
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Fashion Delivered{' '}
            <span className="text-[#FF6B35]">Instantly</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of fashion shopping with our instant delivery service. 
            Get your favorite clothes delivered in minutes, not days.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-8">
                <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-20 text-center">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3">
              <CreditCard className="h-6 w-6 text-[#FF6B35]" />
              <span className="text-sm font-medium">Multiple Payment Options</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <RefreshCw className="h-6 w-6 text-[#FF6B35]" />
              <span className="text-sm font-medium">Easy Exchanges</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Shield className="h-6 w-6 text-[#FF6B35]" />
              <span className="text-sm font-medium">100% Authentic</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
