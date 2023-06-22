import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { getArtistApi } from 'api/music/artists';
import './modalAntdAddArtistsToLibrary.scss'

export const ModalAntdAddArtistsToLibrary = ({ artistSelectionRef }: any) => {
  const [artists, setArtists] = useState([]);
	const [selectedArtists, setSelectedArtists] = useState<number[]>([]);
  const { t } = useTranslation()

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
		<section className="modal-artist-create">
			<h2>{t("library_create_artist_text")}</h2>
			<div className="modal-artist-create__main">
				{artists && artists.map(artist => {
					const { _id, name, imageUrl } = artist;
					return (
						<div
							key={_id}
							className={`render-artist ${selectedArtists.some((artistId: number) => artistId === _id) && 'selected-artist'}`}
							onClick={() => handleSelectArtist(_id)}
						>
							<div className='modal-artist-create__main__thumbnail'>
								<img src={imageUrl} alt={name} />
							</div>
							<p className='modal-artist-create__main__description'>{name}</p>
						</div>
					)
				})}
			</div>
		</section>
	)
}