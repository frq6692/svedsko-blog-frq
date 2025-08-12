// credits: https://themeforest.net/item/qurno-minimal-blog-nextjs-template/36625633

import type { TemplatePosts } from '@/types/template'
import { IconArchive } from '@tabler/icons-react'
import Link from 'next/link'
import { PageHeader } from '@/template/components/PageHeader'
import { Fragment } from 'react'
import siteConfig from '@/config/site.config.json'

interface Props {
  posts: TemplatePosts
}

// TODO: Add authors?
const Archive = ({ posts }) => {
  // formatDateByYear
  let formatDateByYear = (a) => {
    const longCsCZFormatter = new Intl.DateTimeFormat('cs-CZ', {
      year: 'numeric',
    })
    const date = new Date(a)
    return longCsCZFormatter.format(date)
  }

  // formatDateByMonth
  let formatDateByMonth = (a) => {
    const longCsCZFormatter = new Intl.DateTimeFormat('cs-CZ', {
      day: 'numeric',
      month: 'long',
    })
    const date = new Date(a)
    return longCsCZFormatter.format(date)
  }

  // sortByYear
  let postYear = posts.map((post) => formatDateByYear(post.frontMatter.date))
  const uniqueYear = [...new Set(postYear)]

  return (
    <section>
      <PageHeader title="Article archive" blogPage={false} />
      <div className="container">
        <div className="row">
          <div className="col-12">
            {uniqueYear.map((unqYear) => (
              <div
                className={`archive-block ${
                  siteConfig.colorful && (Number(unqYear) % 2 === 1 ? 'odd' : 'even')
                }`}
                key={unqYear.toString()}
              >
                <h2>
                  <>
                    <i>
                      <div>
                        <IconArchive size={80} />
                      </div>
                    </i>
                    {unqYear}
                  </>
                </h2>
                <div className="container g-0">
                  {posts.map((post) =>
                    formatDateByYear(post.frontMatter.date) === unqYear ? (
                      <Fragment key={post.slug}>
                        <div className="flex-row d-flex">
                          <div className="d-flex" style={{ flex: '0 0 110px' }}>
                            {formatDateByMonth(post.frontMatter.date)}
                          </div>
                          <div className="d-flex">
                            <div className="d-inline" style={{ marginRight: 20 }}>
                              •
                            </div>
                            <Link href={`/blog/${post.slug}`}>{post.frontMatter.title}</Link>
                          </div>
                        </div>
                      </Fragment>
                    ) : null,
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { Archive }
