import { IArticle } from './../models/models';
import { firebase, db } from "../firebase";

const articles = db.ref("/articles");
const publicArticles = db.ref("/articles/public");
const internalArticles = db.ref("/articles/internal");

// const filterDataByQuery = (data: any, query: string) => {
//     const keys = Object.keys(data);
//     console.log(query, keys);
// return keys.map(key => {
//     const article = data[key];
//     const { title } = article
//     let children: Array<object | null> = []
//     if (article.children) {
//         children = Object.keys(article.children).map(key => {
//             const child = {
//                 [key]: article.children[key]
//             }
//             return child;
//         }
//         )
//     }
//     console.log(article);
// return (
//     <TreeItem onClick={() => toggleArticleView(key, article)} key={key} nodeId={key} label={
//         <TreeItemLabel addChild={(e) => console.log(e)} title={title} />
//     }>
//         {
//             (children.length) ?
//                 children.map((node: any) => renderTree(node))
//                 : null}
//     </TreeItem>
// ); 
// }

export const getAllArticlesByTitle = (query: string) => {
    articles
        .get()
        .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                for (let space in data) {
                    console.log(data[space]); //////////
                }
            } else {
                console.log("No luck...");

            }
        });
};

export const getPublicArticlesByTitle = (query: string) => {
    publicArticles
        .get()
        .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                console.log(data); ///////
            } else {
                console.log("No luck...");

            }
        });
};

export const getArticleByPath = (path: string): Promise<firebase.database.DataSnapshot> => {
    return db.ref(path).get();
};

export const createNewArticleOnPath = (path: string, article: IArticle) => {
    let currentRef = articles.child(path);
    const data = currentRef.push(article);
    const articlePath = `${path}/${data.key}`
    currentRef = db.ref(articlePath)
    return currentRef.update({
        location: articlePath,
        key: data.key,
        // data: data.get()
    })
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

export const createNewPrivateArticle = (article: IArticle, parent: string | null, uid: string) => {
    let path: string = `/articles/private/${uid}`;
    path = parent ? `${path}/${parent}/children` : path;
    let currentRef = db.ref(path);
    const data = currentRef.push(article);
    const articlePath = `${path}/${data.key}`
    currentRef = db.ref(articlePath)
    return currentRef.update({
        location: articlePath,
        key: data.key,
        // data: data.get()
    })
};

export const updateArticle = (data: { location: string, key: string }) => {
    const ref = db.ref(data.location);
    return ref.update(data);
};

// const remove = (key) => {
//     return db.child(key).remove();
// };

// export const selfDestructArticles = () => {
//     return articles.remove();
// };

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
