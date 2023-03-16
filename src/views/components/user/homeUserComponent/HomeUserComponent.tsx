import { useTranslation } from 'react-i18next';
import Language from '../../UI/language/Language';
import Theme from '../../UI/theme/Theme';
import './homeUserComponent.scss';

const HomeUserComponent = () => {
  const { t } = useTranslation();

  return (
    <div className='home-user-component'>
      <Theme />
      <Language />
      <h1>{t("title_user_home")}</h1>
      <button></button>
    </div>
  )
}

export default HomeUserComponent;