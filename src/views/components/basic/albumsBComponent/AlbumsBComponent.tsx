import { Artist } from "interfaces/music";
import RenderAlbum from "../musicPageComponent/albumsSlider/renderAlbum/RenderAlbum";
import './albumsBComponent.scss';

export default function AlbumsBComponent({ albums }: any) {
	return (
		<div className="albums-page-content">
			<h1>Album Page</h1>
			<div className='albums-page-content__grid'>
				{albums.map((album: Artist) => {
					return <RenderAlbum key={album.id} album={album} />
				})}
			</div>
		</div>
	)
}