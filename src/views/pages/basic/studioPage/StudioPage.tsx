import HelmetSEO from "../../../utils/HelmetSEO";
import StudioBComponent from "../../../components/basic/studioBComponent/StudioBComponent";

function StudioPage() {
	return (
		<HelmetSEO
			title='Studio | Audity'
			description='Audity Studio Page'
		>
			<StudioBComponent />
		</HelmetSEO>
	)
}

export default StudioPage;