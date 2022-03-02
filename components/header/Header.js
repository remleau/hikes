import { useState } from 'react';
import LanguageSwitcher from "../utils/LanguageSwitcher";
import { useAuth } from '/components/utils/UserContext';
import { useRouter } from 'next/router';

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
              <li><a href="/settings">Settings</a></li>
              <li><a onClick={() => logout()}>Logout</a></li>
              <li><LanguageSwitcher /></li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="menu-principal">
        <div className="container">
          <div className="logo">
            <a href="/" className="">
              <h1><img src="/images/logo.svg" /></h1>
            </a>
          </div>
          <nav>
            <ul>
              <li><a onClick={() => openSearch()}>Explore</a></li>
              <li><a href="/#home">Mountains</a></li>
              <li><a href="/hikes" className="btn">Hikes</a></li>
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
              <a href="" className="btn">Search</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}