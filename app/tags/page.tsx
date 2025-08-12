import type { Metadata } from 'next'

import { createTagMaps } from '@/app/tagSlugs'
import { Tags } from '@/components/Tags'
import siteConfig from '@/config/site.config.json'

export const metadata: Metadata = {
  title: `${siteConfig.metaData.title} – Tagy`,
}

const TagsPage = async () => {
  const { tagsWithPostsCountMap } = await createTagMaps()

  return <Tags tagsWithPostsCountMap={tagsWithPostsCountMap} />
}

export default TagsPage
