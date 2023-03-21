import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './genresComponent.scss';
import GradientImg1 from '../../../../assets/img/gradients/1.jpg'

const GenresComponent = () => {
  const { t } = useTranslation();

  return (
    <div className='genres-carousel'>
      <h2 className='genres-carousel__title'>{t("musicpage_dailytitle")}</h2>
      <div className='genres-carousel__container'>
        <RenderGenres />
        <RenderGenres />
        <RenderGenres />
        <RenderGenres />
      </div>
    </div>
  )
}

const RenderGenres = () => {

  return (
    <section>
      <div className='genres-carousel__container--thumbnail'>
        <img src={GradientImg1} alt="IMG"/>
      </div>
      <Link className='genres-carousel__container--description' to={'#'}>POP</Link>
    </section>
  )
}

export default GenresComponent;