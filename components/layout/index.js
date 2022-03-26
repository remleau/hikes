import Head from 'next/head';
import React, { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { useRouter } from 'next/router';

import { SpinnerRoundOutlined } from 'spinners-react';
import Header from '../header/Header';
import Footer from '../footer/Footer';

export function Layout({ children, meta, pageClasse, isLoading = false }) {
  const loadingRef = useRef();
  const router = useRouter();

  // useEffect(() => {
  //   gsap.fromTo(loadingRef.current, { opacity: 1, zIndex: 100 }, { opacity: 0, duration: 0.8, zIndex: -100, ease: 'power2.easeOut', delay: 0.6 });

  //   return () => {
  //     gsap.fromTo(loadingRef.current, { opacity: 0, zIndex: 100 }, { opacity: 1, duration: 0.8, zIndex: -100, ease: 'power2.easeOut', delay: 0.6 });
  //   } 
  // }, [isLoading, router.asPath])

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
  const heroRef = useRef();
  const mainRef = useRef();

  const displayChild = (childName) => {
    const selectedChild = children.map((child, i) => {
      return child?.type?.name === childName && child
    });

    children = children.filter(child => child?.type?.name !== childName);

    return selectedChild
  }

  useEffect(() => {
    gsap.fromTo(heroRef.current, { yPercent: '-20', opacity: 0 }, { yPercent: '0', opacity: 1, duration: 0.25, ease: 'power2.easeOut', delay: 0.25 });
    gsap.fromTo(mainRef.current, { opacity: 0, xPercent: '-1' }, { opacity: 1, xPercent: '0', duration: 0.25, ease: 'power4.easeOut', delay: 0.4 });
  }, [])

  return (
    <Layout meta={meta} api={api}>
      <div className={`page admin ${pageClasse}`}>
        <div className="container">

          <div ref={heroRef}>
            {displayChild('SubHero')}
          </div>

          <div className="inner-page" ref={mainRef}>
            {children}
          </div>
        </div>
      </div>
    </Layout>
  )
}