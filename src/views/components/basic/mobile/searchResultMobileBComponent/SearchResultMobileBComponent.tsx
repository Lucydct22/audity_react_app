import './searchResultMobileBComponent.scss'
import { useTranslation } from 'react-i18next'
import { IoChevronForwardSharp, IoHeartOutline, IoHeartSharp } from "react-icons/io5"
import { NavLink, Link } from 'react-router-dom'
import { useEffect, useContext, useState } from 'react'
import CurrentTrackContext from 'context/currentTrack/CurrentTrackContext'
import MyLibraryContext from 'context/myLibrary/MyLibraryContext'
import imgDefault1 from 'assets/img/webp/6.webp'
import { getTracksApi } from "api/music/tracks";
import { Track } from 'interfaces/music'

const RenderTrack = ({ data, url }: any) => {

  const { currentTrack } = useContext(CurrentTrackContext);
  const [artistsName, setArtists] = useState('')
  const { _id, name, imageUrl, audioUrl } = data;
  const imageSource = imageUrl || imgDefault1
  const { trackData, selectCurrentTrack, playCurrentTrack, pauseCurrentTrack } =
    useContext(CurrentTrackContext);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    let isMounted = true
    const artists = currentTrack.artists.map((artist: any) => artist.name).join(' & ');
    isMounted && setArtists(artists)
    return () => { isMounted = false }
  }, [])

  useEffect(() => {
    let isMounted = true;
    getTracksApi().then((res: any) => {
      isMounted && res && setTracks(res.tracks);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleClick = () => {

    const track = (tracks as Track[]).find((track: any) => track._id === data._id)

    if (trackData.url !== track?.url) {
      selectCurrentTrack(track);
     } else{
       trackData.isPlaying ? pauseCurrentTrack() : playCurrentTrack(); 
      }
    }

    return (
      <div className='render-track-search' onClick={handleClick}>
        <div className='render-track-search__thumbnail'>
          <img src={imageSource} alt={name} />
        </div>
        <div className='render-track-search__data'>
          <p className='render-track-search__data__name'>{name}</p>
          <p className='render-track-search__data__artists'> {artistsName}</p>
        </div>
      </div>
    )
  }

  const Render = ({ data, url }: any) => {

    const { currentTrack } = useContext(CurrentTrackContext);
    const [artistsName, setArtists] = useState('')
    const { _id, name, imageUrl } = data;
    const imageSource = imageUrl || imgDefault1

    useEffect(() => {
      let isMounted = true
      const artists = currentTrack.artists.map((artist: any) => artist.name).join(' & ');
      isMounted && setArtists(artists)
      return () => { isMounted = false }
    }, [])

    return (
      <Link to={`/${url}/${_id}`} >
        <div className='render-track-search'>
          <div className='render-track-search__thumbnail'>
            <img src={imageSource} alt={name} />
          </div>
          <div className='render-track-search__data'>
            <p className='render-track-search__data__name'>{name}</p>
            <p className='render-track-search__data__artists'> {artistsName}</p>
          </div>
        </div>
      </Link>
    )
  }

  const SearchResultBComponent = ({ content }: any) => {

    const { t } = useTranslation()
    const { albums, artists, tracks, playlists } = content
    const [selectedType, setSelectedType] = useState('all')

    const handleTypeChange = (type: string) => {
      setSelectedType(type)
    }

    const renderResultsByType = () => {
      switch (selectedType) {
        case 'all':
          return (
            <>
              {tracks.length > 0 &&
                <div className='search-result__results--tracks'>
                  <NavLink to='/playlists'>
                    <div className='search-result__results--tracks--titul'>
                      <span>{t('search_result_type_tracks')}</span>
                      <IoChevronForwardSharp />
                    </div>
                  </NavLink>
                  <div className='search-result__results--tracks--content'>
                    {tracks.slice(0, 2).map((track: any) => <RenderTrack key={track._id} data={track} url={'tracks'} />)}
                    <button className='search-result__results--tracks--bnt'>{t('search_result_type_btn_all')}</button>
                  </div>
                </div>
              }

              {artists.length > 0 &&
                <div className='search-result__results--artists'>
                  <NavLink to='/artists'>
                    <div className='search-result__results--artists--titul'>
                      <span>{t('search_result_type_artists')}</span>
                      <IoChevronForwardSharp />
                    </div>
                  </NavLink>
                  <div className='search-result__results--artists--content'>
                    {artists.slice(0, 2).map((artist: any) => <Render key={artist._id} data={artist} url={'artists'} />)}
                    <button className='search-result__results--artists--bnt'>{t('search_result_type_btn_all')}</button>
                  </div>
                </div>
              }

              {albums.length > 0 &&
                <div className='search-result__results--albums'>
                  <NavLink to='/albums'>
                    <div className='search-result__results--albums--titul'>
                      <span>{t('search_result_type_albums')}</span>
                      <IoChevronForwardSharp />
                    </div>
                  </NavLink>
                  <div className='search-result__results--albums--content'>
                    {albums.slice(0, 2).map((album: any) => <Render key={album._id} data={album} url={'albums'} />)}
                    <button className='search-result__results--albums--bnt'>{t('search_result_type_btn_all')}</button>
                  </div>
                </div>
              }

              {playlists.length > 0 &&
                <div className='search-result__results--playlists'>
                  <NavLink to='/playlists'>
                    <div className='search-result__results--playlists--titul'>
                      <span>{t('search_result_type_playlists')}</span>
                      <IoChevronForwardSharp />
                    </div>
                  </NavLink>
                  <div className='search-result__results--playlists--content'>
                    {playlists.slice(0, 2).map((playlist: any) => <Render key={playlist._id} data={playlist} url={'playlists'} />)}
                    <button className='search-result__results--playlists--bnt'>{t('search_result_type_btn_all')}</button>
                  </div>
                </div>
              }
            </>
          );
        case 'tracks':
          return (
            <>
              {tracks.length > 0 &&
                <div className='search-result__results--tracks'>
                  <NavLink to='/playlists'>
                    <div className='search-result__results--tracks--titul'>
                      <span>{t('search_result_type_tracks')}</span>
                      <IoChevronForwardSharp />
                    </div>
                  </NavLink>
                  <div className='search-result__results--tracks--content'>
                    {tracks.slice(0, 2).map((track: any) => <RenderTrack key={track._id} data={track} url={'tracks'} />)}
                    <button className='search-result__results--tracks--bnt'>{t('search_result_type_btn_all')}</button>
                  </div>
                </div>
              }
            </>
          );
        case 'artists':
          return (
            <>
              {artists.length > 0 &&
                <div className='search-result__results--artists'>
                  <NavLink to='/artists'>
                    <div className='search-result__results--artists--titul'>
                      <span>{t('search_result_type_artists')}</span>
                      <IoChevronForwardSharp />
                    </div>
                  </NavLink>
                  <div className='search-result__results--artists--content'>
                    {artists.slice(0, 2).map((artist: any) => <Render key={artist._id} data={artist} url={'artists'} />)}
                    <button className='search-result__results--artists--bnt'>{t('search_result_type_btn_all')}</button>
                  </div>
                </div>
              }
            </>
          );
        case 'albums':
          return (
            <>
              {albums.length > 0 &&
                <div className='search-result__results--albums'>
                  <NavLink to='/albums'>
                    <div className='search-result__results--albums--titul'>
                      <span>{t('search_result_type_albums')}</span>
                      <IoChevronForwardSharp />
                    </div>
                  </NavLink>
                  <div className='search-result__results--albums--content'>
                    {albums.slice(0, 2).map((album: any) => <Render key={album._id} data={album} url={'albums'} />)}
                    <button className='search-result__results--albums--bnt'>{t('search_result_type_btn_all')}</button>
                  </div>
                </div>
              }
            </>
          );
        case 'playlists':
          return (
            <>
              {playlists.length > 0 &&
                <div className='search-result__results--playlists'>
                  <NavLink to='/playlists'>
                    <div className='search-result__results--playlists--titul'>
                      <span>{t('search_result_type_playlists')}</span>
                      <IoChevronForwardSharp />
                    </div>
                  </NavLink>
                  <div className='search-result__results--playlists--content'>
                    {playlists.slice(0, 2).map((playlist: any) => <Render key={playlist._id} data={playlist} url={'playlists'} />)}
                    <button className='search-result__results--playlists--bnt'>{t('search_result_type_btn_all')}</button>
                  </div>
                </div>
              }
            </>
          );
      }
    }

    return (
      <div className='search-result'>

        <h2>{t('search_result_h2')}</h2>

        <div className='search-result__type'>
          <button
            className={`search-result__type--track ${selectedType === 'all' ? 'active' : ''}`}
            onClick={() => handleTypeChange('all')}>{t('search_result_type_all')}</button>
          <button
            className={`search-result__type--track ${selectedType === 'tracks' ? 'active' : ''}`}
            onClick={() => handleTypeChange('tracks')}>{t('search_result_type_tracks')}</button>
          <button
            className={`search-result__type--track ${selectedType === 'artists' ? 'active' : ''}`}
            onClick={() => handleTypeChange('artists')}>{t('search_result_type_artists')}</button>
          <button
            className={`search-result__type--track ${selectedType === 'albums' ? 'active' : ''}`}
            onClick={() => handleTypeChange('albums')}>{t('search_result_type_albums')}</button>
          <button
            className={`search-result__type--track ${selectedType === 'playlists' ? 'active' : ''}`}
            onClick={() => handleTypeChange('playlists')}>{t('search_result_type_playlists')}</button>
        </div>

        <div className='search-result__results'>
          {renderResultsByType()}
        </div>
      </div>
    )
  }

  export default SearchResultBComponent

