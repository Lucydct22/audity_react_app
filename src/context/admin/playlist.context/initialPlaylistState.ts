const initialPlaylistState = {
	playlists: [],
	postPlaylist: (playlist: any, messageApi: any) => { },
	deletePlaylist: (playlistId: string, messageApi: any) => { },
	updatePlaylist: (data: string, playlist: any, messageApi: any) => { },
	updatePlaylistPublicAccessible: (playlist: any, publiAccessible: boolean, messageApi: any) => { }
}

export default initialPlaylistState