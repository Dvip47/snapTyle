'use client';

import { Button } from '@/components/ui/button';
import { Grid3X3, List } from 'lucide-react';

interface ViewToggleProps {
  value: 'grid' | 'list';
  onChange: (value: 'grid' | 'list') => void;
}

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="flex border rounded-md">
      <Button
        variant={value === 'grid' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onChange('grid')}
        className={`rounded-r-none ${
          value === 'grid' 
            ? 'bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90' 
            : 'hover:bg-muted'
        }`}
      >
        <Grid3X3 className="h-4 w-4" />
      </Button>
      <Button
        variant={value === 'list' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onChange('list')}
        className={`rounded-l-none ${
          value === 'list' 
            ? 'bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90' 
            : 'hover:bg-muted'
        }`}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
}
