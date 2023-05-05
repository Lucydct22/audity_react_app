import './libraryHeader.scss'
import Spinner from '../../../../UI/spinner/Spinner';
import { NavLink } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from "react-i18next";
import { TiArrowShuffle } from "react-icons/ti";
import PersonPlaceholder160 from 'assets/img/webp/profile-placeholder-160x160.webp'

const LibraryHeader = () => {
  const { t } = useTranslation();
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return <Spinner />
  }

  return (
    <header className="library-header">
      <div className="library-header__profile">
        <img src={user?.picture ? user.picture : PersonPlaceholder160} alt="your photo" />
        <div className="library-header__profile--info">
          <span className="library-header__profile--info__name">My name</span>
          <span className="library-header__profile--info__desc">{t('library_header_profile_desc')}</span>
          <button className="library-header__profile--info__btn">
            <TiArrowShuffle size="20" />
            <span>{t('library_header_profile_btn')}</span>
          </button>
        </div>
      </div>
      <nav className="library-header__navbar">
        <NavLink to={"/library"} className="library-header__navbar--options" end>
          <p className="library-header__navbar--options__label">{t('library_header_navbar_highlights')}</p>
          <hr className="library-header__navbar--options__decoration" />
        </NavLink>
        <NavLink to={"favorites"} className="library-header__navbar--options">
          <p className="library-header__navbar--options__label">{t('library_header_navbar_favorite')}</p>
          <div className="library-header__navbar--options__decoration"></div>
        </NavLink>
        <NavLink to={"playlists"} className="library-header__navbar--options">
          <p className="library-header__navbar--options__label">{t('library_header_navbar_playlist')}</p>
          <div className="library-header__navbar--options__decoration"></div>
        </NavLink>
        <NavLink to={"uploads"} className="library-header__navbar--options">
          <p className="library-header__navbar--options__label">{t('library_header_navbar_upload')}</p>
          <div className="library-header__navbar--options__decoration"></div>
        </NavLink>
      </nav>
    </header>
  );
};

export default LibraryHeader;
