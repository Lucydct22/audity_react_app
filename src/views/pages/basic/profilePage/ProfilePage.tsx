import HelmetSEO from "views/utils/HelmetSEO";
import ProfileComponent from "views/components/basic/profileComponent";


const ProfilePage = () => {
  return (
    <HelmetSEO
      title='My profile | Audity'
      description='Audity Profile Page'
    >

      <ProfileComponent />
    </HelmetSEO>
  )
}

export default ProfilePage;

