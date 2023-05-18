import { responsiveBreak } from "utils/componentsConstants";
import useWindowSizeReport from "hooks/useWindowSizeReport";
import SwiperMusicPage from "views/components/SwiperCarousel/carouselMusicPage/SwiperMusicPage";
import SwiperTracksComponent from "views/components/SwiperCarousel/carouselTracks/SwiperTracksComponent";
import './musicPageComponent.scss'
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from 'views/UI/spinner/Spinner';

const MusicPageComponent = () => {
  const [screenWidth] = useWindowSizeReport()
  const {isLoading} = useAuth0()

  if (isLoading) {
    return <Spinner />
  }

  return (
    <section className="music-page">
      {(screenWidth > responsiveBreak) ? null : <h1>Music</h1>}
      <SwiperMusicPage data={"genres"} />
      <SwiperTracksComponent />
      <SwiperMusicPage data={"artists"} />
      <SwiperMusicPage data={"playlists"} />
      <SwiperMusicPage data={"albums"} />
    </section>
  )
}

export default MusicPageComponent;