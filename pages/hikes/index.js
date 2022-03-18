import SubHero from '/components/subHero';
import { LayoutContainer } from '/components/layout';
import Link from 'next/link'

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

      <SubHero pageTitle="Hikes.">
        <Link href="/hikes/create">
          <a className="btn"><span>Add hike.</span></a>
        </Link>
      </SubHero>      

      <ListMountains hikes={hikes} setHikes={setHikes} />

    </LayoutContainer>
  ) 
}