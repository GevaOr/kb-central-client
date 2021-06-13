import { IArticle } from './../models/models';
import { firebase, db } from "../firebase";

const articles = db.ref("/articles");
const publicArticles = db.ref("/articles/public");
const internalArticles = db.ref("/articles/internal");

export const getArticleByPath = (path: string): Promise<firebase.database.DataSnapshot> => {
    return db.ref(path).get();
};

export const createNewArticleOnPath = (path: string, article: IArticle) => {
    return articles.child(path).push(article);
};

export const getPublicArticles = (): Promise<firebase.database.DataSnapshot> => {
    return publicArticles.get();
};

export const getInternalArticles = (): Promise<firebase.database.DataSnapshot> => {
    return internalArticles.get();
};

export const getUserPrivateArticles = (uid: string): Promise<firebase.database.DataSnapshot> => {
    const ref = db.ref(`/articles/private/${uid}`);
    return ref.get();
};

export const createNewPublicArticle = (article: IArticle) => {
    return publicArticles.push(article);
};

export const createNewInternalArticle = (article: IArticle) => {
    return internalArticles.push(article);
};

export const createNewPrivateArticle = (article: IArticle, uid: string): firebase.database.ThenableReference => {
    const ref = db.ref(`/articles/private/${uid}`);
    return ref.push(article);
};

// const update = (key: string, data: IArticle) => {
//     return db.child(key).update(data);
// };

// const remove = (key) => {
//     return db.child(key).remove();
// };

export const selfDestructArticles = () => {
    return articles.remove();
};

// export {
//     getarticleById,
//     createNewarticle,
//     selfDestructarticles
// }
// {

//     // create,
//     // update,
//     // remove,
//     // removeAll,
// };
