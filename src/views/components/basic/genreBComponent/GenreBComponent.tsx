import { useTranslation } from 'react-i18next';
import './genreBComponent.scss';
import { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import ArtistsSlider from '../musicPageComponent/artistsSlider/ArtistsSlider';
import AlbumsSlider from '../musicPageComponent/albumsSlider/AlbumsSlider';
import DailyListsSlider from '../musicPageComponent/dailyListsSlider/DailyListsSlider';


const GenreBComponent = ({ genre }: any) => {

  const { t } = useTranslation();

  return (
    <div className="genre-page">
      <h2 className='genre-page__title'>{t("genrespage_title")} {genre?.name}</h2>
      <div className='genre-page__sections'>
        <ArtistsSlider />
        <AlbumsSlider />
        <DailyListsSlider />
      </div>
    </div>
  )
}

export default GenreBComponent







