import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import './renderAlbum.scss';

export default function RenderAlbum({ album }: any) {
	const { t } = useTranslation();
	const { _id, name, imageUrl } = album;
  const fans = Math.floor(Math.random() * (980000 - 1340 + 1)) + 1340;
  let totalFans = fans.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");

	return (
		<Link to={`/albums/${_id}`} className='render-album'>
			<div className='render-album__thumbnail'>
				<img src={imageUrl} alt="IMG" />
				<div className='render-album__thumbnail--btn'>
					<div className='render-album__thumbnail--btn__play'>
						<FaPlay size='14px' color='#191919' />
					</div>
					<div className='render-album__thumbnail--btn__like'>
						<AiOutlineHeart size='14px' color='#191919' />
					</div>
				</div>
			</div>
			<p className='render-album__description'>{name}</p>
			<p className='render-album__details'>
				30 {t("musicpage_albumtracks")} - {totalFans} fans
			</p>
		</Link>
	)
}
