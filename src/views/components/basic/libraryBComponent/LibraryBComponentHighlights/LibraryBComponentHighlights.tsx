import SwiperLibraryPage from 'views/components/SwiperCarousel/carouselLibraryPage/SwiperLibraryPage';
import './libraryBComponentHighlights.scss';
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from 'views/UI/spinner/Spinner';

export default function LibraryBComponentHighlights() {
  const {isLoading} = useAuth0()

  if (isLoading) {
    return <Spinner />
  }
  return (
    <div className='library-highlights'>
      <div className='library-highlights__content'>
        <SwiperLibraryPage data={"playlists"} />
        <SwiperLibraryPage data={"albums"} />
        <SwiperLibraryPage data={"artists"} />
      </div>
    </div >
  );
}
