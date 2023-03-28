import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { getAlbumsApi } from '../../../../api/music/albums';
import AlbumsBComponent from '../../../components/basic/albumsBComponent/AlbumsBComponent';
import HelmetSEO from "../../../utils/HelmetSEO";

const AlbumsPage = ({ }) => {
	const [albums, setAlbums] = useState([]);
	const params: any = useParams();

	useEffect(() => {
		const getAlbums = async () => {
			const albumsData: any = await getAlbumsApi()
			setAlbums(albumsData)
		}
		getAlbums()
	}, [])

	return (
		isNaN(parseInt(params.albumId)) ? (
			<HelmetSEO
				title='Albums | Audity'
				description={`Audity | Albums`}
			>
				<AlbumsBComponent albums={albums} />
			</HelmetSEO >
		) : (
			<Outlet />
		)
	)
}

export default AlbumsPage;