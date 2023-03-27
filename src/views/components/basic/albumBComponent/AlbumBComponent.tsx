import './albumBComponent.scss';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faUserCheck, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import Albumimg1 from '../../../../../assets/img/albums/8.jpg'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function AlbumBComponent() {
	const { t } = useTranslation();
	const [isPlaying, setIsPlaying] = useState(false);
	const [isFollowing, setIsFollowing] = useState(false);
	const [isLiked, setIsLiked] = useState(false);

	const handlePlayClick = () => {
		setIsPlaying((prevState) => !prevState);
	};

	const handleFollowClick = () => {
		setIsFollowing((prevState) => !prevState);
	};

	return (
		<>
			<div className="album-page">
				<div className="album-page__image">
					<img src={Albumimg1} alt="Image description" />
				</div>
				<section className="album-page__section">
					<div className="album-page__section--details">
						<div className="album-page__section--details__title">
							<h1>Album name</h1>
						</div>
						<div className="album-page__section--details__songs">
							<p>15 {t('page_pnumber')}</p>
						</div>
					</div>

					<div className="album-page__section--buttons">
						<div className="album-page__section--buttons__container">
							<div className="album-page__section--buttons__container--play">
								<button className="album-page__section--buttons__container--play__btn" onClick={handlePlayClick}>
									{isPlaying ? (
										<>
											<FontAwesomeIcon icon={faPause} /> <span>{t('pausebutton')}</span>
										</>
									) : (
										<>
											<FontAwesomeIcon icon={faPlay} /> <span>{t('playbutton')}</span>
										</>
									)}
								</button>
							</div>
							<div className="album-page__section--buttons__container--like">
								<button className="artist-page__section--buttons__container--like__btn" onClick={() => setIsLiked(!isLiked)}>
									{isLiked ? <AiFillHeart size='1.5rem' color='#ef5466' /> : <AiOutlineHeart />}
								</button>
							</div>
							<div className="album-page__section--buttons__container--follow">
								<button className="album-page__section--buttons__container--follow__btn" onClick={handleFollowClick}>
									{isFollowing ? (
										<>
											<FontAwesomeIcon icon={faUserCheck} />
										</>
									) : (
										<>
											<FontAwesomeIcon icon={faUserPlus} />
										</>
									)}
								</button>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
