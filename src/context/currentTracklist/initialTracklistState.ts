const initialTracklistState = {
	listType: '',
	listName: '',
	listId: '',
	tracks: [],
	shuffle: false,
	shuffleTracklist: () => { },
	selectAlbum: (albumId: string) => { },
	selectArtist: (artistId: string) => { },
	selectPlaylist: (playlistId: string) => { },
	selectGenre: (genreId: string) => { },
}

export default initialTracklistState;