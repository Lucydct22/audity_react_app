import React from 'react'
import { getTracksApi, getTrackByIdApi, deleteTrackByIdApi, updateTrackApi, addTrackApi, } from '../../../api/music/tracks';
import { getAlbumsApi, getAlbumsByIdApi, deleteAlbumsByIdApi, updateAlbumApi, addAlbumApi } from '../../../api/music/albums';
import { getArtistApi, getArtistByIdApi, deleteArtistByIdApi, updateArtistApi, addArtistApi } from '../../../api/music/artists';
import { getPlaylistApi, getPlaylistByIdApi, deletePlaylistByIdApi, updatePlaylistApi, addPlaylistApi } from '../../../api/music/playlists';
import { getGenresApi, getGenresByIdApi, deleteGenresByIdApi, updateGenresApi, addGenresApi } from '../../../api/music/genres';
import { Albums, Track, Genres, Playlist, Artist } from '../../../interfaces/music';
export default function ApiTestPage() {
	// TRACKS
	getTracksApi().then((data: Track) => { console.log(data) })
	getTrackByIdApi('1').then((data: Track) => { console.log(data) })
	// deleteTrackByIdApi('1').then((data: Track) => { console.log(data) })
	// const updateDataTrack = { name: "Better of alone" }
	// updateTrackApi('1', updateDataTrack).then((data: Track) => { console.log(data) });
	// const addDataTrack = {
	// 	id: "1",
	// 	name: "Better of alone",
	// 	artist: "RXBYN",
	// 	url: "https://res.cloudinary.com/dmkdsujzh/video/upload/v1644583924/tracks-dev/Rxbyn_-_better_off_alone_fvhwp8.mp3",
	// 	thumbnail: "https://res.cloudinary.com/dmkdsujzh/image/upload/v1644583757/tracks-thumbnails-dev/better_off_alone_gfmcby.jpg",
	// 	genre: "piano",
	// 	likes: ["1", "2", "3"],
	// 	album: "1",
	// 	createdAt: "2023-03-14T09:17:23.739+00:00",
	// 	updatedAt: "2023-03-14T09:17:23.739+00:00"
	// }
	// likeTrackApi('1', '4').then((data: Track) => { console.log(data) });
	// unlikeTrackApi('1', '2').then((data: Track) => { console.log(data) });
	// likeTrackApi('1', '4').then((data: Track) => { console.log(data) });
	// likeTrackApi('1', { id: "4", name: "lucy" }).then((data: Track) => { console.log(data) });

	//ALBUMS
	// getAlbumsApi().then((data: Albums) => { console.log(data) })
	// getAlbumsByIdApi('1').then((data: Albums) => { console.log(data) })
	// deleteAlbumsByIdApi('1').then((data: Albums) => { console.log(data) })
	// const updateDataAlbum = { name: "Flyga" }
	// updateAlbumApi('1', updateDataAlbum).then((data: Albums) => { console.log(data) });
	// const addDataAlbum = {
	// 	id: "1",
	// 	name: "Flyga",
	// 	imageUrl: "https://res.cloudinary.com/dmkdsujzh/video/upload/v1644583924/tracks-dev/Social_Square_-_Tantalizing_Youth_eykq87.mp3",
	// 	artist: "Social Square",
	// 	genres: ["Rock"],
	// 	createdAt: "2023-03-14T09:17:23.739+00:00",
	// 	updatedAt: "2023-03-14T09:17:23.739+00:00"

	// }
	//addAlbumApi(addDataAlbum).then((data: Albums) => { console.log(data) });


	//ARTISTS
	// getArtistApi().then((data: Artist) => { console.log(data) })
	// getArtistByIdApi('1').then((data: Artist) => { console.log(data) })
	// deleteArtistByIdApi('1').then((data: Artist) => { console.log(data) })
	// const updateDataArtist = { name: "Kim Cesarion" }
	// updateArtistApi('1', updateDataArtist).then((data: Artist) => { console.log(data) });
	// const addDataArtist = {
	// 	id: "1",
	// 	name: "Kim Cesarion",
	// 	genres: ["blues", "rock", "pop", "soul"],
	// 	photoUrl: "https://i.scdn.co/image/ab6761610000e5eb842fae710a21f648e26dd910",
	// 	createdAt: "2023-03-14T09:17:23.739+00:00",
	// 	updatedAt: "2023-03-14T09:17:23.739+00:00"
	// }
	//addArtistApi(addDataArtist).then((data: Artist) => { console.log(data) });



	//PLAYLISTS
	// getPlaylistApi().then((data: Playlist) => { console.log(data) })
	// getPlaylistByIdApi('1').then((data: Playlist) => { console.log(data) })
	// deletePlaylistByIdApi('1').then((data: Playlist) => { console.log(data) })
	// const updateDataPlaylist = { name: "Road trip! All the masters I need!" }
	// updatePlaylistApi('1', updateDataPlaylist).then((data: Playlist) => { console.log(data) });
	// const addDataPlaylist = {
	// 	id: "1",
	// 	name: "Road trip! All the masters I need!",
	// 	thumbnail: "https://res.cloudinary.com/dmkdsujzh/image/upload/v1644625060/tracks-thumbnails-dev/car_yx6ld1.jpg",
	// 	description: "Get your mic on with this beats. You are going to sing all the way down",
	// 	publicAccessible: false,
	// 	musicList: ["1", "2", "3", "4", "5"],
	// 	createdAt: "2023-03-14T09:17:23.739+00:00",
	// 	updatedAt: "2023-03-14T09:17:23.739+00:00"
	// }
	//addPlaylistApi(addDataPlaylist).then((data: Playlist) => { console.log(data) });


	//GENRES
	// getGenresApi().then((data: Genres) => { console.log(data) })
	// getGenresByIdApi('1').then((data: Genres) => { console.log(data) })
	// deleteGenresByIdApi('1').then((data: Genres) => { console.log(data) })
	// const updateDataGenres = { name: "Kim Cesarion" }
	// updateGenresApi('1', updateDataGenres).then((data: Genres) => { console.log(data) });
	// const addDataGenres = {
	// 	id: "1",
	// 	name: "blues",
	// 	createdAt: "2023-03-14T09:17:23.739+00:00",
	// 	updatedAt: "2023-03-14T09:17:23.739+00:00"
	// }
	//addGenresApi(addDataGenres).then((data:Genres) => { console.log(data) });




	return (
		<div>ApiTestPage</div>
	)
}
