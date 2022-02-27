import { useRouter } from 'next/router'

import SubHero from '/components/subHero';
import { LayoutContainer } from '/components/layout';

export default function () {
  const router = useRouter();

  return (
    <LayoutContainer pageClasse="settingsPage" api="">

      <SubHero pageTitle="Add a hike" />

      <div className="something">
        404
      </div>

    </LayoutContainer>
  )
}