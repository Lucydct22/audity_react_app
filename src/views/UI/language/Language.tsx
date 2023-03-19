import { useTranslation } from "react-i18next";

const lngs = [
  { code: "en", native: "English" },
  { code: "es", native: "Spanish" },
];

const Language = () => {
  const { i18n } = useTranslation();

  const handleTrans = (code: string) => { 
    i18n.changeLanguage(code);
    document.documentElement.setAttribute("lang", code);
  };

  return (
    <div style={{ padding: '50px' }}>
      {lngs.map((lng, i) => {
        const { code, native } = lng;
        return <button key={i} onClick={() => handleTrans(code)}>{native}</button>;
      })}
    </div>
  )
}

export default Language;