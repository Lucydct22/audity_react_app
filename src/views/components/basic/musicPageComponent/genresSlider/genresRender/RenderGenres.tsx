import { Link } from 'react-router-dom';
import './renderGenres.scss'

export default function RenderGenres({ genre }: any) {
  const { _id, name, thumbnail } = genre;

  return (
    <Link to={`/genres/${_id}`} className='render-genre'>
      <div className='render-genre__thumbnail'>
        <img src={thumbnail} alt={name} />
        <p className='render-genre__thumbnail--description'>{name}</p>
      </div>
    </Link>
  )
}
