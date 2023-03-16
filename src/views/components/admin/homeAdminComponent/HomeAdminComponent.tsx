import { useTranslation } from 'react-i18next';
import Language from '../../UI/language/Language';
import Theme from '../../UI/theme/Theme';

const HomeAdminComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Theme />
      <Language />
      {t("home_title_admin")}
    </div>
  )
}

export default HomeAdminComponent;