import RenderPlaylist from '../musicPageComponent/dailyListsSlider/renderPlaylist/RenderPlaylist';
import './playlistsBComponent.scss';

export default function PlaylistsBComponent({ playlists }: any) {
	return (
		<div className="playlist-page-content">
			<h1>Playlist Page</h1>
			<div className='playlist-page-content__grid'>
				{playlists &&
					playlists.map((playlist: any) => <RenderPlaylist key={playlist.id} playlist={playlist} />)
				}
			</div>
		</div>
	)
}
