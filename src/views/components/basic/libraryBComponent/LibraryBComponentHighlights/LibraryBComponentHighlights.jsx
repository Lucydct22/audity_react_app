import { useEffect, useState } from 'react';
import { getPlaylistApi } from 'api/music/playlists';
import { useTranslation } from 'react-i18next';
import SwiperCarousel from 'views/components/SwiperCarousel/SwiperCarousel';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import './libraryBComponentHighlights.scss';

export default function LibraryBComponentHighlights() {
  const [playlists, setPlaylists] = useState(undefined)

  useEffect(() => {
    let isMounted = true;
    getPlaylistApi().then(res => {
      isMounted && res && setPlaylists(res.playlist);
    })
    return () => { isMounted = false }
  }, [])

  return (
    <div className='library-highlights-carousel'>
      <div className='library-highlights-carousel__content'>
        <SwiperCarousel playlists={playlists} />
      </div>
    </div >
  );
}
