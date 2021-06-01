import { IUserData } from './../models/models';
import { db, firebase } from "../firebase";

const usersUrl: string = "/users";
const usersRef: firebase.database.Reference = db.ref(usersUrl);

export const getUserByKey = (key: string): Promise<firebase.database.DataSnapshot> => {
    return usersRef.child(key).get()
};

export const addArticleToFav = (articleId: string, uid: string): firebase.database.ThenableReference => {
    const userRef = db.ref(`${usersUrl}/${uid}/fav`)
    return userRef.push(articleId);
}

export const addArticleToPersonal = (articleId: string, uid: string): firebase.database.ThenableReference => {
    const userRef = db.ref(`${usersUrl}/${uid}/personal`)
    return userRef.push(articleId);
}

export const createNewUser = (userData: IUserData, uid: string): Promise<any> => {
    const userRef = db.ref(`${usersUrl}/${uid}`)
    return userRef.set(userData)
};