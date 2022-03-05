import { UserProvider } from '../components/utils/UserContext';
import { DataProvider } from '../components/utils/DataContext';
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
        <DataProvider>
          <Component {...pageProps} />
        </DataProvider>
      </UserProvider>
    </CookiesProvider>
  )
}

export default appWithTranslation(MyApp);
