// credits: https://themeforest.net/item/qurno-minimal-blog-nextjs-template/36625633

import Image from 'next/image'
import Link from 'next/link'
import { TinaMarkdown } from 'tinacms/dist/rich-text'

import { formatDate } from '@/template/utils/formatDate'
import { readingTime } from '@/template/utils/readingTime'
import { truncateString } from '@/template/utils/truncateString'
import siteConfig from '@/config/site.config.json'
import {
  IconArrowUpRight,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandReddit,
  IconBrandTwitter,
  IconCalendarEvent,
  IconClock,
  IconColorSwatch,
} from '@tabler/icons-react'
import type { TemplateAuthors, TemplatePost } from '@/types/template'
import { richTextBodyToString } from '@/utils/richTextBodyToString'
import { getAuthorByName } from '@/utils/getAuthorByName'
import { slugify } from '@/utils/slugify'
import { hashString } from '@/utils/hashString'

interface Props {
  post: TemplatePost
  authors: TemplateAuthors
}

const BlogPost = ({
  post: {
    slug,
    content,
    frontMatter: { title, date, author, tags, category },
  },
  authors,
}: Props) => {
  let pageUrl = `${siteConfig.baseURL.replace(/\/$|$/, '/')}blog/${slug}`
  return (
    <section className="section-sm pb-0">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="mb-5">
              <h3 className="h1 mb-4 post-title">{title}</h3>

              <ul className="card-meta list-inline mb-2">
                <li className="list-inline-item mt-2">
                  <Link href={`/author/${slugify(author)}`} className="card-meta-author">
                    {authors.map((authorData, i) =>
                      author === authorData.name ? (
                        <span key={i}>
                          <Image src={authorData.image} alt={author} width="26" height="26" />
                        </span>
                      ) : (
                        ''
                      ),
                    )}
                    <i className="d-inline-block ms-2 ps-1 fst-normal">
                      {getAuthorByName({
                        authorName: author,
                        authors,
                      }).gender === 'male'
                        ? 'napsal'
                        : 'napsala'}{' '}
                      <span>{author}</span>
                    </i>
                  </Link>
                </li>
                <li className="list-inline-item mt-2">—</li>
                <li className="list-inline-item mt-2">
                  <i className="me-2">
                    <IconClock size={18} />
                  </i>
                  <span>přečtete za {readingTime(richTextBodyToString(content))}</span>
                </li>
                <li className="list-inline-item mt-2">—</li>
                <li className="list-inline-item mt-2">
                  <i className="me-2">
                    <IconCalendarEvent size={18} />
                  </i>
                  <span>{formatDate(date)}</span>
                </li>
                <li className="list-inline-item mt-2">—</li>
                <li className="list-inline-item mt-2">
                  <Link href={`/categories/${slugify(category)}`} className="card-meta-category">
                    <i className="me-2">
                      <IconColorSwatch size={18} />
                    </i>
                    <span>{category}</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-12"></div>
          <div className="col-lg-2 post-share-block order-1 order-lg-0 mt-5 mt-lg-0">
            <div className="position-sticky" style={{ top: 150 + 'px' }}>
              <span className="d-inline-block mb-3 small">SDÍLET</span>
              <ul className="social-share icon-box">
                <Link
                  href={`https://www.facebook.com/sharer.php?u=${pageUrl}&quote=${title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <li className="d-inline-block d-lg-block me-2 mb-2">
                    <i>
                      <IconBrandFacebook size={18} />
                    </i>
                  </li>
                </Link>
                <Link
                  href={`https://twitter.com/intent/tweet?text=${title}&url=${pageUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <li className="d-inline-block d-lg-block me-2 mb-2">
                    <i>
                      <IconBrandTwitter size={18} />
                    </i>
                  </li>
                </Link>
                <Link
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <li className="d-inline-block d-lg-block me-2 mb-2">
                    <i>
                      <IconBrandLinkedin size={18} />
                    </i>
                  </li>
                </Link>
                <Link
                  href={`https://www.reddit.com/submit?url=${pageUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <li className="d-inline-block d-lg-block me-2 mb-2">
                    <i>
                      <IconBrandReddit size={18} />
                    </i>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
          <div className="col-lg-8 post-content-block order-0 order-lg-2">
            <div className="content">
              <TinaMarkdown
                content={content}
                components={{
                  // @ts-ignore bug in Tina
                  sup: ({ text }) => <sup>{text}</sup>,
                }}
              />
            </div>
            <ul className="post-meta-tag list-unstyled list-inline mt-3">
              {tags?.map((tag) => (
                <li
                  key={slugify(tag)}
                  className={`list-inline-item mt-2 ${
                    siteConfig.colorful && (hashString(tag) === 1 ? 'odd' : 'even')
                  }`}
                >
                  <Link href={`/tags/${slugify(tag)}`}>{tag}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="single-post-author">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="d-block d-md-flex">
                <Link href={`/autori/${slugify(author)}`}>
                  {authors.map((authorData, i) =>
                    author === authorData.name ? (
                      <span key={i}>
                        <Image
                          src={authorData.image}
                          alt={author}
                          width="155"
                          height="155"
                          className="rounded mr-4 img-fluid"
                          placeholder="empty"
                        />
                      </span>
                    ) : (
                      ''
                    ),
                  )}
                </Link>
                <div className="ms-0 ms-md-4 ps-0 ps-md-3 mt-4 mt-md-0">
                  <h3 className="h4 mb-3">
                    <Link href={`/author/${slugify(author)}`} className="text-dark">
                      {author}
                    </Link>
                  </h3>
                  {authors.map((authorData, i) =>
                    author === authorData.name ? (
                      <div key={i}>{truncateString(authorData.summary, 150)}</div>
                    ) : (
                      ''
                    ),
                  )}
                  <div className="content">
                    <Link href={`/author/${slugify(author)}`} className="text-dark">
                      {getAuthorByName({
                        authorName: author,
                        authors,
                      }).gender === 'male'
                        ? 'All articles by this author'
                        : 'All articles by this author'}
                      <i>{<IconArrowUpRight size={20} />}</i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { BlogPost }
