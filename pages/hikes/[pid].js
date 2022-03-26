import { useRouter } from 'next/router';
import { useData } from '/components/utils/DataContext';
import { useEffect, useState } from 'react';

import HeroSingle from '/components/heroSingle';
import { Layout } from '/components/layout';

export default function () {
  const [isLoading, setIsLoading] = useState(true);
  const [hike, setHike] = useState(null);
  const router = useRouter();
  const { pid } = router.query
  const { getHikeById } = useData();

  useEffect(() => {
    getHikeById(pid).then((hike) => {
      setHike(hike)
      setIsLoading(false);
    });
  }, [])

  return (
    <Layout pageClasse="singlePage" isLoading={isLoading}>

      <HeroSingle hike={hike} animated={isLoading} />

    </Layout>
  )
}