import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import './dailyListComponent.scss';
import AlbumImg1 from '../../../../assets/img/albums/1.jpg';
import AlbumImg2 from '../../../../assets/img/albums/2.jpg';
import AlbumImg3 from '../../../../assets/img/albums/3.jpg';

const DailyListComponent = () => {
  const { t } = useTranslation();

  return (
    <div className='daily-carousel'>
      <h2 className='daily-carousel__title'>{t("musicpage_dailytitle")}</h2>
      <div className='daily-carousel__container'>
        <RenderDaily />
        <RenderDaily />
        <RenderDaily />
        <RenderDaily />
      </div>
    </div>
  )

}

const RenderDaily = () => {

  return (
    <section>
      <div className='daily-carousel__container--thumbnail'>
        <img src={AlbumImg2} alt="IMG"/>
        <span className='daily-carousel__container--thumbnail__title'>Daily</span>
        <div className='daily-carousel__container--thumbnail__btn'>
          <button className='daily-carousel__container--thumbnail__btn--play' type='button'><FaPlay size='14px' color='#191919'/></button>
        </div>
      </div>
      <Link className='daily-carousel__container--description' to={'#'}>Daily LIST</Link>
    </section>
  )
}

export default DailyListComponent;