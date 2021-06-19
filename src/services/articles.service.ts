import { SpaceNames } from './../components/WorkspaceTreeView';
import { IArticle } from './../models/models';
import { firebase, db } from "../firebase";

const articles = db.ref("/articles");
const publicArticles = articles.child(SpaceNames.public);
const internalArticles = articles.child(SpaceNames.internal);

const flattenArticles = (data: any) => {
    const keys = Object.keys(data);
    const flatArticles = keys.map(key => {
        const article = data[key];
        // const { title, location } = article
        let children: Array<object | null> = []
        if (article.children) {
            children = Object.keys(article.children).map(childKey => {
                const child = {
                    [childKey]: article.children[childKey]
                }
                return child;
            }
            )
            children.map(childData => {
                return flattenArticles(childData)
            })
        }
        return ({
            [key]: article,
            ...children
        }
        )
    })
    console.log(flatArticles);
    return [];
}


//         }
//         console.log(article);
//         return (
//             <TreeItem onClick= {() => toggleArticleView(key, article)} key = { key } nodeId = { key } label = {
//         < TreeItemLabel addChild = {(e) => console.log(e)} title = { title } />
//     }>
//     {
//             (children.length) ?
//     children.map((node: any) => renderTree(node))
//     : null}
// </TreeItem>
// ); 
// }

export const getAllArticlesByTitle = async (query: string, uid: string) => {
    const publicArticles = (await getPublicArticles()).val();
    const internalArticles = (await getInternalArticles()).val();
    const privateArticles = (await getUserPrivateArticles(uid)).val();
    const spaces: object[] = [publicArticles, internalArticles, privateArticles];
    let allArticles: Array<object | null> = []
    for (const space of spaces) {
        if (space) {
            allArticles.push(...flattenArticles(space));
        }
    }
    console.log(allArticles);

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
    let currentRef = db.ref(path);
    const data = currentRef.push(article);
    if (data) {
        const key = data.key;
        const articlePath = `${path}/${key}`
        currentRef = db.ref(articlePath)
        return currentRef.update({
            location: articlePath,
            key: key,
            // data: data.get()
        })
    }
};

export const getPublicArticles = (): Promise<firebase.database.DataSnapshot> => {
    return publicArticles.get();
};

export const getInternalArticles = (): Promise<firebase.database.DataSnapshot> => {
    return internalArticles.get();
};

export const getUserPrivateArticles = (uid: string): Promise<firebase.database.DataSnapshot> => {
    const ref = db.ref(`/articles/${SpaceNames.private}/${uid}`);
    return ref.get();
};

// export const createNewPublicArticle = (article: IArticle) => {
//     return publicArticles.push(article);
// };

// export const createNewInternalArticle = (article: IArticle) => {
//     return internalArticles.push(article);
// };

export const createNewPrivateArticle = (article: IArticle, parent: string | null, uid: string) => {
    let path: string = `/articles/${SpaceNames.private}/${uid}`;
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

export const deleteArticleByPath = (path: string | null) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure?\nDeleting a document will also delete it\'s decendents!') && path) {
        return db.ref(path).remove();
    }
};

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
