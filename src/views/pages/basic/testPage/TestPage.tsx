import TestComponent from '../../../components/basic/structureMainBComponent/testComponent';
import HelmetSEO from '../../../utils/HelmetSEO';
import StructureMainBComponent from '../../../components/basic/structureMainBComponent';

const TestPage = () => {
  return (
    <HelmetSEO
      title='Test | Audity'
      description='Audity Test Page'
    >
      <StructureMainBComponent>
        <TestComponent />
      </StructureMainBComponent>
    </HelmetSEO>
  )
}

export default TestPage;