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
	updateUserLanguage: (lang: string) => { }
}

export default initialUserState