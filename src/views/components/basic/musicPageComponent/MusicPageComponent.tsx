import { responsiveBreak } from "utils/componentsConstants";
import useWindowSizeReport from "hooks/useWindowSizeReport";
import SwiperMusicPage from "views/components/SwiperCarousel/carouselMusicPage/SwiperMusicPage";
import './musicPageComponent.scss'

const MusicPageComponent = () => {
  const [screenWidth] = useWindowSizeReport()

  return (
    <section className="music-page">
      {(screenWidth > responsiveBreak) ? null : <h1>Music</h1>}
      <SwiperMusicPage data={"genres"} />
      <SwiperMusicPage data={"artists"} />
      <SwiperMusicPage data={"playlists"} />
      <SwiperMusicPage data={"albums"} />
    </section>
  )
}

export default MusicPageComponent;