import { useState, useEffect, useRef, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import UserContext from 'context/user/UserContext';
import Theme from '../../../../UI/theme/Theme';
import Language from 'views/UI/language/Language';
import { GoTriangleUp } from 'react-icons/go';
import { FiChevronRight } from 'react-icons/fi';
import PersonPlaceholder32 from 'assets/img/webp/profile-placeholder-32x32.webp'
import './topBarBComponentMobile.scss';

const TopBarBComponentMobile = () => {
  const { t } = useTranslation();
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const { dbUser } = useContext(UserContext)
  const navigate = useNavigate()

  const [popperOpen, setPopperOpen] = useState(false);
  let popperRef: any = useRef();

  useEffect(() => {
    let handler = (e: any) => {
      if (!popperRef.current.contains(e.target)) {
        setPopperOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    }
  }, [popperRef.current]);

  return (
    <header className='page-topbar-mobile'>
      <div className='page-topbar-mobile-action' ref={popperRef}>
        <button className='page-topbar-mobile-action__profile' onClick={() => setPopperOpen(!popperOpen)}>
          <img src={user?.picture ? user.picture : PersonPlaceholder32} alt="avatar" />
        </button>
        <div className={`page-topbar-mobile-action__popper ${popperOpen ? 'popperActive' : 'popperInactive'}`}>
          <div className='page-topbar-mobile-action__popper--wrapper'>
            <div className='page-topbar-mobile-action__popper--wrapper__icon'>
              <GoTriangleUp />
            </div>

            {isAuthenticated ? (
              <Link to="/settings"><div className='page-topbar-mobile-action__popper--wrapper__content cursor-pointer'>
                <span>Account Settings</span>
                <FiChevronRight size='1.4rem' />
              </div>
              </Link>)
              : (
                <div className='page-topbar-mobile-action__popper--wrapper__content cursor-pointer' onClick={() => loginWithRedirect()}>
                  <span>Account Settings</span>
                  <FiChevronRight size='1.4rem' />
                </div>
              )
            }

            <div className='page-topbar-mobile-action__popper--wrapper__content'>
              <span className='cursor-default'>System theme</span>
              <Theme />
            </div>

            <div className='page-topbar-mobile-action__popper--wrapper__content'>
              <span className='cursor-default'>Language</span>
              <Language />
            </div>

            {isAuthenticated ? (
              <span className='page-topbar-mobile-action__popper--wrapper__content cursor-pointer' onClick={() => logout()}>
                Log out
              </span>
            ) : (
              <span className='page-topbar-mobile-action__popper--wrapper__content cursor-pointer' onClick={() => loginWithRedirect()}>
                Login
              </span>
            )}

            {dbUser.role === 'admin' && (
              <span className='page-topbar-mobile-action__popper--wrapper__content cursor-pointer' onClick={() => navigate('/admin/home')}>
                Admin
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopBarBComponentMobile;