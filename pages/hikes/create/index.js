import SubHero from '/components/subHero';
import { LayoutContainer } from '/components/layout';

export default function () {

  return (
    <LayoutContainer pageClasse="settingsPage" api="">

      <SubHero pageTitle="Add a quick hike." />

      <div className="something">
        create hike
      </div>

    </LayoutContainer>
  )
}