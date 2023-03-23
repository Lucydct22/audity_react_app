import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./sidebarBComponent.scss";
import LogoWhite from "../../../../assets/img/png/logoAudityBlackTransp.png";
import { FiMusic } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { FaGuitar } from "react-icons/fa";
import { RiRadioLine } from "react-icons/ri";
import { CgBrowser } from "react-icons/cg";
import { BsMusicPlayer } from "react-icons/bs";

const SidebarBComponent = () => {
  const { t } = useTranslation();

  const [toggleDropdown, setToggleDropdown] = useState(false);
  let dropdownRef = useRef();

  const location = useLocation();

  const handleToggleDropdown = () => {
    if (!location.pathname == '/album' || !location.pathname == '/artist') {
      setToggleDropdown(!toggleDropdown);
    } else {
      setToggleDropdown(true);
    }
  }

  useEffect(() => {
    let handler = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setToggleDropdown(false);
        console.log(dropdownRef.current);
      }
    };

    if (location.pathname == '/album' || location.pathname == '/artist') {
      setToggleDropdown(true);
    } else {
      document.addEventListener("mousedown", handler);

      return () => {
        document.removeEventListener("mousedown", handler);
      }
    }

    console.log(location.pathname);

  });

  return (
    <nav className="side-bar">
      <div className="side-bar-header" ref={dropdownRef}>
        <div className="side-bar-header__logo">
          <Link to={"/"}>
            <img src={LogoWhite} alt="logo" />
          </Link>
        </div>
        <div className="side-bar-header__sections">
          <NavLink to={"/"} className="side-bar-header__sections--options">
            <div className="side-bar-header__sections--options__decoration"></div>
            <FiMusic
              size={20}
              className="side-bar-header__sections--options__icon"
            />
            <p>{t("sidebar_music")}</p>
          </NavLink>

          <NavLink to={"/radio"} className="side-bar-header__sections--options">
            <div className="side-bar-header__sections--options__decoration"></div>
            <RiRadioLine
              size={20}
              className="side-bar-header__sections--options__icon"
            />
            <p>{t("sidebar_radio")}</p>
          </NavLink>

          <Link to="#"
            className={`side-bar-header__sections--options ${toggleDropdown ? "cursor-default" : null}`}
            onClick={handleToggleDropdown}
          >
            <div className="side-bar-header__sections--options__decoration"></div>
            <CgBrowser
              size={20}
              className="side-bar-header__sections--options__icon"
            />
            <p>{t("sidebar_browser")}</p>
          </Link>

          <div className={`side-bar-header__sections--dropdown ${toggleDropdown ? 'dropdownActive' : 'dropdownInactive'}`}>
            <NavLink to={"/artist"} className="side-bar-header__sections--dropdown__link">
              <div className="side-bar-header__sections--dropdown__link--decoration"></div>
              <FaGuitar
                size={15}
                className="side-bar-header__sections--dropdown__link--icon"
              />
              <p className="side-bar-header__sections--dropdown__link--icon">Artist</p>
            </NavLink>
            <NavLink to={"/album"} className="side-bar-header__sections--dropdown__link">
              <div className="side-bar-header__sections--dropdown__link--decoration"></div>
              <MdOutlineLibraryMusic
                size={15}
                className="side-bar-header__sections--dropdown__link--icon"
              />
              <p className="side-bar-header__sections--dropdown__link--icon">Album</p>
            </NavLink>

          </div>
          <NavLink
            to={"/favorites"}
            className="side-bar-header__sections--options"
          >
            <div className="side-bar-header__sections--options__decoration"></div>
            <AiOutlineHeart
              size={20}
              className="side-bar-header__sections--options__icon"
            />
            <p>{t("sidebar_favorites")}</p>
          </NavLink>

          <NavLink
            to={"/studio"}
            className="side-bar-header__sections--options"
          >
            <div className="side-bar-header__sections--options__decoration"></div>
            <BsMusicPlayer
              size={20}
              className="side-bar-header__sections--options__icon"
            />
            <p>{t("sidebar_yourstudio")}</p>
          </NavLink>

          <NavLink to={"/test"} className="side-bar-header__sections--options">
            <p>Test</p>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default SidebarBComponent;
