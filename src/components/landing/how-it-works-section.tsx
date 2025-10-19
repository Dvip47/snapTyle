import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  ShoppingCart, 
  Truck, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    step: '01',
    icon: Search,
    title: 'Browse & Select',
    description: 'Browse our curated collection of fashion items. Filter by size, color, brand, and price.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    step: '02',
    icon: ShoppingCart,
    title: 'Add to Cart',
    description: 'Add your favorite items to cart. Choose your size and color preferences.',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    step: '03',
    icon: Truck,
    title: 'Instant Delivery',
    description: 'Get your order delivered within 2-4 hours. Track your delivery in real-time.',
    color: 'text-[#FF6B35]',
    bgColor: 'bg-[#FF6B35]/10',
  },
  {
    step: '04',
    icon: CheckCircle,
    title: 'Enjoy & Return',
    description: 'Try your clothes and keep what you love. Easy returns within 7 days.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-[#FF6B35]/10 text-[#FF6B35] border-[#FF6B35]/20">
            How It Works
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Shopping Made{' '}
            <span className="text-[#FF6B35]">Simple</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get your favorite fashion items in just 4 simple steps. 
            From browsing to delivery, we've made it effortless.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md relative">
              <CardContent className="p-8 text-center">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-[#FF6B35] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 ${step.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className={`h-8 w-8 ${step.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </CardContent>

              {/* Arrow for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-6 w-6 text-[#FF6B35]" />
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-[#FF6B35] to-orange-600 rounded-3xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Experience Instant Fashion?
            </h3>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of fashion lovers who are already enjoying instant delivery. 
              Start shopping now and get your first order delivered within hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="bg-white text-[#FF6B35] hover:bg-white/90">
                <Link href="/products">
                  Start Shopping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
