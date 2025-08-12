// credits: https://themeforest.net/item/qurno-minimal-blog-nextjs-template/36625633

import { BannerBlock } from '@/template/components/Banner'
import siteConfig from '@/config/site.config.json'
import { BlogPostOverview } from '@/template/components/BlogPostOverview'
import Link from 'next/link'
import { IconNewSection } from '@tabler/icons-react'
import type { TemplateAuthors, TemplatePosts } from '@/types/template'

interface Props {
  posts: TemplatePosts
  authors: TemplateAuthors
}

const Home = ({ posts, authors }: Props) => {
  return (
    <>
      <BannerBlock text={siteConfig.metaData.description} />
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h2 className="section-title">
              <span>Nejnovější články</span>
            </h2>
          </div>
        </div>
        <div className="row gy-5 gx-4 g-xl-5">
          {posts.map((post) => (
            <div
              key={post.slug}
              className={siteConfig.postColumns == 3 ? 'col-lg-4 col-md-6' : 'col-lg-6'}
            >
              <BlogPostOverview post={post} authors={authors} />
            </div>
          ))}

          <div className="col-12 text-center">
            <Link href={`/blog`} className="btn btn-primary mt-5" aria-label="View all posts">
              <i className="me-2">
                <IconNewSection size={16} />
              </i>
              View all articles
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export { Home }
