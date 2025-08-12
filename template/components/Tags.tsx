// credits: https://themeforest.net/item/qurno-minimal-blog-nextjs-template/36625633

import Link from 'next/link'
import { IconTags } from '@tabler/icons-react'

import type { TagMaps } from '@/app/tagSlugs'
import { PageHeader } from '@/template/components/PageHeader'
import { hashString } from '@/utils/hashString'
import siteConfig from '@/config/site.config.json'
import { getTotalPostsText } from '@/utils/getTotalPostsText'
import { slugify } from '@/utils/slugify'

interface Props {
  tagsWithPostsCountMap: TagMaps['tagsWithPostsCountMap']
}

const Tags = ({ tagsWithPostsCountMap }: Props) => {
  return (
    <section>
      <PageHeader title="All tags" />

      <div className="container">
        <div className="row g-4 justify-content-center text-center">
          {Object.entries(tagsWithPostsCountMap)
            .sort(([tag1], [tag2]) => tag1.localeCompare(tag2))
            .map(([tag, postsCount]) => (
              <div key={slugify(tag)} className="col-lg-4 col-md-6">
                <Link
                  href={`/tags/${slugify(tag)}`}
                  className={`p-4 rounded d-block is-hoverable tag-block ${
                    siteConfig.colorful && (hashString(tag) === 1 ? 'odd' : 'even')
                  }`}
                >
                  <i className="mt-1 mb-2 d-inline-block">
                    <IconTags size={30} />
                  </i>
                  <span className="h4 mt-2 mb-3 d-block">{tag}</span>
                  {getTotalPostsText(postsCount)}
                </Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export { Tags }
