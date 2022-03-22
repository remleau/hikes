import { useRouter } from 'next/router';
import { useData } from '/components/utils/DataContext';
import { useEffect, useState } from 'react';

import HeroSingle from '/components/heroSingle';
import { Layout } from '/components/layout';

export default function () {
  const [hike, setHike] = useState(null);
  const router = useRouter()
  const { pid } = router.query
  const { getHikeById } = useData();

  useEffect(async () => {
    setHike(await getHikeById(pid));
  }, [])

  return (
    <Layout pageClasse="singlePage">

      <HeroSingle hike={hike} />

    </Layout>
  )
}