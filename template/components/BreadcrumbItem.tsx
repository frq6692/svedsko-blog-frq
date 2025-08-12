// credits: https://themeforest.net/item/qurno-minimal-blog-nextjs-template/36625633

import Link from 'next/link'
import { type ReactNode } from 'react'
import { usePathname } from 'next/navigation'

interface Props {
  children: ReactNode | ReactNode[]
  href: string
}

const BreadcrumbItem = ({ children, href }: Props) => {
  const pathname = usePathname()

  return (
    <li className="d-inline ms-3">
      {pathname.includes('/page') ? children : <Link href={href}>{children}</Link>}
    </li>
  )
}

export { BreadcrumbItem }
