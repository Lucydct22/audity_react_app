import HelmetSEO from "../../../utils/HelmetSEO";
import ProfileComponent from "../../../components/basic/profileComponent/ProfileComponent";


const ProfilePage = () => {
  return (
    <HelmetSEO
      title='Music | Audity'
      description='Audity Profile Page'
    >   
  
    <ProfileComponent />
    </HelmetSEO>
  )
}

export default ProfilePage;

