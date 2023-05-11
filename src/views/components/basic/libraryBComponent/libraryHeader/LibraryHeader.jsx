import './libraryHeader.scss'
import { responsiveBreak } from "utils/componentsConstants";
import useWindowSizeReport from "hooks/useWindowSizeReport";
import { NavLink } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from "react-i18next";
import { TiArrowShuffle } from "react-icons/ti";
import PersonPlaceholder160 from 'assets/img/webp/profile-placeholder-160x160.webp'

const LibraryHeader = () => {
  const [screenWidth] = useWindowSizeReport()
  const { t } = useTranslation();
  const { user } = useAuth0();

  return (
    <header className="library-header">
      <section className="library-header__content">
        <div className="library-header__content--profile">
          {(screenWidth > responsiveBreak) ?
            <img src={user?.picture ? user.picture : PersonPlaceholder160} alt="your photo" />
            : null}
          <div className="library-header__content--profile__info">
            <span className="library-header__content--profile__info--name">
              {(screenWidth > responsiveBreak) ?
                user?.name ? user.name : "Hello user"
                : user?.name ? `Hello, ${user.name}` : "Hello user"}
            </span>
            <span className="library-header__content--profile__info--desc">{t('library_header_profile_desc')}</span>
            <button className="library-header__content--profile__info--btn">
              <TiArrowShuffle size="20" />
              <span>{t('library_header_profile_btn')}</span>
            </button>
          </div>
        </div>
        <nav className="library-header__content--navbar">
          <NavLink to={"/library"} className="library-header__content--navbar__options" end>
            <p className="library-header__content--navbar__options--label">{t('library_header_navbar_highlights')}</p>
            <hr className="library-header__content--navbar__options--decoration" />
          </NavLink>
          <NavLink to={"favorites"} className="library-header__content--navbar__options">
            <p className="library-header__content--navbar__options--label">{t('library_header_navbar_favorite')}</p>
            <div className="library-header__content--navbar__options--decoration"></div>
          </NavLink>
          <NavLink to={"playlists"} className="library-header__content--navbar__options">
            <p className="library-header__content--navbar__options--label">{t('library_header_navbar_playlist')}</p>
            <div className="library-header__content--navbar__options--decoration"></div>
          </NavLink>
          <NavLink to={"uploads"} className="library-header__content--navbar__options">
            <p className="library-header__content--navbar__options--label">{t('library_header_navbar_upload')}</p>
            <div className="library-header__content--navbar__options--decoration"></div>
          </NavLink>
        </nav>
      </section>
    </header>
  );
};

export default LibraryHeader;
