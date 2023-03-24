import './genresRenderComponent.scss'
import GradientImg4 from '../../../../../../../assets/img/gradients/4.jpg'

function GenresRenderComponent() {
  return (
    
    <section className='genres-carousel__container--section'>
      <div className='genres-carousel__container--section__thumbnail'>
        <img src={GradientImg4} alt="IMG" />
        <p className='genres-carousel__container--section__thumbnail--description' to={'#'}>Soul</p>
      </div>
    </section>
  )
}

export default GenresRenderComponent
