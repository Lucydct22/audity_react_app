import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth0 } from '@auth0/auth0-react'
import Language from '../../../../UI/language/Language';
import './TestComponent.scss';
import Spinner from '../../../../UI/spinner/Spinner';

const TestComponent = () => {
  const { t } = useTranslation();
  const { user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) return <Spinner />

  return (
    <div className='home-user-component'>
      <Language />
      {isAuthenticated && <h1>{t("title_user_home")} {user?.name}</h1>}
      <Link to={'./music'} className='home-user-component__anchor'>Go to Music page</Link>
    </div>
  )
}

export default TestComponent;