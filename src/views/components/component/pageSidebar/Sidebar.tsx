import { useTranslation } from 'react-i18next';
import './SideBar.scss'
import LogoWhite from '../../../../assets/img/png/logoAudityBlackTransp.png'
import { FiMusic } from 'react-icons/fi'

const SidebarComponent = () => {
  const { t } = useTranslation();

  return (

    <div className='side-bar-header'>
      <div className='side-bar-header__logo'>
        <img src={LogoWhite} alt="logo" />
      </div>

      <div className='side-bar-header__sections'>
        <div className='side-bar-header__sections--music'>
          <FiMusic />
          <p>Music</p>
        </div>

        <div>

          <p>Radio</p>
        </div>

        <div>

          <p>Browse</p>
        </div>

        <div>

          <p>Favorites</p>
        </div>

        <div>

          <p>Your Studio</p>
        </div>

      </div>
    </div>
  )
}

export default SidebarComponent;


{/* <p>{t("home_title_admin")}</p> */ }