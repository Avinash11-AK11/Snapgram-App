import {Client, Account, Databases, Storage, Avatars} from 'appwrite'

export const appwriteConfig = {
    url: import.meta.env.VITE_APPWRITE_URL,
    projecteID: import.meta.env.VITE_APPWRITE_PROJECTID,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASEID_ID,
    storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
    postCollectionId: import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
    saved: import.meta.env.VITE_APPWRITE_SAVED_COLLECTION_ID,
}


export const client = new Client();

client.setProject(appwriteConfig.projecteID);
client.setEndpoint(appwriteConfig.url);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);