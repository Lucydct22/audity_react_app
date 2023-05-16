import './searchResultMobileBComponent.scss'
import { useTranslation } from 'react-i18next'
import { IoChevronForwardSharp, IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { NavLink, Link } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import RenderAlbum from '../../renders/renderAlbum/RenderAlbum';
import RenderArtist from '../../renders/renderArtist/RenderArtist';
import RenderPlaylist from '../../renders/renderPlaylist/RenderPlaylist';
import CurrentTrackContext from 'context/currentTrack/CurrentTrackContext';

// change navlink to 

const RenderTrack = ({ data }: any) => {

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
    <Link to={`/tracks/${_id}`} >
      <div className='render-track'>
        <div className='render-track__thumbnail'>
          <img src={imageUrl} alt={name} />
        </div>
        <div className='render-track__data'>
          <p className='render-track__data__name'>{name}</p>
          <p className='render-track__data__artists'> {artists}</p>
        </div>
        <IoHeartOutline />
      </div>
    </Link>
  )
}


const SearchResultBComponent = ({ content }: any) => {

  const { t } = useTranslation()
  const { albums, artists, tracks } = content

  return (
    <div className='search-result'>

      <h2>{t('search_result_h2')}</h2>

      <div className='search-result__type'>
        <button className='search-result__type--all'>{t('search_result_type_all')}</button>
        <button className='search-result__type--track'>{t('search_result_type_tracks')}</button>
        <button className='search-result__type--artists'>{t('search_result_type_artists')}</button>
        <button className='search-result__type--albums'>{t('search_result_type_albums')}</button>
        <button className='search-result__type--playlists'>{t('search_result_type_playlists')}</button>
      </div>

      <div className='search-result__results'>
        {
          tracks.length > 0 &&

          <div className='search-result__results--tracks'>
            <NavLink to='/'>
              <div className='search-result__results--tracks--titul'>
                <span>{t('search_result_type_tracks')}</span>
                <IoChevronForwardSharp />
              </div>
            </NavLink>
            <div className='search-result__results--tracks--content'>
              {tracks.slice(0, 2).map((track: any) => <RenderTrack key={track._id} data={track} />)}
              <button className='search-result__results--tracks--bnt'>{t('search_result_type_btn_all')}</button>
            </div>

          </div>
        }

        {
          artists.length > 0 &&

          <div className='search-result__results--artists'>
            <NavLink to='/'>
              <div className='search-result__results--artists--titul'>
                <span>{t('search_result_type_artists')}</span>
                <IoChevronForwardSharp />
              </div>
            </NavLink>
            <div className='search-result__results--artists--content'>
              {artists.slice(0, 2).map((artist: any) => <RenderTrack key={artist._id} data={artist} />)}
              <button className='search-result__results--artists--bnt'>{t('search_result_type_btn_all')}</button>
            </div>
          </div>
        }

        {
          albums.length > 0 &&

          <div className='search-result__results--albums'>
            <NavLink to='/'>
              <div className='search-result__results--albums--titul'>
                <span>{t('search_result_type_albums')}</span>
                <IoChevronForwardSharp />
              </div>
            </NavLink>
            <div className='search-result__results--albums--content'>
              {albums.slice(0, 2).map((album: any) => <RenderTrack key={album._id} data={album} />)}
              <button className='search-result__results--albums--bnt'>{t('search_result_type_btn_all')}</button>
            </div>
          </div>
        }

        {artists.length > 0 &&

          <div className='search-result__results--playlists'>
            <NavLink to='/'>
              <div className='search-result__results--playlists--titul'>
                <span>{t('search_result_type_playlists')}</span>
                <IoChevronForwardSharp />
              </div>
            </NavLink>
            <div className='search-result__results--playlists--content'>
              {/* {playlists.slice(0, 2).map((playlist: any) => <RenderPlaylist key={playlist._id} playlist={playlist} />)} */}
              <button className='search-result__results--playlists--bnt'>{t('search_result_type_btn_all')}</button>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default SearchResultBComponent

