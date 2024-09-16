import { createContext, ReactNode, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, persistor, RootState } from '@/redux/store';
import { axiosForApiCall } from '@/lib/axios';
import { userActions, UserState } from '@/redux/user/userSlice';
import { SignInFormData, SignUpFormData } from '@/types/form';
import { User } from '@/types/user';

const {
  signInFailure,
  signInStart,
  signInSuccess,
  signOutFailure,
  signOutStart,
  signOutSuccess,
  signUpFailure,
  signUpStart,
  signUpSuccess,
  updateSuccess,
} = userActions;

interface AuthContextValue {
  user: {
    isAuthenticated: boolean;
    isProcessing: boolean;
    processFail: boolean;
    data: User | null;
  };
  signUp: (userData: SignUpFormData) => Promise<void>;
  signIn: (credentials: SignInFormData) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (newData) => Promise<void>;
  updateUserPassword: (newPassword) => Promise<void>;
  deleteUser: () => Promise<void>;
  saveLocation: (lat: number, lng: number) => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser, isAuthenticated, loading, error } = useSelector<
    RootState,
    UserState
  >((state) => state.user);

  const authContextValue = useMemo(() => {
    return {
      user: {
        isAuthenticated: isAuthenticated,
        isProcessing: loading,
        processFail: !!error,
        data: isAuthenticated ? currentUser : null,
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
        dispatch(signOutStart());
        try {
          await axiosForApiCall.post('/auth/logout');
          dispatch(signOutSuccess());
          persistor.purge();
        } catch (err) {
          console.log(err);
          dispatch(signOutFailure(err));
          throw new Error('An error occured while signing out, please retry');
        }
      },
      signInWithGoogle: async () => {},
      updateUserProfile: async (newData) => {
        try {
          const response = await axiosForApiCall.put('/user/update-profile', {
            id: currentUser?.id,
            ...newData
          });
          dispatch(updateSuccess({ ...currentUser, ...response.data }));
        } catch (err) {
          console.log(err);
          throw new Error(
            'An error occured while updating user profile, please retry'
          );
        }
      },
      updateUserPassword: async (passwords) => {
        try {
          await axiosForApiCall.put('/user/update-password', {
            id: currentUser?.id,
            ...passwords
          });
          dispatch(updateSuccess(currentUser));
        } catch (err) {
          console.log(err);
          throw new Error(
            'An error occured while updating your profile, please retry'
          );
        }
      },
      deleteUser: async () => {
        try {
        //   dispatch(updateStart());
          await axiosForApiCall.post('/user/delete');
          dispatch(updateSuccess(null));
          persistor.purge();
        } catch (err) {
          console.log(err);
        //   dispatch(updateFailure(err));
          throw new Error(
            'An error occured while deleting your account, please retry'
          );
        }
      },
      saveLocation: async (lat: number, lng: number) => {
        try {
          await axiosForApiCall.post('/user/save-location', { lat, lng });
          console.log( lat, lng);
        } catch (err) {
          console.log(err);
          throw new Error('An error occurred while saving your location, please retry');
        }
      },      
    };
  }, [currentUser, dispatch, isAuthenticated, loading, error]);

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
