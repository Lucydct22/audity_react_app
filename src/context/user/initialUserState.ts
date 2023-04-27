const initialUserState = {
	auth0User: {},
	user: {
		_id: '',
		userId: '',
		name: '',
		lastname: '',
		nickname: '',
		email: '',
		country: '',
		language: '',
		following: [],
	},
	updateUserInfo: () => { }
}

export default initialUserState