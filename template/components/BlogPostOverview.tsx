// credits: https://themeforest.net/item/qurno-minimal-blog-nextjs-template/36625633

import Image from 'next/image'
import Link from 'next/link'
import { IconCalendarEvent, IconClock, IconColorSwatch } from '@tabler/icons-react'

import { formatDate } from '@/template/utils/formatDate'
import { readingTime } from '@/template/utils/readingTime'
import { getAuthorByName } from '@/utils/getAuthorByName'
import type { TemplateAuthors, TemplatePost } from '@/types/template'
import { richTextBodyToString } from '@/utils/richTextBodyToString'
import siteConfig from '@/config/site.config.json'
import { slugify } from '@/utils/slugify'
import { hashString } from '@/utils/hashString'
import { truncateString } from '@/template/utils/truncateString'

interface Props {
  authors: TemplateAuthors
  post: TemplatePost
}

const BlogPostOverview = ({
  post: {
    slug,
    content,
    frontMatter: { title, image, date, author, description, tags, category },
  },
  authors,
}: Props) => {
  return (
    <article
      className={`card post-card h-100 border-0 bg-transparent ${
        siteConfig.postColumns == 3 ? 'post-card-col-4' : ''
      }`}
    >
      <div className="card-body">
        <Link href={`/blog/${slug}`} className="d-block" title={title}>
          <div className="post-image position-relative">
            <Image
              className="rounded img-fluid"
              src={image}
              alt={title}
              width="650"
              height="335"
              placeholder="empty"
            />
          </div>
        </Link>

        <ul className="card-meta list-inline mb-3">
          <li className="list-inline-item mt-2">
            <i className="me-2">
              <IconCalendarEvent size={18} />
            </i>
            <span>{formatDate(date)}</span>
          </li>
          <li className="list-inline-item mt-2">—</li>
          <li className="list-inline-item mt-2">
            <i className="me-2">
              <IconClock size={18} />
            </i>
            <span>{readingTime(richTextBodyToString(content))}</span>
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

        <Link href={`/blog/${slug}`} className="d-block" title={title}>
          <h3 className={`post-title mb-3 ${siteConfig.postColumns == 3 ? 'h4' : ''}`}>{title}</h3>
        </Link>
        <p className={siteConfig.postColumns == 3 ? 'small' : ''}>
          {truncateString(description, siteConfig.postColumns == 3 ? 90 : 300)}
        </p>
      </div>
      <div className="card-footer border-top-0 bg-transparent p-0">
        <ul className="card-meta list-inline">
          <li className="list-inline-item mt-2">
            <Link
              href={`/author/${slugify(author)}`}
              className="card-meta-author"
              title={`Přečíst všechny články od ${author}`}
            >
              {authors.map(
                (authorData, i) =>
                  author === authorData.name && (
                    <span key={i}>
                      <Image src={authorData.image} alt={author} width="26" height="26" />
                    </span>
                  ),
              )}
              <i className="d-inline-block ms-2 ps-1 fst-normal">
                {getAuthorByName({
                  authorName: author,
                  authors,
                }).gender === 'male'
                  ? 'napsal'
                  : 'napsala'}{' '}
                <span>{author.split(' ')[0]}</span>
              </i>
            </Link>
          </li>
          <li className="list-inline-item mt-2 text-dark">•</li>
          {tags?.map((tag) => (
            <li
              key={slugify(tag)}
              className={`list-inline-item small card-meta-tag ${
                siteConfig.colorful && (hashString(tag) === 1 ? 'odd' : 'even')
              } mt-2`}
              style={{ lineHeight: 2 }}
            >
              <Link href={`/tags/${slugify(tag)}`}>{tag}</Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export { BlogPostOverview }
