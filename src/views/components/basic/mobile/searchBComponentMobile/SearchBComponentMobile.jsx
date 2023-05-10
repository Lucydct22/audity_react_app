import './searchBComponentMobile.scss'
import { useTranslation } from 'react-i18next';
import GenresRenderComponent from 'views/components/basic/musicPageComponent/genresSlider/genresRender/RenderGenres';
import { CiSearch } from 'react-icons/ci';
import { getGenresApi } from 'api/music/genres';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from "react";

export default function SearchBComponentMobile() {
  
  const { t } = useTranslation();
  const [genres, setGenres] = useState(undefined);
  const { user } = useAuth0();

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


  return (
    <div className='mobile-search'>
      <div className='mobile-search__title'>
        <span>{t("search_placeholder") || ""}</span>
      </div>
      <div className='mobile-search__input'>
        <input type="text" className='mobile-search__input--btn' placeholder={t("search_placeholder_mobile") || ""} />
        <span><CiSearch size={25} /></span>
      </div>
      <h1 className='mobile-search__genres'>{t("musicpage_genres")}</h1>
      <div  className='mobile-search__genres--section'>
      {genres?.map(genre => {
      return(
        <GenresRenderComponent genre={genre} key={genre._id}/>
      )
      })}  
      </div>
    </div>
  )
}
