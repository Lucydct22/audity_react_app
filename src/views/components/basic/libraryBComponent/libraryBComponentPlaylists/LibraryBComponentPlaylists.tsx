import SwiperLibraryPage from 'views/components/SwiperCarousel/carouselLibraryPage/SwiperLibraryPage';
import './libraryBComponentPlaylists.scss';
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from 'views/UI/spinner/Spinner';
import RenderPlaylist from '../../renders/renderPlaylist/RenderPlaylist';
import { responsiveBreak } from "utils/componentsConstants";
import useWindowSizeReport from "hooks/useWindowSizeReport";


const LibraryBComponentPlaylists = ({ playlists }: any) => {
	const { isLoading } = useAuth0()
	const [screenWidth] = useWindowSizeReport()

	if (isLoading) {
		return <Spinner />
	}
	return (
		<div className='library-playlists'>
			<SwiperLibraryPage data={"playlists"} />
		</div>
	);
}

export default LibraryBComponentPlaylists
