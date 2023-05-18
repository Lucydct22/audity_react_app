import { useTranslation } from 'react-i18next';
import { getArtistApi } from 'api/music/artists';
import './modalAntdPlaylistCreate.scss'
import { FC, forwardRef, useContext, useEffect, useState } from 'react';
import MyLibraryContext from 'context/myLibrary/MyLibraryContext';

interface ModalAntdAddArtistsToLibraryProps {
	//artistSelectionRef: number[];
	// setArtistSelectionRef: (artists: number[]) => void;
	artistSelectionRef: React.MutableRefObject<HTMLSelectElement>
}

export const ModalAntdAddArtistsToLibrary = ({ artistSelectionRef }: any) => {
	// const { t } = useTranslation();
	const { postArtists } = useContext(MyLibraryContext);
	const [artists, setArtists] = useState([]);
	const [selectedArtists, setSelectedArtists] = useState<number[]>([]);

	useEffect(() => {
		if (selectedArtists !== artistSelectionRef.current) artistSelectionRef.current = selectedArtists
	}, [selectedArtists, artistSelectionRef])

	useEffect(() => {
		getArtistApi().then((res: any) => {
			res && setArtists(res.artists);
		})
	}, [selectedArtists, artistSelectionRef])

	const handleSelectArtist = (selectedArtistId: number) => {
		const artistSelected = selectedArtists.find((artistId: any) => artistId === selectedArtistId)
		if (artistSelected) {
			setSelectedArtists(selectedArtists.filter((artistId: any) => artistId !== selectedArtistId))
		}
		if (!artistSelected) {
			setSelectedArtists([...selectedArtists, selectedArtistId])
		}
	}

	return (
		<section className="modal-playlist-create">
			<h2>add artists</h2>
			<div className="modal-playlist-create__main">
				{artists && artists.map(artist => {
					const { _id, name, imageUrl } = artist;
					return (
						<div
							key={_id}
							className={`render-artist ${selectedArtists.some((artistId: number) => artistId === _id) && 'selected-artist'}`}
							onClick={() => handleSelectArtist(_id)}
						>
							<div className='render-artist__thumbnail'>
								<img src={imageUrl} alt={name} />
							</div>
							<p className='render-artist__description'>{name}</p>
						</div>
					)
				})}
			</div>
		</section>
	)
}