import SubHero from '/components/subHero';
import { LayoutContainer } from '/components/layout';

import { useData } from '/components/utils/DataContext';
import { useEffect, useState } from 'react';

import ListMountains from '/components/listMountains';

export default function () {
  const [hikes, setHikes] = useState(null);
  const { getHikes } = useData();

  useEffect(async () => {
    setHikes(await getHikes());
  }, [])

  return (
    <LayoutContainer pageClasse="settingsPage" api="">

      <SubHero pageTitle="Hikes." />      

      <ListMountains hikes={hikes} />

    </LayoutContainer>
  ) 
}