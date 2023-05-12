const initialMyLibraryState = {
	albums: {
		info: {
			length: 0,
		},
		content: []
	},
	artists: {
		info: {
			length: 0,
		},
		content: []
	},
	playlists: {
		info: {
			length: 0,
		},
		content: [],
		userContent: [],
	},
	tracks: {
		info: {
			length: 0,
		},
		content: []
	},
	postPlaylist: (name: string, description: string) => { }
}

export default initialMyLibraryState