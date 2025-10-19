import { ProductDetail } from '@/components/products/product-detail';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <ProductDetail productId={params.id} />
    </div>
  );
}
