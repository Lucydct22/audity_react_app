import { useAuth0 } from "@auth0/auth0-react";
import UserContext from "context/user/UserContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

export const ProtectedUser = ({ children }: any) => {
  const { isAuthenticated } = useAuth0()
  const { dbUser } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [dbUser]);

  return children;

};