import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { createTagMaps } from '@/app/tagSlugs'
import { client } from '@/tina/__generated__/client'
import { Tag } from '@/components/Tag'
import siteConfig from '@/config/site.config.json'

export const generateStaticParams = async () => {
  const { slugToTagMap } = await createTagMaps()

  return Object.keys(slugToTagMap).map((slug) => {
    return { params: { slug } }
  })
}

export const generateMetadata = async ({ params }): Promise<Metadata> => {
  const { slugToTagMap } = await createTagMaps()

  if (!Object.keys(slugToTagMap).includes(params.slug)) {
    notFound()
  }

  const tag = slugToTagMap[params.slug]

  return {
    title: `${siteConfig.metaData.title} – ${tag[0].toUpperCase() + tag.substring(1)}`,
  }
}

const TagPage = async ({ params }) => {
  const { slugToTagMap } = await createTagMaps()

  if (!Object.keys(slugToTagMap).includes(params.slug)) {
    notFound()
  }

  const posts = await client.queries.postConnection({
    last: -1,
    sort: 'date',
  })
  const authors = await client.queries.authorsConnection()

  return (
    <Tag
      authors={authors}
      posts={posts.data.postConnection.edges.filter(({ node }) =>
        node.tags.includes(slugToTagMap[params.slug]),
      )}
      tag={slugToTagMap[params.slug]}
      slugToTagMap={slugToTagMap}
    />
  )
}

export default TagPage
