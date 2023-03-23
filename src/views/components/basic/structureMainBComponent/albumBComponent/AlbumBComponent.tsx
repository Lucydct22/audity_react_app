import React from 'react';
import './albumBComponent.scss';
import { useTranslation } from 'react-i18next';
import Language from '../../../../UI/language/Language';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPause, faPlay, faThumbsUp, faUserCheck, faUserPlus } from '@fortawesome/free-solid-svg-icons';

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

	const handleLikeClick = () => {
		setIsLiked((prevState) => !prevState);
	}

	return (
		<>
			<div className="album-page">
				<div className="album-page__image">
					<img src="src/resources/artist.png" alt="Image description" />
				</div>
				<section className="album-page__section">
					<div className="album-page__section--details">
						<div className="album-page__section--details__title">
							<h1>Album name</h1>
						</div>
						<div className="album-page__section--details__songs">
							<p>15 songs</p>
						</div>
					</div>

					<div className="album-page__section--buttons">
						<div className="album-page__section--buttons__container">
							<div className="album-page__section--buttons__container--play">
								<button className="album-page__section--buttons__container--play__btn" onClick={handlePlayClick}>
									{isPlaying ? (
										<>
											<FontAwesomeIcon icon={faPause} /> {t('album_pausebutton')}
										</>
									) : (
										<>
											<FontAwesomeIcon icon={faPlay} /> {t('album_playbutton')}
										</>
									)}
								</button>
							</div>
							<div className="album-page__section--buttons__container--like">
								<button className="album-page__section--buttons__container--like__btn" onClick={handleLikeClick}>
									{isLiked ? (
										<>
											<FontAwesomeIcon icon={faHeart} /> {t('album_likedbutton')}
										</>
									) : (
										<>
											<FontAwesomeIcon icon={faThumbsUp} /> {t('album_likebutton')}
										</>
									)}
								</button>
							</div>
							<div className="album-page__section--buttons__container--follow">
								<button className="album-page__section--buttons__container--follow__btn" onClick={handleFollowClick}>
									{isFollowing ? (
										<>
											<FontAwesomeIcon icon={faUserCheck} /> {t('album_followingbutton')}
										</>
									) : (
										<>
											<FontAwesomeIcon icon={faUserPlus} /> {t('album_followbutton')}
										</>
									)}
								</button>
							</div>
						</div>
					</div>
				</section>
			</div>
			<Language />
		</>
	);
}
