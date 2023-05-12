import { useTranslation } from 'react-i18next';
import './genreBComponent.scss';
import { useState, useEffect } from 'react';
import { getGenrePlaylistById, getGenreAlbumById, getGenreArtistById } from 'api/music/genres';
import { Playlist, Albums, Artist } from 'interfaces/music';
import RenderPlaylist from '../renders/renderPlaylist/RenderPlaylist';
import RenderAlbum from '../renders/renderAlbum/RenderAlbum';
import RenderArtist from '../renders/renderArtist/RenderArtist';


const GenreBComponent = ({ genre }: any) => {

  const { t } = useTranslation();

  const [playlists, setPlaylists] = useState<Playlist[] | null>(null)
  const [albums, setAlbums] = useState<Albums[] | null>(null)
  const [artists, setArtists] = useState<Artist[] | null>(null)

  useEffect(() => {
    let isMounted = true;

    if (genre?._id) {
      getGenrePlaylistById(genre._id).then(res => {
        if (isMounted && res && res.playlists) {
          setPlaylists(res.playlists);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [genre]);



  useEffect(() => {
    let isMounted = true;
    if (genre?._id) {

      getGenreAlbumById(genre._id).then(res => {
        if (isMounted && res && res.albums) {
          setAlbums(res.albums);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [genre]);


  useEffect(() => {
    let isMounted = true;
    if (genre?._id) {
      getGenreArtistById(genre._id).then(res => {
        if (isMounted && res && res.artists) {
          setArtists(res.artists);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [genre]);




  return (
    <div className="genre-page">
      <h2 className='genre-page__title'> {genre?.name}</h2>

      <div className='genre-page__section'>
        <h2 className='genre-page__sectiont__title'>{t("sidebar_explore_playlist")}</h2>
        <div className='genre-page__sectiont__content'>
          {playlists &&
            playlists.map((playlist: any) => <RenderPlaylist key={playlist._id} playlist={playlist} />)
          }
        </div>
      </div>
      <div className='genre-page__section'>
        <h2 className='genre-page__sectiont__title'>{t("sidebar_explore_album")}</h2>
        <div className='genre-page__sectiont__content'>
          {albums &&
            albums.map((album: any) => <RenderAlbum key={album._id} album={album} />)
          }
        </div>
      </div>
      <div className='genre-page__section'>
        <h2 className='genre-page__sectiont__title'>{t("sidebar_explore_artist")}</h2>
        <div className='genre-page__sectiont__content'>
          {artists &&
            artists.map((artist: any) => <RenderArtist key={artist._id} artist={artist} />)
          }
        </div>
      </div>
    </div>
  )
}

export default GenreBComponent







