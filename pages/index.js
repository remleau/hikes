import HeroHome from '/components/heroHome';
import { Layout } from '/components/layout';
import CardStats from '/components/cardStats';
import ListMountains from '/components/listMountains';

import { useState, useEffect } from 'react';
import { useAuth } from '/components/utils/UserContext';

export default function Home() {
  const [hikes, setHikes] = useState(null);
  const { getHikes } = useAuth();

  useEffect(async () => {
    setHikes(await getHikes());
  }, [])

  return (
    <Layout api="">
      <HeroHome />
      <CardStats />
      <ListMountains hikes={hikes} id="home" />
    </Layout>
  )
}