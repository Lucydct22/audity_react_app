import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./sidebarBComponentMobile.scss";
import { FiMusic, FiSearch } from "react-icons/fi";
import { VscLibrary } from "react-icons/vsc";
import { SlCompass } from "react-icons/sl";
// import { BsMusicPlayer } from "react-icons/bs";

const SidebarBComponentMobile = () => {
  const { t } = useTranslation();

  return (
    <nav className="side-bar-mobile">
      <div className="side-bar-mobile-header">
        <div className="side-bar-mobile-header__sections">
          <NavLink to={"/"} className="side-bar-mobile-header__sections--options">
            <FiMusic
              size={20}
              className="side-bar-mobile-header__sections--options__icon"
            />
            <p>{t("sidebar_music")}</p>
          </NavLink>

          <NavLink
            to={"/explore"}
            className="side-bar-mobile-header__sections--options"
          >
            <SlCompass
              size={20}
              className="side-bar-mobile-header__sections--options__icon"
            />
            <p>{t("sidebar_explore")}</p>
          </NavLink>

          <NavLink
            to={"/search"}
            className="side-bar-mobile-header__sections--options"
          >
            <FiSearch
              size={20}
              className="side-bar-mobile-header__sections--options__icon"
            />
            <p>{t("sidebar_search")}</p>
          </NavLink>
          
          <NavLink
            to={"/library"}
            className="side-bar-mobile-header__sections--options"
          >
            <div className="side-bar-mobile-header__sections--options__decoration"></div>
            <VscLibrary
              size={20}
              className="side-bar-mobile-header__sections--options__icon"
            />
            <p>{t("sidebar_library")}</p>
          </NavLink>

          {/* <NavLink
            to={"/studio"}
            className="side-bar-mobile-header__sections--options"
          >
            <BsMusicPlayer
              size={20}
              className="side-bar-mobile-header__sections--options__icon"
            />
            <p>{t("sidebar_studio")}</p>
          </NavLink> */}

          {/* <NavLink to={"/radio"} className="side-bar-mobile-header__sections--options">
            <div className="side-bar-mobile-header__sections--options__decoration"></div>
            <RiRadioLine
              size={20}
              className="side-bar-mobile-header__sections--options__icon"
            />
            <p>{t("sidebar_radio")}</p>
          </NavLink> */}
        </div>
      </div>
    </nav>
  );
};

export default SidebarBComponentMobile;
