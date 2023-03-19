import HomeUserComponent from '../../../components/basic/testComponent/TestComponent';
import HelmetSEO from '../../../utils/HelmetSEO';

const TestPage = () => {
  return (
    <HelmetSEO 
      title='Test | Audity'
      description='Audity Test Page'
    >
      <HomeUserComponent />
    </HelmetSEO>
  )
}

export default TestPage;