import SubHero from '/components/subHero';
import { LayoutContainer } from '/components/layout';

export default function () {

  return (
    <LayoutContainer pageClasse="settingsPage" api="">

      <SubHero pageTitle="Hikes" />      

      <div className="something">
        hikes
      </div>

    </LayoutContainer>
  ) 
}