import { useRouter } from 'next/router'

import SubHero from '/components/subHero';
import { LayoutContainer } from '/components/layout';

export default function () {
  const router = useRouter()
  const { pid } = router.query

  return (
    <LayoutContainer pageClasse="settingsPage" api="">

      <SubHero pageTitle="Update." />

      <div className="something">
        update hike {pid}
      </div>

    </LayoutContainer>
  )
}