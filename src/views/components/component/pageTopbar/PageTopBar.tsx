import { useTranslation } from 'react-i18next';
import './PageTopBar.scss'
import { BsSearch } from 'react-icons/bs'

const PageTopBar = () => {
  const { t } = useTranslation();

  return (
    <header>
      
      <div className='topbar-search'>
        <BsSearch color='#52525d' />
        <input type="text" className='search-topbar' placeholder={t("search_placeholder") || ""}/>
      </div>
      
      <button className='topbar-profile'>
        <img src='https://e-cdns-images.dzcdn.net/images/user//32x32-000000-80-0-0.jpg' alt="avatar" />
      </button>
    </header>
  )
}

export default PageTopBar;