import { createContext, ReactNode, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { axiosForApiCall } from '@/lib/axios';
import { userActions, UserState } from '@/redux/user/userSlice';
import { SignInFormData, SignUpFormData } from '@/types/form';
import { User } from '@/types/user';

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
  updateSuccess,
} = userActions;

interface AuthContextValue {
  user: {
    isAuthenticated: boolean;
    isProccessing: boolean;
    data: User | null;
  };
  signUp: (userData: SignUpFormData) => Promise<void>;
  signIn: (credentials: SignInFormData) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (newData) => Promise<void>;
  updateUserPassword: (newPassword) => Promise<void>;
  deleteUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser, isAuthenticated, loading } = useSelector<
    RootState,
    UserState
  >((state) => state.user);

  const authContextValue = useMemo(() => {
    return {
      user: {
        isAuthenticated: isAuthenticated,
        isProccessing: loading,
        data: currentUser,
      },
      signUp: async (userData: SignUpFormData) => {
        dispatch(signUpStart());
        try {
          await axiosForApiCall.post('/auth/signup', userData);
          dispatch(signUpSuccess());
        } catch (err) {
          console.error(err);
          dispatch(signUpFailure(err));
          throw new Error('An error occured while signing up, please retry');
        }
      },
      signIn: async (credentials: SignInFormData) => {
        dispatch(signInStart());
        try {
          const response = await axiosForApiCall.post(
            '/auth/signin',
            credentials
          );
          dispatch(signInSuccess(response.data));
        } catch (err) {
          console.log(err);
          dispatch(signInFailure(err));
          throw new Error('An error occured while signing in, please retry');
        }
      },
      signOut: async () => {
        dispatch(signInStart());
        try {
          await axiosForApiCall.post('/auth/signout');
          dispatch(signOutSuccess());
        } catch (err) {
          console.log(err);
          dispatch(signOutFailure(err));
          throw new Error('An error occured while signing out, please retry');
        }
      },
      signInWithGoogle: async () => {},
      updateUserProfile: async (newData) => {
        dispatch(updateStart());
        try {
          const response = await axiosForApiCall.put('/user/update', newData);
          dispatch(updateSuccess({ ...currentUser, ...response.data }));
        } catch (err) {
          console.log(err);
          dispatch(updateFailure(err));
          throw new Error(
            'An error occured while updating user profile, please retry'
          );
        }
      },
      updateUserPassword: async (newPassword) => {
        dispatch(updateStart());
        try {
          await axiosForApiCall.put('/user/update-password', { newPassword });
          dispatch(updateSuccess(currentUser));
        } catch (err) {
          console.log(err);
          dispatch(updateFailure(err));
          throw new Error(
            'An error occured while updating your profile, please retry'
          );
        }
      },
      deleteUser: async () => {
        try {
          dispatch(updateStart());
          await axiosForApiCall.post('/user/delete');
          dispatch(updateSuccess(null));
        } catch (err) {
          console.log(err);
          dispatch(updateFailure(err));
          throw new Error(
            'An error occured while deleting your account, please retry'
          );
        }
      },
    };
  }, [currentUser, dispatch, isAuthenticated, loading]);

  useEffect(() => {
    const checkAuthState = async () => {
      dispatch(signInStart());
      try {
        const response = await axiosForApiCall.get('/auth/check');
        if (response.data) {
          dispatch(signInSuccess(response.data));
        } else {
          dispatch(signInFailure('No user found'));
          throw new Error('No user found');
        }
      } catch (err) {
        dispatch(signInFailure(err));
        throw new Error('No user found');
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
