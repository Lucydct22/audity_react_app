import React, { useContext, useEffect, useState} from "react";
import { useTranslation } from "react-i18next";
import './Language.scss';
import UserContext from "context/user/UserContext";
import { LanguageContext, languages } from "context/language/LanguageContext";

const Language = () => {
  const { language, setLanguageAction } = useContext(LanguageContext)

  return (
    <div className="language-switcher">
      <div className="language-switcher__section">
        {languages.map((lng, i) => {
          const { code, label, img } = lng;
          return (
            <div key={i} className="language-switcher__section--container">
              <button onClick={() => setLanguageAction(code)} className="language-switcher__section--container__btn">
                <img src={img} alt={label} className={language==code ? "language-switcher__section--container__btn--imgActive" : "language-switcher__section--container__btn--img"} />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Language;

