import { useRouter } from 'next/router'

import SubHero from '/components/subHero';
import { Layout } from '/components/layout';

export default function () {
  const router = useRouter()
  const { pid } = router.query

  return (
    <Layout pageClasse="settingsPage" api="">

      <div className="something">
        hike {pid}
      </div>

    </Layout>
  )
}