import Link from 'next/link'
import { useRouter } from 'next/router';

export default function LanguageSwitcher() {
  const router = useRouter();

  return (
    <div className="language-switcher">
      {router.locale === 'en' ? 
        <Link href={router.route} locale='fr'>
          <a>FR</a>
        </Link> : ''
      }

      {router.locale === 'fr' ?
        <Link href={router.route} locale='en'>
          <a>EN</a>
        </Link> : ''
      }
    </div>
  )
}