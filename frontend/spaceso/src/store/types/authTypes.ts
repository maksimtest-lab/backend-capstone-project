export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    // Add other user properties here if needed
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    error: string | null;
    loading: boolean;
}
