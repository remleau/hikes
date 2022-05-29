import { useState } from 'react';
import LanguageSwitcher from "../utils/LanguageSwitcher";
import { useAuth } from '/components/utils/UserContext';
import { useRouter } from 'next/router';

import Link from 'next/link'

export default function Header() {
  const router = useRouter();
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const { logOut } = useAuth();

  const openSearch = () => {
    setOpenSearchBar((prevState) => !prevState);
  }

  const logout = async () => {
    try {
      await logOut();
      router.push('/connexion')
    } catch (error) {
    }
  }

  return (
    <header>
      <div className="menu-secondaire">
        <div className="container">
          <nav>
            <ul>
              <li><Link href="/settings"><a>Settings</a></Link></li>
              <li><a onClick={() => logout()}>Logout</a></li>
              <li><LanguageSwitcher /></li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="menu-principal">
        <div className="container">
          <div className="logo">
            <Link href="/">
              <a className="">
                <h1><img src="/images/logo.svg" /></h1>
              </a>
            </Link>
          </div>
          <nav>
            <ul>
              <li><a onClick={() => openSearch()} className={`${openSearchBar ? 'active' : ''}`}>Explore</a></li>
              <li>
                <Link href="/">
                  <a>Mountains</a>
                </Link>
              </li>
              <li>
                <Link href="/hikes">
                  <a className="btn">My Hikes.</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className={`search ${openSearchBar ? 'open' : 'close'}`}>
        <div className="container">
          <div className="search-bar">
            <div className="search-bar-categories">
              <p>Mountains</p>
              <p>Members</p>
            </div>
            <div className="search-bar-input">
              <input placeholder="Search content ..." type="text" />
              <a className="btn">Search.</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}