import { client } from '@/tina/__generated__/client'
import { Archive } from '@/components/Archive'
import {Metadata} from "next";
import siteConfig from "@/config/site.config.json";

export const metadata: Metadata = {
  title: `${siteConfig.metaData.title} – Archiv`,
}

const ArchivePage = async () => {
  const posts = await client.queries.postConnection({
    last: -1,
    sort: 'date',
  })

  return <Archive posts={posts} />
}

export default ArchivePage
