import { createContext, ReactNode } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}: {children: ReactNode}) => {
	return (
		<AuthContext.Provider value={}>
			{children}
		</AuthContext.Provider>
	);
}