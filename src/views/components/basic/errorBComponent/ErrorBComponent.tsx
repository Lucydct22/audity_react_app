import './errorBComponent.scss'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function ErrorBComponent() {
  const {t} = useTranslation();

  return (
    <div className='errorPage'>
    <div className='errorPage-container'>
      <div className='errorPage-container__context'>
        <span className='errorPage-container__context__span'>404</span>
        <h1 className='errorPage-container__context__h1'>{t('error_message_h1')}</h1>
        <p className='errorPage-container__context__p'>{t('error_message_p')}</p> 
        <Link to='/'><button className='errorPage-container__context__btm'>{t('error_message_btn')}</button></Link>
      </div>
    </div>
    </div>
  )
}

export default ErrorBComponent

