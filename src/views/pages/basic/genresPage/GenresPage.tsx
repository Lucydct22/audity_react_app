import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { getGenresApi } from 'api/music/genres';
import GenresBComponent from 'views/components/basic/genresBComponent/GenresBComponent'
import HelmetSEO from "views/utils/HelmetSEO";

const GenresPage = ({ }) => {
	const [genres, setGenres] = useState([]);
	const params: any = useParams();

	useEffect(() => {
		const getGenres = async () => {
			const response: any = await getGenresApi() 
			// console.log(response);
			
			setGenres(response.genres)
		}
		getGenres()
	}, [])

	return (
		isNaN(parseInt(params.genreId)) ? (
			<HelmetSEO
				title='Genres | Audity'
				description={`Audity | Genres`}
			>
				<GenresBComponent genres={genres} />
			</HelmetSEO >
		) : (
			<Outlet />
		)
	)
}

export default GenresPage;