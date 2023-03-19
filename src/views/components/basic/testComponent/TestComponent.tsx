import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'
import Language from '../../../UI/language/Language';
import Theme from '../../../UI/theme/Theme';
import './testComponent.scss';

const TestComponent = () => {
  const { t } = useTranslation();
  const { user, loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) return <h1>Loading</h1>

  return (
    <div className='home-user-component'>
      <Theme />
      <Language />
      <h1>{t("title_user_home")} {user?.name}</h1>
      <Link to={'/music'}>Music</Link>
      <br />
      {isAuthenticated ? (
        <button type='button' className='nes-btn is-primary login-button' onClick={() => logout()}>
          Logout
        </button>
      ) : (
        <button type='button' className='nes-btn is-primary login-button' onClick={() => loginWithRedirect()}>
          Login
        </button>
      )}
    </div>
  )
}

export default TestComponent;