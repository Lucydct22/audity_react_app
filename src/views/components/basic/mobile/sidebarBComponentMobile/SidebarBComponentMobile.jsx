import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./sidebarBComponentMobile.scss";
import { FiMusic, FiSearch } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { CgBrowser } from "react-icons/cg";
import { BsMusicPlayer } from "react-icons/bs";

const SidebarBComponentMobile = () => {
  const { t } = useTranslation();

  return (
    <nav className="side-bar">
      <div className="side-bar-header">
        <div className="side-bar-header__sections">
          <NavLink to={"/"} className="side-bar-header__sections--options">
            <FiMusic
              size={20}
              className="side-bar-header__sections--options__icon"
            />
            <p>{t("sidebar_music")}</p>
          </NavLink>

          <NavLink
            to={"/browser"}
            className="side-bar-header__sections--options"
          >
            <CgBrowser
              size={20}
              className="side-bar-header__sections--options__icon"
            />
            <p>{t("sidebar_browser")}</p>
          </NavLink>

          <NavLink
            to={"/search"}
            className="side-bar-header__sections--options"
          >
            <FiSearch
              size={20}
              className="side-bar-header__sections--options__icon"
            />
            <p>{t("sidebar_search")}</p>
          </NavLink>
          
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
            <BsMusicPlayer
              size={20}
              className="side-bar-header__sections--options__icon"
            />
            <p>{t("sidebar_studio")}</p>
          </NavLink>

          {/* <NavLink to={"/radio"} className="side-bar-header__sections--options">
            <div className="side-bar-header__sections--options__decoration"></div>
            <RiRadioLine
              size={20}
              className="side-bar-header__sections--options__icon"
            />
            <p>{t("sidebar_radio")}</p>
          </NavLink> */}

          
        </div>
      </div>
    </nav>
  );
};

export default SidebarBComponentMobile;
