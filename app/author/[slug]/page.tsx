import { cache } from 'react'

import { client } from '@/tina/__generated__/client'
import { notFound } from 'next/navigation'
import { Author } from '@/components/Author'
import {Metadata} from "next";
import {createTagMaps} from "@/app/tagSlugs";
import siteConfig from "@/config/site.config.json";

const getCachedAuthor = cache(
  async (slug) =>
    await client.queries.authors({
      relativePath: slug + '.md',
    }),
)

const getCachedSlugs = cache(async () => {
  const { data } = await client.queries.authorsConnection()

  return data.authorsConnection.edges.map((edge) => {
    return edge.node._sys.filename
  })
})

export const generateStaticParams = async () => {
  const slugs = await getCachedSlugs()

  return slugs.map((slug) => {
    return { params: { slug } }
  })
}

export const generateMetadata = async ({ params }): Promise<Metadata> => {
  const slugs = await getCachedSlugs()

  if (!slugs.includes(params.slug)) {
    notFound()
  }

  const author = await getCachedAuthor(params.slug)

  return {
    title: `${siteConfig.metaData.title} – ${author.data.authors.name}`,
  }
}

const AuthorPage = async ({ params }) => {
  const slugs = await getCachedSlugs()

  if (!slugs.includes(params.slug)) {
    notFound()
  }

  const author = await getCachedAuthor(params.slug)
  const posts = await client.queries.postConnection({
    last: -1,
    sort: 'date',
  })

  return <Author author={author} posts={posts} />
}

export default AuthorPage
