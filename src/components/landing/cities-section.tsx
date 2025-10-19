import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Star } from 'lucide-react';

const hyderabadZones = [
  { name: 'Banjara Hills', deliveryTime: '15-20 min', rating: 4.9, isAvailable: true },
  { name: 'Gachibowli', deliveryTime: '20-25 min', rating: 4.8, isAvailable: true },
  { name: 'Kukatpally', deliveryTime: '25-30 min', rating: 4.7, isAvailable: true },
  { name: 'Hitech City', deliveryTime: '20-25 min', rating: 4.8, isAvailable: true },
  { name: 'Jubilee Hills', deliveryTime: '15-20 min', rating: 4.9, isAvailable: true },
  { name: 'Secunderabad', deliveryTime: '25-30 min', rating: 4.6, isAvailable: true },
  { name: 'Kondapur', deliveryTime: '20-25 min', rating: 4.7, isAvailable: true },
  { name: 'Madhapur', deliveryTime: '20-25 min', rating: 4.8, isAvailable: true },
];

export function CitiesSection() {
  const availableZones = hyderabadZones.filter(zone => zone.isAvailable);

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-[#FF6B35]/10 text-[#FF6B35] border-[#FF6B35]/20">
            Available Cities
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Delivering across{' '}
            <span className="text-[#FF6B35]">Hyderabad</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're currently focused on Hyderabad with 8 delivery zones. 
            Experience ultra-fast fashion delivery in your neighborhood.
          </p>
        </div>

        {/* Available Zones */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Hyderabad Delivery Zones
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {availableZones.map((zone, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-[#FF6B35]" />
                      <span className="font-semibold text-foreground">{zone.name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-muted-foreground">{zone.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{zone.deliveryTime}</span>
                  </div>
                  <div className="mt-4">
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      Available Now
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>


        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-[#FF6B35] to-orange-600 rounded-3xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Experience Ultra-Fast Fashion Delivery
            </h3>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Get your favorite fashion items delivered within 15-30 minutes across Hyderabad. 
              Try our premium home trial service for the perfect fit.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-[#FF6B35] hover:bg-white/90">
              Start Shopping Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
