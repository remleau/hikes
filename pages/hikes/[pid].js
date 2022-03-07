import { useRouter } from 'next/router';
import { useData } from '/components/utils/DataContext';
import { useEffect, useState } from 'react';

import { Layout } from '/components/layout';

export default function () {
  const [hike, setHike] = useState(null);
  const router = useRouter()
  const { pid } = router.query
  const { getHikeById } = useData();

  useEffect(async () => {
    setHike(await getHikeById(pid));
  }, [])

  console.log(hike)

  return (
    <Layout pageClasse="settingsPage" api="">

      {hike?.name}
      {hike?.files?.map((file, i) => {
        return (
          <img src={file} key={i} />
        )
      })}

    </Layout>
  )
}