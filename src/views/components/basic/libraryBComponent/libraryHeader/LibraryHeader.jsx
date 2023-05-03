import React, { useContext } from 'react';
import './libraryHeader.scss'
import Spinner from '../../../../UI/spinner/Spinner';
import { NavLink } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from "react-i18next";
import { TiArrowShuffle } from "react-icons/ti";

const LibraryHeader = () => {
  const { t } = useTranslation();
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return <Spinner />
  }

  return (
    <header className="library-header">
      <div className="library-header__profile">
        <img src={user?.picture} alt="your photo" />
        <div className="library-header__profile--info">
          <span className="library-header__profile--info__name">My name</span>
          <span className="library-header__profile--info__desc">Your favorite artists, albums and playlists all in one place</span>
          <button className="library-header__profile--info__btn">
            <TiArrowShuffle />
            <span>SHUFFLE MY MUSIC</span>
          </button>
        </div>
      </div>
      <nav className="library-header__navbar">
        <NavLink to={"/library"} className="library-header__navbar--options" end>
          <p className="library-header__navbar--options__label">Highlights</p>
          <hr className="library-header__navbar--options__decoration" />
        </NavLink>
        <NavLink to={"favorites"} className="library-header__navbar--options">
          <p className="library-header__navbar--options__label">Favorite tracks</p>
          <div className="library-header__navbar--options__decoration"></div>
        </NavLink>
        <NavLink to={"playlists"} className="library-header__navbar--options">
          <p className="library-header__navbar--options__label">My Playlists</p>
          <div className="library-header__navbar--options__decoration"></div>
        </NavLink>
        <NavLink to={"uploads"} className="library-header__navbar--options">
          <p className="library-header__navbar--options__label">Upload songs</p>
          <div className="library-header__navbar--options__decoration"></div>
        </NavLink>
      </nav>
    </header>
  );
};

export default LibraryHeader;
