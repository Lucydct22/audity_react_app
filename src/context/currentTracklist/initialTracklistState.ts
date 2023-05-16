const initialTracklistState = {
	listType: '',
	listName: '',
	listId: '',
	tracks: [],
	shuffle: false,
	shuffleTracklist: () => { },
  selectTrack: (trackId: string) => { },
	selectAlbum: (albumId: string) => { },
	selectArtist: (artistId: string) => { },
	selectPlaylist: (playlistId: string) => { },
	selectGenre: (genreId: string) => { },
}

export default initialTracklistState;