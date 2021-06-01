import { useContext, useEffect, useState, createContext, FC } from 'react'
import { firebase } from './firebase';
import { fireLogout } from './services/auth.service';

interface IContext {
    user: firebase.User | null;
    isLoading: boolean;
    logout: () => void;
}

const auth = firebase.auth()

const AuthContext = createContext<IContext>({
    user: null,
    isLoading: true,
    logout: () => { },
})

export const AuthProvider: FC = ({ children }) => {
    const [user, setUser] = useState<firebase.User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const cancelAuthListener = auth.onIdTokenChanged(currentUser => {
            setUser(currentUser);
            setIsLoading(false);
        })
        return () => cancelAuthListener();
    })
    return (
        <AuthContext.Provider
            value={{ user, isLoading: isLoading, logout: () => fireLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(): IContext {
    return useContext(AuthContext);
}