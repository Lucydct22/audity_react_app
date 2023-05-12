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
		console.log(err);
	}
}

export async function postGenreAction(dispatch: any, data: any, token: any, messageApi: any) {
	try {
		const postGenre: any = await api.postGenreApi({ name: data.name }, token)
		const postGenreImage: any = await api.postGenreImageApi(postGenre.genre._id, data.image.file.originFileObj, token)
		if (postGenreImage.status === 200) {
			message.success(`Genre '${data.name}' created`)
			messageApi.destroy
			return dispatch({
				type: GenreAdmin.POST_GENRE,
				payload: postGenreImage.genre
			})
		} else {
			message.success('Server error')
			messageApi.destroy
		}
	} catch (err) {
		console.log(err);
	}
}