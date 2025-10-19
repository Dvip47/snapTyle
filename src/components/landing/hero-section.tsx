'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, Truck, Shield } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-[#FF6B35]/10 text-[#FF6B35] border-[#FF6B35]/20">
                🚀 Instant Fashion Delivery
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Fashion in{' '}
                <span className="text-[#FF6B35]">30 Minutes</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Get your favorite clothing items delivered within 15-30 minutes in Hyderabad. 
                Shop the latest trends with instant delivery and home trial options.
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-[#FF6B35]" />
                <span className="text-sm font-medium">15-30 Min Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-[#FF6B35]" />
                <span className="text-sm font-medium">Home Trial Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-[#FF6B35]" />
                <span className="text-sm font-medium">Hyderabad Focus</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white">
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/categories">
                  Browse Categories
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FF6B35]">5K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FF6B35]">8</div>
                <div className="text-sm text-muted-foreground">Hyderabad Zones</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FF6B35]">25min</div>
                <div className="text-sm text-muted-foreground">Avg Delivery</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <div className="aspect-square bg-gradient-to-br from-[#FF6B35] to-orange-600 rounded-3xl p-8 shadow-2xl">
                <div className="h-full w-full bg-white/10 rounded-2xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">👗</div>
                    <div className="text-2xl font-bold">Instant Fashion</div>
                    <div className="text-lg opacity-90">Delivered in Hours</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
