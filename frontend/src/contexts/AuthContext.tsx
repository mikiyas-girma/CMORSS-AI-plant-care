import { createContext, ReactNode, useEffect, useMemo } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { signInFailure, signInStart, signInSuccess, UserState } from "@/redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { axiosForApiCall } from "@/lib/axios";

/* TODO: create authentification methods */
interface AuthContextValue {
	user: {
		isAuthenticated: boolean,
		data: object | null
	},
	signup: (userData) => Promise<void>,
	login: (credentials) => Promise<void>,
	loginWithGoogle: () => Promise<void>,
	logout: () => Promise<void>,
	resetPassword: () => Promise<void>,
	listenAuthStateChanged: () => Promise<void>,
	updateUserProfile: () => Promise<void>,
	updateUserPassword: () => Promise<void>,
	deleteUser: () => Promise<void>,
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({children}: {children: ReactNode}) => {
	const dispatch = useDispatch<AppDispatch>();
  	const { currentUser, isAuthenticated } = useSelector<RootState, UserState>(state => state.user);

	const authContextValue = useMemo(() => {
		return {
			user: {
				isAuthenticated: isAuthenticated,
				data: currentUser
			},
			signup: async (userData) => {
				try {
					await axiosForApiCall.post('/auth/signup', userData);
				} catch (err) {
					console.error(err);
				}
			},
			login: async (credentials) => {
				dispatch(signInStart());
				try {
					const response = await axiosForApiCall.post('/auth/login', credentials);
					dispatch(signInSuccess(response.data));
				} catch (err) {
					dispatch(signInFailure(err));
				}
			},
			logout: async () => {
			},
			loginWithGoogle: async () => {
			},
			resetPassword: async () => {
			},
			listenAuthStateChanged: async () => {
			},
			updateUserProfile: async () => {
			},
			updateUserPassword: async () => {
			},
			deleteUser: async () => {
			},
		};
	}, [currentUser, dispatch, isAuthenticated]);

	useEffect(() => {
		const checkAuthState = async () => {
			dispatch(signInStart());
			try {
				const response = await axiosForApiCall.get('/auth/check');
				if (response.data) {
					dispatch(signInSuccess(response.data));
				} else {
					dispatch(signInFailure('No user found'));
				}
			} catch (err) {
				dispatch(signInFailure(err));
			}
		};

		checkAuthState();
	}, [dispatch]);


  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
