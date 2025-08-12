// credits: https://themeforest.net/item/qurno-minimal-blog-nextjs-template/36625633

import Image from 'next/image'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import Link from 'next/link'

import type { TemplateAuthor, TemplatePosts } from '@/types/template'
import { BlogPostOverview } from '@/template/components/BlogPostOverview'
import siteConfig from '@/config/site.config.json'
import { getNumberOfPostsText } from '@/utils/getNumberOfPostsText'
import { PageHeader } from '@/template/components/PageHeader'
import {
  IconBrandLinkedin,
  IconBrandStackoverflow,
  IconBrandGithub,
  IconBrandFacebook,
  IconWorldWww,
} from '@tabler/icons-react'

interface Props {
  author: TemplateAuthor & {
    numberOfPosts: number
    facebook: string
    gitHub: string
    stackOverflow: string
    linkedIn: string
    web: string
  }
  posts: TemplatePosts
}

// TODO: Add pagination?
const Author = ({ author, posts }: Props) => {
  const hasAnySocial =
    author.facebook !== '' ||
    author.linkedIn !== '' ||
    author.web !== '' ||
    author.gitHub !== '' ||
    author.stackOverflow !== ''

  return (
    <>
      <section className="page-header section-sm pb-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="row g-4 g-lg-5 text-center text-lg-start justify-content-center justify-content-lg-start">
                <div className="col-lg-3 col-md-4 col-sm-5 col-6">
                  <Image
                    className="rounded img-fluid"
                    src={author.image}
                    alt={author.name}
                    width={`250`}
                    height={`250`}
                    placeholder="empty"
                  />
                </div>
                <div className="col-lg-9 col-md-12">
                  <p className="mb-2">
                    <span className="fw-bold text-black">
                      {author.numberOfPosts < 9 ? `0${author.numberOfPosts}` : author.numberOfPosts}
                    </span>{' '}
                    {getNumberOfPostsText(author.numberOfPosts)}
                  </p>
                  <h1 className="h3 text-dark mb-2">{author.name}</h1>
                  {hasAnySocial && (
                    <ul className="social-links icon-box mb-3">
                      {author.facebook !== '' && (
                        <Link href={author.facebook} target="_blank">
                          <li className="me-2">
                            <i>
                              <IconBrandFacebook size={18} />
                            </i>
                          </li>
                        </Link>
                      )}
                      {author.linkedIn !== '' && (
                        <Link href={author.linkedIn} target="_blank">
                          <li className="me-2">
                            <i>
                              <IconBrandLinkedin size={18} />
                            </i>
                          </li>
                        </Link>
                      )}
                      {author.gitHub !== '' && (
                        <Link href={author.gitHub} target="_blank">
                          <li className="me-2">
                            <i>
                              <IconBrandGithub size={18} />
                            </i>
                          </li>
                        </Link>
                      )}
                      {author.stackOverflow !== '' && (
                        <Link href={author.stackOverflow} target="_blank">
                          <li className="me-2">
                            <i>
                              <IconBrandStackoverflow size={18} />
                            </i>
                          </li>
                        </Link>
                      )}
                      {author.web !== '' && (
                        <Link href={author.web} target="_blank">
                          <li className="me-2">
                            <i>
                              <IconWorldWww size={18} />
                            </i>
                          </li>
                        </Link>
                      )}
                    </ul>
                  )}
                  <div className="content">
                    <TinaMarkdown content={author.content} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <PageHeader title="My articles" />
        <div className="row gy-5 gx-4 g-xl-5">
          {posts.map(
            (post) =>
              post.frontMatter.author === author.name && (
                <div
                  key={post.slug}
                  className={siteConfig.postColumns == 3 ? 'col-lg-4 col-md-6' : 'col-lg-6'}
                >
                  <BlogPostOverview post={post} authors={[author]} />
                </div>
              ),
          )}
        </div>
      </div>
    </>
  )
}

export { Author }
