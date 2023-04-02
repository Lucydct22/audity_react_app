import HelmetSEO from "@/views/utils/HelmetSEO";
import StudioBComponent from "@/views/components/basic/studioBComponent/StudioBComponent";

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