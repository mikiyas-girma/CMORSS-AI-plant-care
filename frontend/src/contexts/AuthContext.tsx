import { createContext, ReactNode, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { axiosForApiCall } from "@/lib/axios";
import { userActions, UserState } from "@/redux/user/userSlice";
import { SignInFormData, SignUpFormData } from "@/types/form";
import { User } from "@/types/user";

const {
	signInFailure,
	signInStart,
	signInSuccess,
	signOutFailure,
	signOutSuccess,
	signUpFailure,
	signUpStart,
	signUpSuccess,
	updateFailure,
	updateStart,
	updateSuccess
} = userActions;

interface AuthContextValue {
	user: {
		isAuthenticated: boolean,
		data: User | null
	},
	signUp: (userData: SignUpFormData) => Promise<void>,
	signIn: (credentials: SignInFormData) => Promise<void>,
	signInWithGoogle: () => Promise<void>,
	signOut: () => Promise<void>,
	updateUserProfile: (newData) => Promise<void>,
	updateUserPassword: (newPassword) => Promise<void>,
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
			signUp: async (userData: SignUpFormData) => {
				dispatch(signUpStart());
				try {
					await axiosForApiCall.post('/auth/signup', userData);
					dispatch(signUpSuccess());
				} catch (err) {
					console.error(err);
					dispatch(signUpFailure(err));
				}
			},
			signIn: async (credentials: SignInFormData) => {
				dispatch(signInStart());
				try {
					const response = await axiosForApiCall.post('/auth/signin', credentials);
					dispatch(signInSuccess(response.data));
				} catch (err) {
					console.log(err)
					dispatch(signInFailure(err));
				}
			},
			signOut: async () => {
				dispatch(signInStart());
				try {
					await axiosForApiCall.post('/auth/signout');
					dispatch(signOutSuccess());
				} catch (err) {
					console.log(err)
					dispatch(signOutFailure(err));
				}
			},
			signInWithGoogle: async () => {
			},
			updateUserProfile: async (newData) => {
				dispatch(updateStart());
				try {
					const response = await axiosForApiCall.put('/user/update', newData);
					dispatch(updateSuccess(response.data));
				} catch (err) {
					console.log(err);
					dispatch(updateFailure(err));
				}
			},
			updateUserPassword: async (newPassword) => {
				dispatch(updateStart());
				try {
					await axiosForApiCall.put('/user/update-password', {newPassword});
					dispatch(updateSuccess(currentUser));
				} catch (err) {
					console.log(err);
					dispatch(updateFailure(err));
				}
			},
			deleteUser: async () => {
				try {
					dispatch(updateStart());
					await axiosForApiCall.post('/user/delete');
					dispatch(updateSuccess({}));
				} catch (err) {
					console.log(err)
					dispatch(updateFailure(err));
				}
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
