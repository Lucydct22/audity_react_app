import SwiperLibraryPage from 'views/components/SwiperCarousel/carouselLibraryPage/SwiperLibraryPage';
import './libraryBComponentHighlights.scss';

export default function LibraryBComponentHighlights() {

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
