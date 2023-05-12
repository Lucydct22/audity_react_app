import './searchBComponentMobile.scss'
import { useTranslation } from 'react-i18next';
import GenresRenderComponent from 'views/components/basic/renders/genresRender/RenderGenres';
import { CiSearch } from 'react-icons/ci';
import { getGenresApi } from 'api/music/genres';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from "react";
import { searchContentApi } from 'api/music/music.api';

export default function SearchBComponentMobile() {
  const { t } = useTranslation();
  const [genres, setGenres] = useState(undefined);
  const { user } = useAuth0();
  const [searchInput, setSearchInput] = useState('')
  const [content, setContent] = useState('')
  console.log(content);

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
    return () => { isMounted = false }
  }, [searchInput])

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
      <h1 className='mobile-search__genres'>{t("musicpage_genres")}</h1>
      <div className='mobile-search__genres--section'>
        {genres?.map(genre => {
          return (
            <GenresRenderComponent genre={genre} key={genre._id} />
          )
        })}
      </div>
    </div>
  )
}
