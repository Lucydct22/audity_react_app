import { useTranslation } from 'react-i18next';
import './sidebarBComponent.scss'
import LogoWhite from '../../../../assets/img/png/logoAudityBlackTransp.png'
import { FiMusic } from 'react-icons/fi'
import { AiOutlineHeart } from 'react-icons/ai'
import { RiRadioLine } from 'react-icons/ri'
import { CgBrowser } from 'react-icons/cg'
import { BsMusicPlayer } from 'react-icons/bs'
import { Link, NavLink } from 'react-router-dom';

const SidebarBComponent = () => {
  const { t } = useTranslation();

  return (

    <nav className='page-sidebar'>
      <div className='side-bar-header'>
        <div className='side-bar-header__logo'>
          <Link to={'/'}>
            <img src={LogoWhite} alt="logo" />
          </Link>
        </div>

        <div className='side-bar-header__sections'>
          <NavLink to={'/music'} className='side-bar-header__sections--options'>
            <FiMusic className='side-bar-header__sections--options__icon'/>
            <p>{t("sidebar_music")}</p>
          </NavLink>

          <NavLink to={'/radio'} className='side-bar-header__sections--options'>
            <RiRadioLine className='side-bar-header__sections--options__icon'/>
            <p>{t("sidebar_radio")}</p>
          </NavLink>

          <NavLink to={'/browse'} className='side-bar-header__sections--options'>
            <CgBrowser className='side-bar-header__sections--options__icon'/>
            <p>{t("sidebar_browser")}</p>
          </NavLink>

          <NavLink to={'/favorites'} className='side-bar-header__sections--options'>
            <AiOutlineHeart className='side-bar-header__sections--options__icon'/>
            <p>{t("sidebar_favorites")}</p>
          </NavLink>

          <NavLink to={'/your-studio'} className='side-bar-header__sections--options'>
            <BsMusicPlayer className='side-bar-header__sections--options__icon'/>
            <p>{t("sidebar_yourstudio")}</p>
          </NavLink>

          <NavLink to={'/test'} className='side-bar-header__sections--options'>
            <p>Test</p>
          </NavLink>
        </div>
      </div>
    </nav >
  )
}

export default SidebarBComponent;


{/* <p>{t("home_title_admin")}</p> */ }