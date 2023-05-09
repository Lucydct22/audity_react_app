import { Link } from 'react-router-dom';
import './renderGenres.scss'

export default function RenderGenres({ genre }: any) {
  const { _id, name, imageUrl } = genre;

  return (
    <Link to={`/genres/${_id}`} className='render-genre'>
      <div className='render-genre__thumbnail'>
        <img src={imageUrl} alt={name} />
        <p className='render-genre__thumbnail--description'>{genre?.name}</p>
      </div>
    </Link>
  )
}
