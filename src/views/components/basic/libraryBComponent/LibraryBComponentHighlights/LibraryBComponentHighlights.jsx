import SwiperCarousel from 'views/components/SwiperCarousel/SwiperCarousel';
import './libraryBComponentHighlights.scss';

export default function LibraryBComponentHighlights() {

  return (
    <div className='library-highlights'>
      <div className='library-highlights__content'>
        <SwiperCarousel data={"playlists"} />
        <SwiperCarousel data={"albums"} />
        <SwiperCarousel data={"artists"} />
      </div>
    </div >
  );
}
