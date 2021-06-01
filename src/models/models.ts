export interface IUserData {
    isAdmin: boolean;
    personalArticles: Array<string | null>;
    favouriteArticles: Array<string | null>;

}

export interface IArticle {
    key?: string | null; // objectId > article
    title: string;
    content: string; // html
    parent?: string;
    hasChildren: boolean; // ???
    // children: Array<string | null>; // objectId > article
    comments: Array<string | null>; // objectId > comment
    createdAt: Date; // or string?
    updatedAt: Date; // or string?
    level: number;
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
