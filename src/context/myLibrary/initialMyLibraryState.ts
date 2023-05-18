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
		content: [],
		userContent: []
	},
	postPlaylist: (name: string, description: string) => { },
	postPrivateTrack: (data: any) => { },
	putTrackToPlaylist: (playlistId: string, trackId: string) => { },
	likeDislikeTrack: (track: any) => { },
	postArtists: (artistIds: string[]) => { }
}

export default initialMyLibraryState