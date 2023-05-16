import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import './genreBComponent.scss';
import { responsiveBreak } from "utils/componentsConstants";
import useWindowSizeReport from "hooks/useWindowSizeReport";
import { getGenrePlaylistById, getGenreAlbumById, getGenreArtistById } from 'api/music/genres';
import { Playlist, Albums, Artist } from 'interfaces/music';
import RenderPlaylist from '../renders/renderPlaylist/RenderPlaylist';
import RenderAlbum from '../renders/renderAlbum/RenderAlbum';
import RenderArtist from '../renders/renderArtist/RenderArtist';
import { MdArrowBack } from 'react-icons/md'

const GenreBComponent = ({ genre }: any) => {
  const { t } = useTranslation();
  const [screenWidth] = useWindowSizeReport()
  const navigate = useNavigate();

  const [playlists, setPlaylists] = useState([])
  const [albums, setAlbums] = useState([])
  const [artists, setArtists] = useState([])

  useEffect(() => {
    let isMounted = true;

    if (genre?._id) {
      getGenrePlaylistById(genre._id).then((res: any) => {
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

      getGenreAlbumById(genre._id).then((res: any) => {
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
      getGenreArtistById(genre._id).then((res: any) => {
        if (isMounted && res && res.artists) {
          console.log(res.artists);
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
      {(screenWidth > responsiveBreak) ?
        <h1 className='genre-page__title'> {genre?.name}</h1>
        :
        <button onClick={() => navigate(-1)} className="genre-page__mobile">
          <MdArrowBack size={27} />
          <span>{genre?.name}</span>
        </button>
      }
      {playlists.length > 0 &&
        <div className='genre-page__section'>
          <h2 className='genre-page__section--title'>{t("sidebar_explore_playlist")}</h2>
          <div className='genre-page__section--content'>
            {playlists.map((playlist: any) => <RenderPlaylist key={playlist._id} playlist={playlist} />)}
          </div>
        </div>
      }
      {albums.length > 0 &&
        <div className='genre-page__section'>
          <h2 className='genre-page__section--title'>{t("sidebar_explore_album")}</h2>
          <div className='genre-page__section--content'>
            {albums.map((album: any) => <RenderAlbum key={album._id} album={album} />)}
          </div>
        </div>
      }
      {artists.length > 0 &&
        <div className='genre-page__section'>
          <h2 className='genre-page__section--title'>{t("sidebar_explore_artist")}</h2>
          <div className='genre-page__section--content'>
            {artists.map((artist: any) => <RenderArtist key={artist._id} artist={artist} />)}
          </div>
        </div>
      }
      {playlists.length <= 0 && albums.length <= 0 && artists.length <= 0 && <h3>No content found under genre {genre?.name}.<br /> <Link to={"/"}>Go back to home page</Link></h3>}
    </div >
  )
}

export default GenreBComponent







