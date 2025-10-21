'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { 
  X, 
  Filter, 
  Clock, 
  Home,
  Truck
} from 'lucide-react';

interface FilterPanelProps {
  categories: string[];
  brands: string[];
  sizes: string[];
  colors: string[];
  filters: {
    category: string;
    brand: string;
    priceRange: [number, number];
    size: string;
    color: string;
    deliveryType: string;
  };
  onFiltersChange: (filters: any) => void;
}

export function FilterPanel({ 
  categories, 
  brands, 
  sizes, 
  colors, 
  filters, 
  onFiltersChange 
}: FilterPanelProps) {
  const handleFilterChange = (key: string, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      category: '',
      brand: '',
      priceRange: [0, 2000],
      size: '',
      color: '',
      deliveryType: '',
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== '' && value !== 0 && (Array.isArray(value) ? value[0] !== 0 || value[1] !== 2000 : true)
  );

  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Filters</CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-[#FF6B35] hover:text-[#FF6B35]/80"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Delivery Type */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Delivery Options</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="instant"
                checked={filters.deliveryType === 'instant'}
                onCheckedChange={(checked) => 
                  handleFilterChange('deliveryType', checked ? 'instant' : '')
                }
              />
              <label htmlFor="instant" className="text-sm font-medium cursor-pointer">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-[#FF6B35]" />
                  <span>Instant Delivery (15-30 min)</span>
                </div>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="home_trial"
                checked={filters.deliveryType === 'home_trial'}
                onCheckedChange={(checked) => 
                  handleFilterChange('deliveryType', checked ? 'home_trial' : '')
                }
              />
              <label htmlFor="home_trial" className="text-sm font-medium cursor-pointer">
                <div className="flex items-center space-x-2">
                  <Home className="h-4 w-4 text-purple-600" />
                  <span>with Home Trial Available (+₹25)</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Price Range</h4>
          <div className="space-y-3">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => handleFilterChange('priceRange', value)}
              max={2000}
              min={0}
              step={50}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>₹{filters.priceRange[0]}</span>
              <span>₹{filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={filters.category === category}
                  onCheckedChange={(checked) => 
                    handleFilterChange('category', checked ? category : '')
                  }
                />
                <label htmlFor={category} className="text-sm font-medium cursor-pointer">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Brands</h4>
          <div className="space-y-2">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={brand}
                  checked={filters.brand === brand}
                  onCheckedChange={(checked) => 
                    handleFilterChange('brand', checked ? brand : '')
                  }
                />
                <label htmlFor={brand} className="text-sm font-medium cursor-pointer">
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Sizes</h4>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <Button
                key={size}
                variant={filters.size === size ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterChange('size', filters.size === size ? '' : size)}
                className={filters.size === size ? 'bg-[#FF6B35] text-white' : ''}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Colors</h4>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <Button
                key={color}
                variant={filters.color === color ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterChange('color', filters.color === color ? '' : color)}
                className={filters.color === color ? 'bg-[#FF6B35] text-white' : ''}
              >
                {color}
              </Button>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div>
            <h4 className="font-medium text-foreground mb-3">Active Filters</h4>
            <div className="flex flex-wrap gap-2">
              {filters.category && (
                <Badge variant="secondary" className="bg-[#FF6B35]/10 text-[#FF6B35]">
                  Category: {filters.category}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => handleFilterChange('category', '')}
                  />
                </Badge>
              )}
              {filters.brand && (
                <Badge variant="secondary" className="bg-[#FF6B35]/10 text-[#FF6B35]">
                  Brand: {filters.brand}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => handleFilterChange('brand', '')}
                  />
                </Badge>
              )}
              {filters.size && (
                <Badge variant="secondary" className="bg-[#FF6B35]/10 text-[#FF6B35]">
                  Size: {filters.size}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => handleFilterChange('size', '')}
                  />
                </Badge>
              )}
              {filters.color && (
                <Badge variant="secondary" className="bg-[#FF6B35]/10 text-[#FF6B35]">
                  Color: {filters.color}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => handleFilterChange('color', '')}
                  />
                </Badge>
              )}
              {filters.deliveryType && (
                <Badge variant="secondary" className="bg-[#FF6B35]/10 text-[#FF6B35]">
                  {filters.deliveryType === 'instant' ? 'Instant Delivery' : 'Home Trial'}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => handleFilterChange('deliveryType', '')}
                  />
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
