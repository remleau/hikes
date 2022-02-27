import { useContext } from 'react';
import { UserContext } from '/components/utils/UserContext';

import HeroHome from '/components/heroHome';
import { Layout } from '/components/layout';
import CardStats from '/components/cardStats';
import ListMountains from '/components/listMountains';

export default function Home() {
  const { data } = useContext(UserContext);

  let meta = {
    title: '',
    description: ''
  }

  return (
    <Layout meta={meta} api="">
      <HeroHome />
      <CardStats />
      <ListMountains />
    </Layout>
  )
}