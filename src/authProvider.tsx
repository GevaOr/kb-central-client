import { useContext, useEffect, useState, createContext, FC } from 'react'
import { firebase } from './firebase';
import { IUserData } from './models/models';
import { fireLogout } from './services/auth.service';
import { getUserDataByKey } from './services/users.service';

interface IAuthContext {
    user: firebase.User | null;
    userData: IUserData | null;
    isLoading: boolean;
    logout: () => void;
}

const auth = firebase.auth()

const AuthContext = createContext<IAuthContext>({
    user: null,
    userData: null,
    isLoading: true,
    logout: () => { },
})

export const AuthProvider: FC = ({ children }) => {
    const [user, setUser] = useState<firebase.User | null>(null);
    const [userData, setUserData] = useState<IUserData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const cancelAuthListener = auth.onIdTokenChanged(async currentUser => {
            setUser(currentUser);
            if (currentUser) {
                await getUserDataByKey(currentUser.uid)
                    .then(data => {
                        setUserData(data.val())
                        return;
                    })
                    .catch(err => console.error(err))
            } else {
                setUserData(null)
            }
            setIsLoading(false);
        })
        return () => cancelAuthListener();
    })
    return (
        <AuthContext.Provider
            value={{ user, userData, isLoading, logout: () => fireLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(): IAuthContext {
    return useContext(AuthContext);
}