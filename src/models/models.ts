export interface IUserData {
    isAdmin: boolean;
    personalArticles: Array<string | null>;
    favouriteArticles: Array<string | null>;

}

export interface IArticle {
    key: string;
    title: string;
    content: string;
    children?: object;
    creatorUID: string;
    location: string;
    comments: Array<IComment | null>;
    createdAt: Date; // or string?
    updatedAt: Date; // or string?
}

export interface IUserDetails {
    firstName: string
    lastName: string
    email: string
    password: string
}

// export interface IAccount {
//     key?: string | null; // objectId > account
//     owner: string; // objectId > user
//     name: string;
//     articles: {
//         external: Array<string | null>, // objectId > article
//         internal: Array<string | null>, // objectId > article
//     }; // objectId > user
// }

export interface IComment {
    key?: string; // objectId > comment
    author: string; // objectId > user
    content: string;
    createdAt: Date; // or string?
}

export interface ILoginInputs {
    email: string,
    password: string,
};

export interface IRegisterInputs {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    // passwordConfirm: string,
    // profilePicUrl: string,
};
