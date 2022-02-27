import { UserProvider } from '../components/utils/UserContext';
import { CookiesProvider } from "react-cookie"

/* Reset */
import '../styles/globals.css';

/* All the site */
import '../styles/main.scss';

/* language */
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </CookiesProvider>
  )
}

export default appWithTranslation(MyApp);
