import { useState, useEffect, Suspense } from 'react'
import { Link, Navigate } from 'react-router-dom'
import './exploreBComponent.scss'
import { responsiveBreak } from "utils/componentsConstants";
import SwiperCarousel from 'views/components/SwiperCarousel/SwiperCarousel';

export default function ExploreBComponent() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", changeWidth)

    return () => {
      window.removeEventListener("resize", changeWidth)
    }
  })

  return (
    <Suspense fallback={<></>}>
      {(screenWidth > responsiveBreak) ? (
        <Navigate to={"/"} />
      ) : (
        <MobileExplorePage />
      )}
    </Suspense>
  )
}

function MobileExplorePage() {
  return (
    <section className="mobile-explore-page">
      <h1>Explore</h1>
      <div className="mobile-explore-page__content">
        <div className="mobile-explore-page__content--head">
          <h2>All categories</h2>
          <div className="mobile-explore-page__content--head__grid">
            <Link to={'/artists'} className="mobile-explore-page__content--head__grid--item">Artists</Link>
            <Link to={'/albums'} className="mobile-explore-page__content--head__grid--item">Albums</Link>
            <Link to={'/playlists'} className="mobile-explore-page__content--head__grid--item">Playlists</Link>
          </div>
        </div>
        <div className="mobile-explore-page__content--body">
          <SwiperCarousel data={"artists"} />
          <SwiperCarousel data={"albums"} />
          <SwiperCarousel data={"playlists"} />
        </div>
      </div>
    </section>
  )
}
