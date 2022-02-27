import Head from 'next/head';
import React, { useEffect } from 'react';

import Header from '../header/Header';
import Footer from '../footer/Footer';

export function Layout({ children, meta, api }) {

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

      <Header />

      <main>
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