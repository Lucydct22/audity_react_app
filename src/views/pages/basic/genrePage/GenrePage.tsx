import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGenreByIdApi } from 'api/music/genres';
import HelmetSEO from 'views/utils/HelmetSEO';
import GenreBComponent from 'views/components/basic/genreBComponent/GenreBComponent';

export default function GenrePage() {
	const { genreId } = useParams();
	const [genre, setGenre]: any = useState(undefined);

	useEffect(() => {
		let isMounted = true;
		genreId && getGenreByIdApi(genreId.toString()).then((res: any) => {
			console.log(genreId);
			isMounted && res && setGenre(res.genre);
			console.log(res);
		})
		return () => { isMounted = false }
	}, [genreId])
 
	return (
		<HelmetSEO
			title={`Genre | ${genre?.name}`}
			description='Audity Genre Page'
		>
			<GenreBComponent genre={genre}/>
		</HelmetSEO>
	)
} 