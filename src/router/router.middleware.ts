import { useAuth0 } from "@auth0/auth0-react";
import { getUserRole } from "api/user.api";
import UserContext from "context/user/UserContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedAdminRoute = ({ children }: any) => {
	const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
	const navigate = useNavigate()
	const { dbUser } = useContext(UserContext)
	
	useEffect(() => {
		let isMounted = true
		const userFetch = async () => {
			const token = await getAccessTokenSilently()
			const response = await getUserRole(token)
			if (response.userRole !== 'admin' || !isAuthenticated || !user) {
				navigate('/')
			}
		}
		userFetch()
		return () => { isMounted = false }
	}, [dbUser, isAuthenticated, user])
	return children;
};