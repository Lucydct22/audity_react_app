import { useAuth0 } from "@auth0/auth0-react";
import UserContext from "context/user/UserContext";
import { useContext, useEffect } from "react";

export const ProtectedUserSettings = ({ children }: any) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0()
  const { dbUser } = useContext(UserContext)

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect()
    }
  }, [dbUser]);

    return children;

};