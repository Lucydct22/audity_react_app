import { useAuth0 } from "@auth0/auth0-react";
import { HiCheckCircle } from 'react-icons/hi'
import './offersBComponent.scss'

const OffersBComponent = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <div className="audity-offers">
      <h2 className="audity-offers__title">Limitless experience with Audity account</h2>
      <section className="audity-offers__content">
        <div className="audity-offers__content--header">
          <span>&nbsp;</span>
          <span>Guest</span>
          <span>Account</span>
        </div>
        <div className="audity-offers__content--body">
          <div className="audity-offers__content--body__wrapper">
            <p>Unlimited access to hundreds of tracks</p>
            <span><HiCheckCircle /></span>
            <span><HiCheckCircle /></span>
          </div>
          <div className="audity-offers__content--body__wrapper">
            <p>Background listening</p>
            <span><HiCheckCircle /></span>
            <span><HiCheckCircle /></span>
          </div>
          <div className="audity-offers__content--body__wrapper">
            <p>Ad-free experience</p>
            <span><HiCheckCircle /></span>
            <span><HiCheckCircle /></span>
          </div>
          <div className="audity-offers__content--body__wrapper">
            <p>Song control like prev, next, shuffle, loop, volume</p>
            <span><HiCheckCircle /></span>
            <span><HiCheckCircle /></span>
          </div>
          <div className="audity-offers__content--body__wrapper">
            <p>Create personal playlists</p>
            <span>-</span>
            <span><HiCheckCircle /></span>
          </div>
          <div className="audity-offers__content--body__wrapper">
            <p>Like you favorite songs</p>
            <span>-</span>
            <span><HiCheckCircle /></span>
          </div>
          <div className="audity-offers__content--body__wrapper">
            <p>Upload your own tracks</p>
            <span>-</span>
            <span><HiCheckCircle /></span>
          </div>
          <div className="audity-offers__content--body__wrapper">
            <p>Follow you favorite artists and albums</p>
            <span>-</span>
            <span><HiCheckCircle /></span>
          </div>
        </div>
        <div className="audity-offers__content--footer">
          <button className="audity-offers__content--footer__action" onClick={() => loginWithRedirect()}>
            <p>CREATE AUDITY ACCOUNT</p>
            <span>No commitment</span>
          </button>
        </div>
      </section>
    </div>
  )
}

export default OffersBComponent