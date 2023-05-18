import { getTracksApi } from "api/music/tracks";
import makeArrayOfTrackIds from "utils/tracks/makeArrayOfTrackIds";
import shuffleArray from "utils/tracks/shuffleArray";
import * as CurrentTracklistReducer from './currentTracklistTypes';
import { getAlbumByIdApi } from "api/music/albums";
import { getArtistByIdApi } from "api/music/artists";
import { getPlaylistByIdApi } from "api/music/playlists";
import { getTrackByIdApi } from "api/music/tracks";

export const initCurrentTracklistAction = function (dispatch: any) {
  getTracksApi().then(async (tracksResponse: any) => {
    const tracklist = makeArrayOfTrackIds(tracksResponse.tracks);
    return dispatch({
      type: CurrentTracklistReducer.INIT_CURRENT_TRACKLIST,
      payload: {
        listType: 'all',
        listId: 'all-songs',
        listName: 'All songs',
        tracks: tracklist
      }
    })
  })
}

export const shuffleTracklistAction = async function (dispatch: any, tracklistState: any) {
  const orderedTracklist = function () {
    if (tracklistState.shuffle) {
      const sortTracks = tracklistState.tracks.sort(function (a: any, b: any) {
        if (a.name < b.name) { return -1 }
        if (a.name > b.name) { return 1 }
        return 0;
      });
      return sortTracks
    } else {
      const sortTracks = tracklistState.tracks.sort(function (a: any, b: any) {
        if (a.name > b.name) { return -1 }
        if (a.name < b.name) { return 1 }
        return 0;
      });
      return sortTracks
    }
  }  
  return dispatch({
    type: CurrentTracklistReducer.SHUFFLE_TRACKLIST,
    payload: { tracks: orderedTracklist() }
  })
}

export const selectAlbumAction = async function (dispatch: any, albumId: any) {
  const response: any = await getAlbumByIdApi(albumId)
  return dispatch({
    type: CurrentTracklistReducer.SELECT_CURRENT_TRACKLIST,
    payload: {
      listType: 'album',
      listId: response.album._id,
      listName: response.album.name,
      tracks: response.album.tracks
    }
  })
}

export const selectArtistAction = async function (dispatch: any, artistId: any) {
  const response: any = await getArtistByIdApi(artistId);
  return dispatch({
    type: CurrentTracklistReducer.SELECT_CURRENT_TRACKLIST,
    payload: {
      listType: "artist",
      listId: response.artist._id,
      listName: response.artist.name,
      tracks: response.artist.tracks,
    },
  });
}

export const selectPlaylistAction = async function (dispatch: any, playlistId: any) {
  const response: any = await getPlaylistByIdApi(playlistId);
  return dispatch({
    type: CurrentTracklistReducer.SELECT_CURRENT_TRACKLIST,
    payload: {
      listType: "playlist",
      listId: response.playlist._id,
      listName: response.playlist.name,
      tracks: response.playlist.tracks,
    },
  });
}

export const selectGenreAction = function (dispatch: any, genreId: any) {

}