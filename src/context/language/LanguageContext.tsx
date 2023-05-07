import UserContext from "context/user/UserContext";
import { createContext, useState, useCallback, useMemo, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import English from "assets/img/png/English.png";
import Spanish from "assets/img/png/Spanish.png";

export const LanguageContext = createContext({
	language: '',
	setLanguageAction: (language: string) => { }
});

export const LanguageProvider = ({ children }: any) => {
	const { i18n } = useTranslation();
	const { dbUser, updateUserLanguage } = useContext(UserContext)
	const [language, setLanguage] = useState('en')

	useEffect(() => {
		i18n.changeLanguage(dbUser.language);
		setLanguage(dbUser.language)
	}, [dbUser.language])

	const setLanguageAction = useCallback((language: any) => {
		i18n.changeLanguage(language);
		document.documentElement.setAttribute("lang", language);
		updateUserLanguage(language)
		setLanguage(language)
	},
		[],
	)

	const memorizedProviderLanguage = useMemo(() => ({
		language,
		setLanguageAction
	}), [
		language,
		setLanguageAction
	])

	return (
		<LanguageContext.Provider value={memorizedProviderLanguage as any}>
			{children}
		</LanguageContext.Provider>
	)
}

export const languages = [
  {
    code: "en",
    label: "English",
    img: English
  },
  {
    code: "es",
    label: "Spanish",
    img: Spanish
  },
];