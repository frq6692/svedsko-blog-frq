// credits: https://themeforest.net/item/qurno-minimal-blog-nextjs-template/36625633

import type { TemplateAuthors, TemplatePost } from '@/types/template'
import siteConfig from '@/config/site.config.json'
import { BlogPostOverview } from '@/template/components/BlogPostOverview'
import { Pagination } from '@/template/components/Pagination'
import { PageHeader } from '@/template/components/PageHeader'

interface Props {
  posts: TemplatePost[]
  authors: TemplateAuthors
  currentPage: number
  numberOfPages: number
}

const Blog = ({ posts, authors, currentPage, numberOfPages }: Props) => {
  return (
    <section>
      <PageHeader title="All articles" blogPage />
      <div className="container">
        <div className="row gy-5 gx-4 g-xl-5">
          {posts.map((post) => (
            <div
              key={post.slug}
              className={siteConfig.postColumns == 3 ? 'col-lg-4 col-md-6' : 'col-lg-6'}
            >
              <BlogPostOverview post={post} authors={authors} />
            </div>
          ))}
        </div>
      </div>
      <Pagination currentPage={currentPage} numberOfPages={numberOfPages} />
    </section>
  )
}

export { Blog }
