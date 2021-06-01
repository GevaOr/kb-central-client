// import { IAccount } from '../models/models';
// import { db } from "../firebase";

// const accounts = db.ref("/accounts");

// const getAccountByKey = (key: string): Promise<IAccount> => {
//     return accounts
//         .child(key).get()
//         .then(data => {
//             let accountData = {
//                 key: data.key,
//                 ...data.val()
//             }
//             return accountData;
//         })
// };

// const createNewAccount = (account: IAccount) => {
//     return accounts.push(account);
// };

// const update = (key, data) => {
//     return db.child(key).update(data);
// };

// const remove = (key) => {
//     return db.child(key).remove();
// };

// const selfDestructAccounts = () => {
//     return accounts.remove();
// };

export {
    //     getAccountByKey,
    //     createNewAccount,
    //     selfDestructAccounts
}
// {

//     // create,
//     // update,
//     // remove,
//     // removeAll,
// };
