import { useEffect, useState } from 'react';
import './albumPage.scss'
import HelmetSEO from "../../../utils/HelmetSEO";
import StructureMainBComponent from "../../../components/basic/structureMainBComponent/StructureMainBComponent";
import { RenderAlbum } from "../../../components/basic/structureMainBComponent/musicPageComponent/albumComponents/renderAlbum/RenderAlbum";
import { getAlbumsApi } from '../../../../api/music/albums';

const AlbumPage = ({ }) => {
	const [albums, setAlbums] = useState([])

	useEffect(() => {
		const getAlbums = async () => {
			const albumsData = await getAlbumsApi()
			setAlbums(albumsData)
		}
		getAlbums()
	}, [])

	return (
		<HelmetSEO
			title='Album | Audity'
			description='Audity Album Page'
		>
			<StructureMainBComponent>
					<div className="album-page-content">
						<h1>Album Page</h1>
						<div className='album-page-content__grid'>
							{albums.map(album => {
								return <RenderAlbum key={album.id} album={album} />
							})}
						</div>
					</div>
			</StructureMainBComponent>
		</HelmetSEO >
	)
}

export default AlbumPage;