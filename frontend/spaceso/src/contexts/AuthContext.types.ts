// import { User } from 'firebase/auth';

export interface AuthContextType {
  currentUser: null; //User | null;
  loading: boolean;
}

export const initialAuthContext: AuthContextType = {
  currentUser: null,
  loading: true
};
