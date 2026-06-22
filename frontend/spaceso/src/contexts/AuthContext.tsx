import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { onAuthStateChanged } from 'firebase/auth';
import { AppDispatch } from '../store';
// import { auth } from '../firebase_';
// import { getAuthState } from '../store/actions/actions';
import { AuthContextType } from './AuthContext.types';
import { AuthContext } from './AuthContext.context';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = null; //auth.currentUser;
  const loading = false; // We'll manage loading state through Redux

  useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, () => {
  //     dispatch(getAuthState());
  //   });

  //   // Cleanup subscription on unmount
  //   return () => {
  //     unsubscribe();
  //   };
  }, [dispatch]);

  const value: AuthContextType = {
    currentUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
