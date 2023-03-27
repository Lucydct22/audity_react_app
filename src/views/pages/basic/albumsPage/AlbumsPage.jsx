import { useEffect, useState } from 'react';
import './albumsPage.scss'
import HelmetSEO from "../../../utils/HelmetSEO";
import { RenderAlbum } from "../../../components/basic/musicPageComponent/albumComponents/renderAlbum/RenderAlbum";
import { getAlbumsApi } from '../../../../api/music/albums';
import { Outlet, useParams } from 'react-router-dom';

const AlbumsPage = ({ }) => {
	const [albums, setAlbums] = useState([]);
	const params = useParams();

	useEffect(() => {
		const getAlbums = async () => {
			const albumsData = await getAlbumsApi()
			setAlbums(albumsData)
		}
		getAlbums()
	}, [])

	return (
		isNaN(parseInt(params.albumId)) ? (
			<HelmetSEO
				title='Album | Audity'
				description='Audity Album Page'
			>
				<div className="albums-page-content">
					<h1>Album Page</h1>
					<div className='albums-page-content__grid'>
						{albums.map(album => {
							return <RenderAlbum key={album.id} album={album} />
						})}
					</div>
				</div>
			</HelmetSEO >
		) : (
			<Outlet />
		)
	)
}

export default AlbumsPage;