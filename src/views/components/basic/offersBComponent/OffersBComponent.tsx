import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";
import { HiCheckCircle } from 'react-icons/hi'
import './offersBComponent.scss'

const OffersBComponent = () => {
  const { t } = useTranslation()
  const { loginWithRedirect } = useAuth0()

  return (
    <div className="audity-offers">
      <h2 className="audity-offers__title">{t("audity_offers_title")}</h2>
      <section className="audity-offers__content">
        <div className="audity-offers__content--header">
          <span>&nbsp;</span>
          <span>{t("audity_offers_header1")}</span>
          <span>{t("audity_offers_header2")}</span>
        </div>
        <div className="audity-offers__content--body">
          <div className="audity-offers__content--body__wrapper">
            <p>{t("audity_offers_body_p1")}</p>
            <span><HiCheckCircle /></span>
            <span><HiCheckCircle /></span>
          </div>
          <div className="audity-offers__content--body__wrapper">
            <p>{t("audity_offers_body_p2")}</p>
            <span><HiCheckCircle /></span>
            <span><HiCheckCircle /></span>
          </div>
          <div className="audity-offers__content--body__wrapper">
            <p>{t("audity_offers_body_p3")}</p>
            <span><HiCheckCircle /></span>
            <span><HiCheckCircle /></span>
          </div>
          <div className="audity-offers__content--body__wrapper">
            <p>{t("audity_offers_body_p4")}</p>
            <span><HiCheckCircle /></span>
            <span><HiCheckCircle /></span>
          </div>
          <div className="audity-offers__content--body__wrapper">
            <p>{t("audity_offers_body_p5")}</p>
            <span>-</span>
            <span><HiCheckCircle /></span>
          </div>
          <div className="audity-offers__content--body__wrapper">
            <p>{t("audity_offers_body_p6")}</p>
            <span>-</span>
            <span><HiCheckCircle /></span>
          </div>
          <div className="audity-offers__content--body__wrapper">
            <p>{t("audity_offers_body_p7")}</p>
            <span>-</span>
            <span><HiCheckCircle /></span>
          </div>
          <div className="audity-offers__content--body__wrapper">
            <p>{t("audity_offers_body_p8")}</p>
            <span>-</span>
            <span><HiCheckCircle /></span>
          </div>
        </div>
        <div className="audity-offers__content--footer">
          <button className="audity-offers__content--footer__action" onClick={() => loginWithRedirect()}>
            <p>{t("audity_offers_footer_p1")}</p>
            <span>{t("audity_offers_footer_p2")}</span>
          </button>
        </div>
      </section>
    </div>
  )
}

export default OffersBComponent