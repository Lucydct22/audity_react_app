import HelmetSEO from "views/utils/HelmetSEO";
import ProfileComponent from "views/components/basic/profileComponent";


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

