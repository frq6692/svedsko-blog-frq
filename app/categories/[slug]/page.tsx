import { notFound } from 'next/navigation'

import { client } from '@/tina/__generated__/client'
import { Category } from '@/components/Category'
import { createCategoryMaps } from '@/app/categorySlugs'
import { Metadata } from 'next'
import siteConfig from '@/config/site.config.json'

export const generateStaticParams = async () => {
  const { slugToCategoryMap } = await createCategoryMaps()

  return Object.keys(slugToCategoryMap).map((slug) => {
    return { params: { slug } }
  })
}

export const generateMetadata = async ({ params }): Promise<Metadata> => {
  const { slugToCategoryMap } = await createCategoryMaps()

  if (!Object.keys(slugToCategoryMap).includes(params.slug)) {
    notFound()
  }

  const category = slugToCategoryMap[params.slug]

  return {
    title: `${siteConfig.metaData.title} – ${category[0].toUpperCase() + category.substring(1)}`,
  }
}

const CategoryPage = async ({ params }) => {
  const { slugToCategoryMap } = await createCategoryMaps()

  if (!Object.keys(slugToCategoryMap).includes(params.slug)) {
    notFound()
  }

  const posts = await client.queries.postConnection({
    last: -1,
    sort: 'date',
  })
  const authors = await client.queries.authorsConnection()

  return (
    <Category
      authors={authors}
      posts={posts.data.postConnection.edges.filter(
        ({ node }) => node.category === slugToCategoryMap[params.slug],
      )}
      category={slugToCategoryMap[params.slug]}
      slugToCategoryMap={slugToCategoryMap}
    />
  )
}

export default CategoryPage
