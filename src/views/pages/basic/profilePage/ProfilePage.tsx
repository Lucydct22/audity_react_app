import HelmetSEO from "views/utils/HelmetSEO";
import ProfileComponent from "views/components/basic/profileComponent";
import Spinner from "views/UI/spinner/Spinner";
import { useAuth0 } from "@auth0/auth0-react";

const ProfilePage = () => {

  const { isAuthenticated } = useAuth0()

  return (
    <HelmetSEO
      title='My profile | Audity'
      description='Audity Profile Page'
    >
      {isAuthenticated ? <ProfileComponent /> : <Spinner />}

    </HelmetSEO>
  )
}

export default ProfilePage;

