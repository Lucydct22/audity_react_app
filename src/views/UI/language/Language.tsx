import React, { useState} from "react";
import { useTranslation } from "react-i18next";
import English from "assets/img/png/English.png";
import Spanish from "assets/img/png/Spanish.png";
import './Language.scss';

const lngs = [
  {
    code: "en",
    native: "English",
    img: English
  },
  {
    code: "es",
    native: "Spanish",
    img: Spanish
  },
];

const Language = () => {
  const { i18n } = useTranslation();
  const [actualCode, setActualCode] = useState('en');

  const handleTrans = (code: string) => {
    i18n.changeLanguage(code);
    document.documentElement.setAttribute("lang", code);
    setActualCode(code);
  };

  return (
    <div className="language-switcher">
      <div className="language-switcher__section">
        {lngs.map((lng, i) => {
          const { code, native, img } = lng;

          return (
            <div className="language-switcher__section--container">
              <button key={i} onClick={() => handleTrans(code)} className="language-switcher__section--container__btn">
                <img src={img} alt={native} className={actualCode==code ? "language-switcher__section--container__btn--imgActive" : "language-switcher__section--container__btn--img"} />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Language;

