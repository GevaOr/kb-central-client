import { IRegisterInputs, IUserData } from './../models/models';
import { auth, firebase } from "../firebase";
import { createNewUser } from './users.service';

const newUserData: IUserData = {
    isAdmin: false,
    personalArticles: [],
    favouriteArticles: [],
};

const fireLogin = (email: string, password: string): Promise<firebase.auth.UserCredential> => {
    return auth.signInWithEmailAndPassword(email, password);
};

const fireLogout = (): Promise<void> => {
    return auth.signOut();
};

const fireRegister = async (userDetails: IRegisterInputs) => {
    const originalUser = auth.currentUser
    const userData: IUserData = newUserData;
    userData.isAdmin = userDetails.isAdmin ? userDetails.isAdmin : false;
    await auth.createUserWithEmailAndPassword(userDetails.email, userDetails.password).then(async (cred) => {
        auth.currentUser?.updateProfile({
            displayName: constructDisplayName(userDetails.firstName, userDetails.lastName)
        })
        if (cred.user) {
            createNewUser(userData, cred.user.uid);
        }
        await auth.updateCurrentUser(originalUser)
    })
        .catch(err => console.log("Add User Error", err))
};

const constructDisplayName = (firstName: string, lastName: string | null = null): string => {
    let displayName: string = firstName.trim();
    if (lastName && lastName.length > 1) {
        displayName += ` ${lastName.trim()}`
    }
    return displayName;
};

export {
    fireLogin,
    fireLogout,
    fireRegister
};