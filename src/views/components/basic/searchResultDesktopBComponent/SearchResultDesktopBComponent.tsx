import './searchResultDesktopBComponent.scss'
import { useContext, useState, useEffect } from 'react';
import CurrentTrackContext from 'context/currentTrack/CurrentTrackContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Render = ({ data, url }: any) => {

  const { currentTrack } = useContext(CurrentTrackContext);
  const [artists, setArtists] = useState('')

  useEffect(() => {
    let isMounted = true
    const artists = currentTrack.artists.map((artist: any) => artist.name).join(' & ');
    isMounted && setArtists(artists)
    return () => { isMounted = false }
  }, [])

  const { _id, name, imageUrl } = data;

  return (
    <Link to={`/${url}/${_id}`}>
      <div className='render-item'>
        <div className='render-item__thumbnail'>
          <img src={imageUrl} alt={name} />
        </div>
        <div className='render-item__data'>
          <p className='render-item__p'>{name} - Artist</p>
        </div>
      </div>
    </Link>
  )
}

const SearchResultDesktopBComponent = ({ content }: any) => {

  const { albums, artists, tracks } = content
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

      {artists.length < 1 && albums.length < 1 && tracks.length < 1 && <span>{t('search_result_null')}</span>}

      

    </div>
  )
}

export default SearchResultDesktopBComponent