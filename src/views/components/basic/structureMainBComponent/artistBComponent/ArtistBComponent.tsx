import './artistBComponent.scss';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPause, faPlay, faThumbsUp, faUserCheck, faUserPlus } from '@fortawesome/free-solid-svg-icons';

export default function ArtistBComponent() {
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

	const handleLikeClick = () => {
		setIsLiked((prevState) => !prevState);
	}

	return (
		<>
			<div className="artist-page">
				<div className="artist-page__image">
					<img src="src/resources/artist.png" alt="Image description" />
				</div>
				<section className="artist-page__section">
					<div className="artist-page__section--details">
						<div className="artist-page__section--details__title">
							<h1>ARTIST</h1>
						</div>
						<div className="artist-page__section--details__songs">
							<p>500.655 Fans</p>
						</div>
					</div>

					<div className="artist-page__section--buttons">
						<div className="artist-page__section--buttons__container">
							<div className="artist-page__section--buttons__container--play">
								<button className="artist-page__section--buttons__container--play__btn" onClick={handlePlayClick}>
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
							<div className="artist-page__section--buttons__container--like">
								<button className="artist-page__section--buttons__container--like__btn" onClick={handleLikeClick}>
									{isLiked ? (
										<>
											<FontAwesomeIcon icon={faHeart} />
										</>
									) : (
										<>
											<FontAwesomeIcon icon={faThumbsUp} />
										</>
									)}
								</button>
							</div>
							<div className="artist-page__section--buttons__container--follow">
								<button className="artist-page__section--buttons__container--follow__btn" onClick={handleFollowClick}>
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
