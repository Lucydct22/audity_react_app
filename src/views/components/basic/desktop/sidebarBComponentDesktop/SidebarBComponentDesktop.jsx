import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ThemeContext } from "context/theme/ThemeContext";
import { useTranslation } from "react-i18next";
import LogoLightTheme from "assets/img/png/logoAudityBlackTransp.png";
import LogoDarkTheme from "assets/img/png/logoAudityWhiteTransp.png";
import { FiMusic } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { FaGuitar } from "react-icons/fa";
import { CgBrowser } from "react-icons/cg";
import { BsMusicPlayer } from "react-icons/bs";
import "./sidebarBComponentDesktop.scss";

const SidebarBComponentDesktop = () => {
  const { t } = useTranslation();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const { theme } = useContext(ThemeContext);

  return (
    <nav className="side-bar">
      <div className="side-bar-header">
        <div className="side-bar-header__logo">
          <Link to={"/"}>
            <img src={theme === 'light' ? LogoLightTheme : LogoDarkTheme} alt="logo" />
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

          {/* <NavLink to={"/radio"} className="side-bar-header__sections--options">
            <div className="side-bar-header__sections--options__decoration"></div>
            <RiRadioLine
              size={20}
              className="side-bar-header__sections--options__icon"
            />
            <p>{t("sidebar_radio")}</p>
          </NavLink> */}

          <Link to={"#"}
            className="side-bar-header__sections--options"
            onClick={() => setToggleDropdown(!toggleDropdown)}
          >
            <div className="side-bar-header__sections--options__decoration"></div>
            <CgBrowser
              size={20}
              className="side-bar-header__sections--options__icon"
            />
            <p>{t("sidebar_browser")}</p>
          </Link>

          {toggleDropdown ? (
            <div>
              <div>
                <NavLink to={"/artists"} className="side-bar-header__sections--options">
                  <div className="side-bar-header__sections--options__decoration"></div>
                  <FaGuitar
                    size={15}
                    className="side-bar-header__sections--options__icon--dropdown"
                  />
                  <p className="side-bar-header__sections--options__icon--dropdown">Artist</p>
                </NavLink>
                <NavLink to={"/albums"} className="side-bar-header__sections--options">
                  <div className="side-bar-header__sections--options__decoration"></div>
                  <MdOutlineLibraryMusic
                    size={15}
                    className="side-bar-header__sections--options__icon--dropdown"
                  />
                  <p className="side-bar-header__sections--options__icon--dropdown">Album</p>
                </NavLink>
              </div>

            </div>
          ) : null}

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
            <p>{t("sidebar_studio")}</p>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default SidebarBComponentDesktop;
