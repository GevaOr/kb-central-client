import { SpaceNames } from '../components/Workspace/TreeView/WorkspaceTreeView';
import { db, firebase } from '../firebase';
import { IArticle } from '../models/models';

const articles = db.ref("/articles");
const publicArticles = articles.child(SpaceNames.public);
const internalArticles = articles.child(SpaceNames.internal);

export type FlattenedArticleArr = Array<IArticle | null>

// SAVE ONLY SOME KEYS
// export type FlattenedArticleArr = Array<{
//     key: string, title: string, location: string
// } | null>

const getFlattenedObj = (currentObj: any) => {
    const flattenedArticleArr: FlattenedArticleArr = [];

    flattenArticles(currentObj, flattenedArticleArr);

    return flattenedArticleArr
}

const flattenArticles = (currentObj: IArticle | any, flattenedArticleArr: FlattenedArticleArr) => {
    Object.keys(currentObj).forEach((key) => {
        const articleData = currentObj[key];
        if (articleData.hasOwnProperty('children')) {
            flattenArticles(articleData.children, flattenedArticleArr)
        }
        flattenedArticleArr.push(articleData)

        // SAVE ONLY SOME KEYS
        // const { title, location } = articleData
        // flattenedArticleArr.push(
        //     {
        //         key: key,
        //         title: title,
        //         location: location
        //     }
        // )
    })
}

export const getAllArticlesByTitle = async (query: string, uid: string) => {
    const publicArticles = (await getPublicArticles()).val();
    const internalArticles = (await getInternalArticles()).val();
    const privateArticles = (await getUserPrivateArticles(uid)).val();
    const spaces: object[] = [publicArticles, internalArticles, privateArticles];
    const dataArr: FlattenedArticleArr = []
    for (const space of spaces) {
        dataArr.push(...getFlattenedObj(space))
    }
    return dataArr.filter(article => article?.title.toLowerCase().includes(query.toLowerCase()));
};


export const getPublicArticlesByTitle = async (query: string) => {
    const publicArticles = (await getPublicArticles()).val();
    const dataArr: FlattenedArticleArr = []
    dataArr.push(...getFlattenedObj(publicArticles))
    return dataArr.filter(article => article?.title.toLowerCase().includes(query.toLowerCase()));
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
