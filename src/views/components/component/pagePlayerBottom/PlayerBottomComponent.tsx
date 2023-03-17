import { useTranslation } from 'react-i18next';
import Language from '../../UI/language/Language';
import Theme from '../../UI/theme/Theme';

const PlayerBottomComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Theme />
      <Language />
    </div>
  )
}

export default PlayerBottomComponent;