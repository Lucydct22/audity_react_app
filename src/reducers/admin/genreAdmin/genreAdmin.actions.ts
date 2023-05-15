import { message } from 'antd';
import * as GenreAdmin from './genreAdmin.types'
import * as api from 'api/music/genres';

export async function initGenresAction(dispatch: any) {
	try {
		const response: any = await api.getGenresApi()
		if (response.status === 200 || response.status === 201) {
			return dispatch({
				type: GenreAdmin.INIT_GENRES,
				payload: response.genres
			})
		} else {
			throw new Error()
		}
	} catch (err) {
		message.error('Server error')
	}
}

export async function postGenreAction(dispatch: any, data: any, token: any, messageApi: any) {
	try {
		const postGenre: any = await api.postGenreApi({ name: data.name }, token)
		const postGenreImage: any = await api.putGenreImageApi(postGenre.genre._id, data.image.file.originFileObj, token)
		if (postGenreImage.status === 200) {
			messageApi.destroy()
			messageApi.success(`Genre '${data.name}' created`)
			return dispatch({
				type: GenreAdmin.POST_GENRE,
				payload: postGenreImage.genre
			})
		} else {
			messageApi.destroy()
			messageApi.error('Server error')
		}
	} catch (err) {
		messageApi.destroy()
		message.error('Server error')
	}
}

export async function deleteGenreAction(dispatch: any, genre: any, token: any, genresState: any, messageApi: any) {
	try {
		const genreToDelete: any = await api.deleteGenreByIdApi(genre, token)
		if (genresState.genres.length > 0 || genreToDelete.status === 200) {
			const filteredGenres = genresState.genres.filter((item: any) => item._id !== genre._id)
			messageApi.destroy()
			message.success(`Genre deleted`)
			return dispatch({
				type: GenreAdmin.DELETE_GENRE,
				payload: filteredGenres
			})
		} else {
			messageApi.destroy()
			message.error('Server error')
		}
	} catch (err) {
		messageApi.destroy()
		message.error('Server error')
	}
}

export async function updateGenreAction(dispatch: any, data: any, genre: any, token: any, genresState: any, messageApi: any) {
	try {
		let newGenre;
		let imagePublicId = null
		if (data.image?.file.originFileObj) {
			const genreImageToUpdate = await api.putGenreImageApi(genre._id, data.image.file.originFileObj, token)
			newGenre = genreImageToUpdate
			imagePublicId = data.imagePublicId
		}
		if (data.name !== genre.name) {
			const genreToUpdate = await api.updateGenreApi(genre._id, { name: data.name, imagePublicId }, token)
			newGenre = genreToUpdate
		}
		const findIndexGenre = genresState.genres.findIndex((item: any) => item._id === genre._id)
		if (newGenre.genre) {
			genresState.genres[findIndexGenre] = newGenre.genre
		} else {
			if (data.name) genre.name = data.name
			genresState.genres[findIndexGenre] = genre
		}
		if (newGenre.status === 200) {
			messageApi.destroy()
			message.success(`Genre updated`)
			return dispatch({
				type: GenreAdmin.UPDATE_GENRE,
				payload: genresState
			})
		} else {
			messageApi.destroy()
			message.info(`Nothing to update`)
		}
	} catch (err) {
		messageApi.destroy()
		message.info('Server error')
	}
}