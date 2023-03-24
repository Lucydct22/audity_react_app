import { useTranslation } from 'react-i18next';
import './pageContent.scss'
import Language from '../../UI/language/Language';
import Theme from '../../UI/theme/Theme';

const PageContentComponent = () => {
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

export default PageContentComponent;