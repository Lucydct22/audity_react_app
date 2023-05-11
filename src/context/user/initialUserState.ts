const initialUserState = {
	auth0User: '',
	dbUser: {
		_id: '',
		userId: '',
		name: '',
		dateOfBirth: '',
		lastname: '',
		nickname: '',
		email: '',
		country: '',
		language: '',
		picture: '',
		role: '',
		following: [],
	},
	updateUserLanguage: (lang: string) => { },
	updateUserCountry: (count: string) => { },
	updateUserSettings: (name: string , lastname: string , nickname: string , dateOfBirth: string ) => { },
}

export default initialUserState