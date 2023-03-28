import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import './renderAlbum.scss';

export default function RenderAlbum ({ album }: any) {
	const { t } = useTranslation();
	const { imageUrl, name } = album;

	return (
		<Link to={`/albums/${album.id}`}>
			<section className='render-album'>
				<div className='render-album__thumbnail'>
					<img src={imageUrl} alt="IMG" />
					<div className='render-album__thumbnail--btn'>
						<button className='render-album__thumbnail--btn__play' type='button'>
							<FaPlay size='14px' color='#191919' />
						</button>
						<button className='render-album__thumbnail--btn__like' type='button'>
							<AiOutlineHeart size='14px' color='#191919' />
						</button>
					</div>
				</div>
				<p className='render-album__description'>{name}</p>
				<p className='render-album__details'>
					30 {t("musicpage_albumtracks")} - 4,165 fans
				</p>
			</section>
		</Link>
	)
}
