import './renderMusicItem.scss';
import GrayPerson from 'assets/img/webp/profile-placeholder-160x160.webp'
import RenderGenres from 'views/components/basic/renders/genresRender/RenderGenres';
import RenderAlbum from 'views/components/basic/renders/renderAlbum/RenderAlbum';
import RenderArtist from 'views/components/basic/renders/renderArtist/RenderArtist';
import RenderPlaylist from 'views/components/basic/renders/renderPlaylist/RenderPlaylist';

export default function RenderMusicItem({ list, type }) {

  if (type === "genres") {
    return <RenderGenres genre={list} />
  }

  if (type === "artists") {
    return <RenderArtist artist={list} />
  }

  if (type === "playlists") {
    return <RenderPlaylist playlist={list} />
  }

  if (type === "albums") {
    return <RenderAlbum album={list} />
  }

  return (
    <div className='render-carousel-music-item'>
      <div className='render-carousel-music-item__thumbnail'>
        <img
          src={GrayPerson}
          alt="404 Category not found"
          className='render-carousel-music-item__thumbnail--img' />
      </div>
      <p className='render-carousel-music-item__description'>404 Category not found</p>
    </div>
  )
}
