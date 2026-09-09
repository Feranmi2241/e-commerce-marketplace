import ProductPage from '../page'

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params
  return <ProductPage productId={resolvedParams?.id} />
}
