import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './topBarBComponent.scss';
import Language from '../../../UI/language/Language';
import Theme from '../../../UI/theme/Theme';
import { CiSearch } from 'react-icons/ci';
import { GoTriangleUp } from 'react-icons/go';
import { FiChevronRight } from 'react-icons/fi';


const TopBarBComponent = () => {
  const { t } = useTranslation();
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [popperIsActive, setPopperIsActive] = useState(false);

  return (
    <header className='page-topbar'>
      <div className='page-topbar-search'>
        <CiSearch color='#a2a2ad' size={'1.6rem'}/>
        <input type="text" className='page-topbar-search__input' placeholder={t("search_placeholder") || ""} />
      </div>

      <div className='page-topbar-action'>
        <button className='page-topbar-action__profile' onClick={() => setPopperIsActive(!popperIsActive)}>
          <img src={user?.picture ? user.picture : 'https://e-cdns-images.dzcdn.net/images/user//32x32-000000-80-0-0.jpg'} alt="avatar" />
        </button>
        {popperIsActive ?
          <div className='page-topbar-action__popper'>
            <div className='page-topbar-action__popper--wrapper'>
              <div className='page-topbar-action__popper--wrapper__icon'>
                <GoTriangleUp />
              </div>
              <Link to="/settings"><div className='page-topbar-action__popper--wrapper__content cursor-pointer'>
                <span>Account Settings</span>
                <FiChevronRight size='1.4rem' />
              </div></Link>
              <div className='page-topbar-action__popper--wrapper__content'>
                <span className='cursor-default'>System theme</span>
                <Theme />
              </div>
              <div className='page-topbar-action__popper--wrapper__content cursor-pointer'>
                {isAuthenticated ? (
                  <span onClick={() => logout()}>
                    Log out
                  </span>
                ) : (
                  <span onClick={() => loginWithRedirect()}>
                    Login
                  </span>
                )}
              </div>
            </div>
          </div>
          : null
        }
      </div>
    </header>
  )
}

export default TopBarBComponent;