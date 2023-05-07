import { useTranslation } from 'react-i18next';
import Language from 'views/UI/language';
import Theme from 'views/UI/theme/Theme';

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