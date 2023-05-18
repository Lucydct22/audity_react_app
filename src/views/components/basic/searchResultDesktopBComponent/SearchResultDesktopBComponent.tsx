import './searchResultDesktopBComponent.scss'
import { useContext, useState, useEffect } from 'react';
import CurrentTrackContext from 'context/currentTrack/CurrentTrackContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import imgDefault1 from 'assets/img/webp/6.webp'

const Render = ({ data, url }: any) => {

  const { currentTrack } = useContext(CurrentTrackContext);
  const [artists, setArtists] = useState('')
  const { _id, name, imageUrl } = data;
  const imageSource = imageUrl || imgDefault1

  useEffect(() => {
    let isMounted = true
    const artists = currentTrack.artists.map((artist: any) => artist.name).join(' & ');
    isMounted && setArtists(artists)
    return () => { isMounted = false }
  }, [])

  return (
    <Link to={`/${url}/${_id}`}>
      <div className='render-item'>
        <div className='render-item__thumbnail'>
          <img src={imageSource} alt={name} />
        </div>
        <div className='render-item__data'>
          <p className='render-item__p'>{name}</p>
        </div>
      </div>
    </Link>
  )
}

const SearchResultDesktopBComponent = ({ content }: any) => {

  const { albums, artists, tracks, playlists } = content
  const { t } = useTranslation();



  return (
    <div className='results-container'>
      {tracks.length > 0 &&
        <div className='results-container__tracks'>
          <span>Tracks</span>
          {tracks.slice(0, 2).map((track: any) => <Render key={track._id} data={track} url={'tracks'} />)}
        </div>
      }

      {albums.length > 0 &&
        <div className='results-container__albums' >
          <span>Albums</span>
          {albums.slice(0, 2).map((album: any) => <Render key={album._id} data={album} url={'albums'} />)}
        </div>
      }

      {artists.length > 0 &&
        <div className='results-container__artists'>
          <span>Artists</span>
          {artists.slice(0, 2).map((artist: any) => <Render key={artist._id} data={artist} url={'artists'} />)}
        </div>
      }

      {playlists.length > 0 &&
        <div className='results-container__playlists'>
          <span>Playlists</span>
          {playlists.slice(0, 2).map((playlist: any) => <Render key={playlist._id} data={playlist} url={'playlists'} />)}
        </div>
      }

      {artists.length < 1 && albums.length < 1 && tracks.length < 1 && playlists.length < 1 && <span>{t('search_result_null')}</span>}



    </div>
  )
}

export default SearchResultDesktopBComponent