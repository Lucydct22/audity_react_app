import './searchBComponentMobile.scss'
import { useTranslation } from 'react-i18next';
import GenresRenderComponent from '../../structureMainBComponent/musicPageComponent/genresComponent/genresRender/GenresRenderComponent';
import { CiSearch } from 'react-icons/ci';

function SearchBComponentMobile() {
  const { t } = useTranslation();

  return (
    
    <div className='mobile-search'>
      <div className='mobile-search__title'>
        <span>{t("search_placeholder") || ""}</span>
      </div>
      <div className='mobile-search__input'>
        <input type="text" className='mobile-search__input--btn' placeholder={t("search_placeholder") || ""}/>
        <span><CiSearch size={20} /></span>
      </div>
      <h1 className='mobile-search__genres'>{t("musicpage_genres")}</h1>
      <div className='mobile-search__genres--section'>
        <GenresRenderComponent />
        <GenresRenderComponent />
        <GenresRenderComponent />
        <GenresRenderComponent />
        <GenresRenderComponent />
        <GenresRenderComponent />
      </div>
    </div>
  )
}

export default SearchBComponentMobile;
