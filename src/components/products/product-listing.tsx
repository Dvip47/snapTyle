'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from './product-card';
import { FilterPanel } from './filter-panel';
import { SortDropdown } from './sort-dropdown';
import { ViewToggle } from './view-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  MapPin,
  Clock,
  Truck,
  MoveLeft
} from 'lucide-react';
import { MOCK_PRODUCTS, HYDERABAD_ZONES } from '@/lib/mock-data';
import { useRouter } from "next/navigation";

export function ProductListing() {
  const router = useRouter();

  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState(MOCK_PRODUCTS);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState('All Zones');
  const [sortBy, setSortBy] = useState('popularity');
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    priceRange: [0, 2000],
    size: '',
    color: '',
    deliveryType: '',
  });

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Brand filter
    if (filters.brand) {
      filtered = filtered.filter(product => product.brand === filters.brand);
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Size filter
    if (filters.size) {
      filtered = filtered.filter(product => product.size.includes(filters.size));
    }

    // Color filter
    if (filters.color) {
      filtered = filtered.filter(product => product.color.includes(filters.color));
    }

    // Delivery type filter
    if (filters.deliveryType) {
      if (filters.deliveryType === 'instant') {
        filtered = filtered.filter(product => product.deliveryTime === '15-30 min');
      } else if (filters.deliveryType === 'home_trial') {
        filtered = filtered.filter(product => product.deliveryTime === '15-30 min'); // All products support home trial
      }
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'popularity':
      default:
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, filters, sortBy]);

  const categories = [...new Set(products.map(p => p.category))];
  const brands = [...new Set(products.map(p => p.brand))];
  const sizes = [...new Set(products.flatMap(p => p.size))];
  const colors = [...new Set(products.flatMap(p => p.color))];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className='mb-4'>
      <MoveLeft
        className="h-5 w-5 cursor-pointer hover:text-blue-500 transition-colors"
        onClick={() => router.back()}
      />          
        </div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Shop Fashion</h1>
            <p className="text-muted-foreground mt-2">
              Get your favorite items delivered within 15-30 minutes in Hyderabad
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-[#FF6B35]/10 text-[#FF6B35] border-[#FF6B35]/20">
              <MapPin className="h-4 w-4 mr-2" />
              {selectedZone}
            </Badge>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products, brands, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <SortDropdown value={sortBy} onChange={setSortBy} />
            <ViewToggle value={viewMode} onChange={setViewMode} />
          </div>
        </div>

        {/* Zone Selection */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={selectedZone === 'All Zones' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedZone('All Zones')}
            className={selectedZone === 'All Zones' ? 'bg-[#FF6B35] text-white' : ''}
          >
            All Zones
          </Button>
          {HYDERABAD_ZONES.map((zone) => (
            <Button
              key={zone.name}
              variant={selectedZone === zone.name ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedZone(zone.name)}
              className={selectedZone === zone.name ? 'bg-[#FF6B35] text-white' : ''}
            >
              {zone.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className={`w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <FilterPanel
            categories={categories}
            brands={brands}
            sizes={sizes}
            colors={colors}
            filters={filters}
            onFiltersChange={setFilters}
          />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <p className="text-muted-foreground">
                {filteredProducts.length} products found
              </p>
              {selectedZone !== 'All Zones' && (
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  <Clock className="h-3 w-3 mr-1" />
                  {HYDERABAD_ZONES.find(z => z.name === selectedZone)?.deliveryTime || '15-30 min'}
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Truck className="h-4 w-4" />
              <span>Free delivery above ₹299</span>
            </div>
          </div>

          {/* Products Grid/List */}
          {filteredProducts.length > 0 ? (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                  selectedZone={selectedZone}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({
                      category: '',
                      brand: '',
                      priceRange: [0, 2000],
                      size: '',
                      color: '',
                      deliveryType: '',
                    });
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
