import { useTranslation } from 'react-i18next';
import './mainBComponent.scss'
import Language from '../../../UI/language/Language';
import Theme from '../../../UI/theme/Theme';

const MainBComponent = () => {
  const { t } = useTranslation();

  return (
    <main className='page-main'>
      <div className='page-main__page-content'>
        <Theme />
        <Language />
      </div>
    </main>
  )
}

export default MainBComponent;