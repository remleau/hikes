import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '/components/utils/UserContext';

export default function ({ token }) {
  const router = useRouter();
  const { addUserGooglePhotosToken } = useAuth();

  useEffect(() => {
    token && addUserGooglePhotosToken(token).then((res) => res ? router.push('/settings') : null);
  }, [token])

  return (
    <div>Oauth</div>
  ) 
}

export async function getServerSideProps(context) {
  const { google } = require('googleapis');
  const Photos = require('googlephotos');

  const oauth2Client = new google.auth.OAuth2(
    '371191343534-lvrsa9ha4dts1h31havrt155gne7aqhn.apps.googleusercontent.com',
    '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',
    'http://localhost:3000/settings/Oauth'
  );

  const scopes = [Photos.Scopes.READ_ONLY, Photos.Scopes.APPEND_ONLY, Photos.Scopes.READ_DEV_DATA, Photos.Scopes.READ_AND_APPEND, Photos.Scopes.SHARING];
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });

  if(context.query.code) {
    const { tokens } = await oauth2Client.getToken(context.query.code);

    return {
      props: {
        token: tokens.access_token
      }
    }
  }

  if(!context.query.code) {
    return {
      redirect: {
        permanent: false,
        destination: url
      }
    };
  }
}