import RenderAlbum from "../musicPageComponent/albumsSlider/renderAlbum/RenderAlbum";
import './albumsBComponent.scss';

export default function AlbumsBComponent({ albums }) {
	return (
		<div className="albums-page-content">
			<h1>Album Page</h1>
			<div className='albums-page-content__grid'>
				{albums.map(album => {
					return <RenderAlbum key={album.id} album={album} />
				})}
			</div>
		</div>
	)
}