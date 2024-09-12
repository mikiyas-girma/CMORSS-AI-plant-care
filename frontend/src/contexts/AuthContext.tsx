import { createContext, ReactNode, useMemo, useState } from "react";

/* TODO: create authentification methods */
const defaultAuthContext = {
	user: {
		username: ''
	},
	signup: null,
	login: null,
	loginWithGoogle: null,
	logout: null,
	resetPassword: null,
	listenAuthStateChanged: null,
	updateUserProfile: null,
	updateUserPassword: null,
	deleteUser: null,
}

export const AuthContext = createContext<typeof defaultAuthContext>(defaultAuthContext);

export const AuthProvider = ({children}: {children: ReactNode}) => {
	const [user, setUser] = useState({
		username: 'JohnDoe',
	});

	const authContextValue = useMemo(() => {
		return {
			...defaultAuthContext,
			user: {...user},
		}
	}, [user]);

	return (
		<AuthContext.Provider value={authContextValue}>
			{children}
		</AuthContext.Provider>
	);
}