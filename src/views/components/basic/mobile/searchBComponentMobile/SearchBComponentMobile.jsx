import { useState, useEffect, Suspense } from "react";
import { Navigate } from 'react-router-dom'
import './searchBComponentMobile.scss'
import { useTranslation } from 'react-i18next';
import RenderGenres from '../../renders/genresRender/RenderGenres';
import { CiSearch } from 'react-icons/ci';
import { responsiveBreak } from "utils/componentsConstants";
import useWindowSizeReport from "hooks/useWindowSizeReport";
import { getGenresApi } from 'api/music/genres';
import { useAuth0 } from '@auth0/auth0-react';
import { searchContentApi } from 'api/music/music.api';
import SearchResultBComponent from "../searchResultMobileBComponent/SearchResultMobileBComponent";

export default function SearchBComponentMobile() {
  const [screenWidth] = useWindowSizeReport()
  const [genres, setGenres] = useState(undefined);
  const { user } = useAuth0();
  const [searchInput, setSearchInput] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    let isMounted = true;
    const getGenres = async () => {
      getGenresApi().then(async res => {
        isMounted && res && setGenres(res.genres);
      })
    }
    getGenres()
    return () => { isMounted = false }
  }, [user])

  const handleSearch = (e) => {
    setSearchInput(e.target.value)
  }

  useEffect(() => {
    let isMounted = true
    const searchFetch = async () => {
      const result = await searchContentApi(searchInput)
      result && isMounted && setContent(result.content)
    }
    searchFetch()
    // console.log(content)
    return () => { isMounted = false }
  }, [searchInput])

  return (
    <Suspense fallback={<></>}>
      {(screenWidth > responsiveBreak) ? (
        <Navigate to={"/"} />
      ) : (
        <MobileSearchPage genres={genres} handleSearch={handleSearch} content={content} />
      )}
    </Suspense>
  )
}

function MobileSearchPage({ genres, handleSearch, content }) {
  const { t } = useTranslation();

  const hasSearchResults = !!content

  return (
    <div className='mobile-search'>
      <div className='mobile-search__title'>
        <span>{t("search_placeholder") || ""}</span>
      </div>
      <div className='mobile-search__input'>
        <input
          type="text"
          className='mobile-search__input--btn'
          placeholder={t("search_placeholder_mobile") || ""}
          onChange={(e) => handleSearch(e)}
        />
        <span><CiSearch size={25} /></span>
      </div>
      {hasSearchResults ? (
        <SearchResultBComponent content={content} />
      ) : (
        <>
          <h1>{t("musicpage_genres")}</h1>
          <div className='mobile-search__grid'>
            {genres?.map(genre => {
              return (
                <RenderGenres genre={genre} key={genre._id} />
              )
            })}
          </div>
        </>
      )
      }
    </div>
  )
}