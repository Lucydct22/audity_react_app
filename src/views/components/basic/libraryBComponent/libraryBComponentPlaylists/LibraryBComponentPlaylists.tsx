import SwiperLibraryPage from 'views/components/SwiperCarousel/carouselLibraryPage/SwiperLibraryPage';
import './libraryBComponentPlaylists.scss';
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from 'views/UI/spinner/Spinner';

const LibraryBComponentPlaylists = () => {
  const { isLoading } = useAuth0()

  if (isLoading) {
    return <Spinner />
  }
  return (
    <div className='library-playlists'>
      <div className='library-highlights__content'>
        <SwiperLibraryPage data={"playlists"} />
      </div>
    </div>
  );
}

export default LibraryBComponentPlaylists
