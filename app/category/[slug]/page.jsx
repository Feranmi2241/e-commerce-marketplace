import CategoryPage from '../page'

export default async function CategorySlugPage({ params, searchParams }) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  const slug = resolvedParams?.slug || 'electronics'
  const displayName = slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

  return <CategoryPage searchParams={{ ...resolvedSearchParams, category: displayName }} />
}
