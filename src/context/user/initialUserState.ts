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
		following: [],
	},
	updateUserLanguage: (lang: string) => { },
	updateUserCountry: (count: string) => { }
}

export default initialUserState