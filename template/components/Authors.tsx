// credits: https://themeforest.net/item/qurno-minimal-blog-nextjs-template/36625633

import type { TemplateAuthor } from '@/types/template'
import Link from 'next/link'
import Image from 'next/image'
import { PageHeader } from '@/template/components/PageHeader'
import { getNumberOfPostsText } from '@/utils/getNumberOfPostsText'

interface Props {
  authors: Array<TemplateAuthor & { numberOfPosts: number; slug: string }>
}

const Authors = ({ authors }: Props) => {
  return (
    <section>
      <PageHeader title="This blog is written by" blogPage={false} />

      <div className="row gx-4 gy-5 gx-md-5 justify-content-center text-center">
        {authors.map((author, index) => (
          <div key={author.name} className="col-lg-4 col-sm-6" style={{ maxWidth: 300 }}>
            <Link href={`/autori/${author.slug}`} className="d-inline-block is-hoverable">
              <div style={{ width: 250, background: `url('/${index % 2 === 1 ? 'blue' : 'yellow'}.svg') no-repeat center` }}>
                <Image
                  className="rounded img-fluid"
                  src={author.image}
                  alt={author.name}
                  width="150"
                  height="150"
                  placeholder="empty"
                />
              </div>
              <h4 className="text-dark mt-4 mb-1">{author.name}</h4>
              <p className="mb-0">
                <span className="fw-bold text-black">
                  {author.numberOfPosts < 9 ? `0${author.numberOfPosts}` : author.numberOfPosts}
                </span>{' '}
                {getNumberOfPostsText(author.numberOfPosts)}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export { Authors }
