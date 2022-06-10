import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '/components/utils/UserContext';

export default function () {
  const router = useRouter();
  const { addUserGooglePhotosToken } = useAuth();

  const code = router?.query?.code;

  useEffect(() => {
    code && addUserGooglePhotosToken(code).then((res) => res ? router.push('/settings') : null);
  }, [code])

  //console.log(router);
  return (
    <div>Oauth callBack code: {code}</div>
  ) 
}