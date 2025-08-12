import type { Metadata } from 'next'

import { Categories } from '@/components/Categories'
import { createCategoryMaps } from '@/app/categorySlugs'
import siteConfig from '@/config/site.config.json'

export const metadata: Metadata = {
  title: `${siteConfig.metaData.title} – Kategorie`,
}

const CategoriesPage = async () => {
  const { categoriesWithPostsCountMap } = await createCategoryMaps()

  return <Categories categoriesWithPostsCountMap={categoriesWithPostsCountMap} />
}

export default CategoriesPage
