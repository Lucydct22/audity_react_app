import AlbumBComponent from "../../../components/basic/structureMainBComponent/albumBComponent/AlbumBComponent";
import HelmetSEO from "../../../utils/HelmetSEO";
import StructureMainBComponent from "../../../components/basic/structureMainBComponent/StructureMainBComponent";
import { Outlet } from "react-router-dom";
import { Translation } from "react-i18next";


const AlbumPage = () => {
	return (
		<HelmetSEO
			title='Album | Audity'
			description='Audity Album Page'
		>
			<StructureMainBComponent>
				<AlbumBComponent />
			</StructureMainBComponent>
		</HelmetSEO>
	)
}

export default AlbumPage;