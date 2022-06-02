import { useRouter } from 'next/router'

import { useData } from '/components/utils/DataContext';

import SearchResults from '/components/searchResults';
import SubHero from '/components/subHero';

import { LayoutContainer } from '/components/layout';
import { useEffect, useState } from 'react';

export default function () {
  const [searchResults, setSearchResults] = useState();
  const router = useRouter()
  const { getSearchResults } = useData();
  const { search } = router.query

  useEffect(() => {
    getSearchResults(search).then((rep) => {
      setSearchResults(rep)
    })
  }, [search])

  return (
    <LayoutContainer pageClasse="searchPage">

      <SubHero pageTitle={`Search results for "${search}" (${searchResults?.length})`} />

      <div className="searchResults">
        {searchResults && <SearchResults results={searchResults} />}
      </div>

    </LayoutContainer>
  )
}