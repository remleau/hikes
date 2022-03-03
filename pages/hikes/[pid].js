import { useRouter } from 'next/router';
import { useAuth } from '/components/utils/UserContext';
import { useEffect, useState } from 'react';

import { Layout } from '/components/layout';

export default function () {
  const [hike, setHike] = useState(null);
  const router = useRouter()
  const { pid } = router.query
  const { getHikeById } = useAuth();

  useEffect(async () => {
    setHike(await getHikeById(pid));
  }, [])

  console.log(hike)

  return (
    <Layout pageClasse="settingsPage" api="">

      {hike?.name}

    </Layout>
  )
}