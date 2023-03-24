import HelmetSEO from "../../../utils/HelmetSEO";
import StructureMainBComponent from "../../../components/basic/structureMainBComponent/StructureMainBComponent";
import StudioBComponent from "../../../components/basic/studioBComponent/StudioBComponent";

function StudioPage() {
  return (
    <HelmetSEO
			title='Studio | Audity'
			description='Audity Studio Page'
		>
			<StructureMainBComponent>
				<StudioBComponent />
			</StructureMainBComponent>
		</HelmetSEO>
  )
}

export default StudioPage;