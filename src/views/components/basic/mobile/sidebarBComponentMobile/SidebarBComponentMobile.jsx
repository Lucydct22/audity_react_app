import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";
import UserContext from "context/user/UserContext";
import "./sidebarBComponentMobile.scss";
import { FiMusic, FiSearch } from "react-icons/fi";
import { VscLibrary } from "react-icons/vsc";
import { SlCompass } from "react-icons/sl";
// import { BsMusicPlayer } from "react-icons/bs";

const SidebarBComponentMobile = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth0()
  const { dbUser } = useContext(UserContext)
  const [isGuest, setIsGuest] = useState(true)

  useEffect(() => {
    setIsGuest(false)
    if (!isAuthenticated) {
      setIsGuest(true)
    }
  }, [dbUser]);

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
            to={isGuest ? "/offers" : "/library"}
            className="side-bar-mobile-header__sections--options"
          >
            <div className="side-bar-mobile-header__sections--options__decoration"></div>
            <VscLibrary
              size={20}
              className="side-bar-mobile-header__sections--options__icon"
            />
            <p>{t("sidebar_library")}</p>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default SidebarBComponentMobile;
