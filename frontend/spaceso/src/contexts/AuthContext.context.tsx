import { createContext } from 'react';
import { AuthContextType, initialAuthContext } from './AuthContext.types';

export const AuthContext = createContext<AuthContextType>(initialAuthContext);
