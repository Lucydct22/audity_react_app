import { Link } from 'react-router-dom';
import './renderAlbum.scss';
import AlbumImg1 from '../../../../../../../assets/img/albums/1.jpg';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';


export const RenderAlbum = ({ album }) => {
	const { t } = useTranslation();

	const { imageUrl, name } = album;

	return (
		<section className='render-album'>
			<div className='render-album__thumbnail'>
				<img src={imageUrl} alt="IMG" />
				<div className='render-album__thumbnail--btn'>
					<button className='render-album__thumbnail--btn__play' type='button'><FaPlay size='14px' color='#191919' /></button>
					<button className='render-album__thumbnail--btn__like' type='button'><AiOutlineHeart size='14px' color='#191919' /></button>
				</div>
			</div>
			<Link className='render-album__description' to={'#'}>{name}</Link>
			<Link className='render-album__details' to={'#'}>30 {t("musicpage_albumtracks")} - 4,165 fans</Link>
		</section>
	)
}
