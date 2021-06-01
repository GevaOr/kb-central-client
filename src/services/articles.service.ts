import { IArticle } from './../models/models';
import { db } from "../firebase";

const articles = db.ref("/articles");

export const getArticleByKey = (key: string) => {
    return articles.child(key).get()
};

export const createNewArticle = (article: IArticle) => {
    return articles.push(article);
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
