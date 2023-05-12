import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { MdPause, MdPlayArrow } from "react-icons/md";
import { SlUserFollowing, SlUserUnfollow } from "react-icons/sl";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import './artistBComponent.scss';


export default function ArtistBComponent({ artist }) {
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
			<div className="artist-page">
				<div className="artist-page__image">
					<img src={artist?.imageUrl} alt="Image description" />
				</div>
				<section className="artist-page__section">
					<div className="artist-page__section--details">
						<div className="artist-page__section--details__title">
							<h1>{artist?.name}</h1>
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
											<MdPause size={20} />
											<span>{t('pausebutton')}</span>
										</>
									) : (
										<>
											<MdPlayArrow size={20} />
											<span>{t('playbutton')}</span>
										</>
									)}
								</button>
							</div>
							<div className="artist-page__section--buttons__container--like">
								<button className="artist-page__section--buttons__container--like__btn" onClick={() => setIsLiked(!isLiked)}>
									{isLiked ? <AiFillHeart size='1.5rem' color='#ef5466' /> : <AiOutlineHeart />}
								</button>
							</div>
							<div className="artist-page__section--buttons__container--follow">
								<button className="artist-page__section--buttons__container--follow__btn" onClick={handleFollowClick}>
									{isFollowing ? (
										<>
											<SlUserUnfollow />
										</>
									) : (
										<>
											<SlUserFollowing />
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
