import Head from 'next/head';
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { gsap } from "gsap";

import { ScrollTo } from '/components/utils/utils';

import { SpinnerRoundOutlined } from 'spinners-react';
import Header from '../header/Header';
import Footer from '../footer/Footer';

export function Layout({ children, meta, pageClasse, isLoading = false }) {
  const router = useRouter();
  const loadingRef = useRef();

  useEffect(() => {
    ScrollTo(router.asPath);
  }, [])

  useEffect(() => {
    isLoading && gsap.fromTo(loadingRef.current, { opacity: 1, zIndex: 100 }, { opacity: 0, duration: 0.8, zIndex: -100, ease: 'power2.easeOut', delay: 0.4 });
  }, [isLoading])

  let { title, description, image } = Object.assign({
    title: 'Mountains',
    description: '',
    image: ''
  }, meta);

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:image" content={image} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div ref={loadingRef} className={`loadingScreen`}>
        <SpinnerRoundOutlined color="#4FCBA6" />
        <div className="text">Waiting for the payload</div>
      </div>

      <Header />

      <main className={`${pageClasse}`}>
        {children}
      </main>

      <Footer />
    </React.Fragment>
  )
}


export function LayoutContainer({ children, meta, api, pageClasse }) {

  const displayChild = (childName) => {
    const selectedChild = children.map((child, i) => {
      return child?.type?.name === childName && child
    });

    children = children.filter(child => child?.type?.name !== childName);

    return selectedChild
  }

  return (
    <Layout meta={meta} api={api}>
      <div className={`page admin ${pageClasse}`}>
        <div className="container">
          {displayChild('SubHero')}

          <div className="inner-page">
            {children}
          </div>
        </div>
      </div>
    </Layout>
  )
}