import {ID} from 'appwrite';
import { INewPost, INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases, storage } from './config';
// import { Query } from '@tanstack/react-query';
import { Query } from 'appwrite';

export async function createUserAccount(user: INewUser){
    try{
        const newAccount = await account.create(
 
           ID.unique(),
            user.email,
            user.password,
            user.name
        );


        if(!newAccount) throw Error;

        
        // const avatarUrl = new URL(avatars.getInitials(user.name));
        const avatarUrl = avatars.getInitials(user.name);


        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            imageUrl: avatarUrl,
            username: user.username,
        })

        return newUser;

    } catch (error){
        console.log(error);
        return error;
    }
}

export async function saveUserToDB(
    user:{
    accountId: string;
    email: string;
    name: string;
    imageUrl: string;
    username?: string;
}) {
    
}


export async function signInAccount(user: {email: string; password: string;}){
    try {
        const session = await account.createEmailPasswordSession(user.email, user.password);

        return session;

    } catch (error) {
        console.log(error);
    }
}

export async function getCurrentUser(){
    try{
        const currentAccount = await account.get();

        if(!currentAccount) throw Error;

        const getCurrentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )


        if(!getCurrentUser) throw Error;

        return getCurrentUser.documents[0];

    } catch (error) {
        console.log(error)
    }
}


export async function signOutAccount(){
    try {
        const session = await account.deleteSession("current");

        return session;
    } catch (error) {
        console.log(error);
    }
}


export async function createPost(post: INewPost){
    try{
        
        const uploadedFile = await uploadFile(post.file[0])

        if(!uploadedFile) throw Error;

        // get file url
        const fileUrl = getFilePreview(uploadedFile.$id);

        if(!fileUrl) {
            deleteFile(uploadedFile.$id);
            throw Error;

        }

        // convert tags in array
        const tags = post.tags?.replace(/ /g, '').split(',') || [];

        // save post to database
        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            ID.unique(),{
                creator: post.userId,
                caption: post.caption,
                imageUrl: fileUrl,
                imageId: uploadedFile.$id,
                location: post.location,
                tags: tags

            }
        )
        if(!newPost) {
            await deleteFile(uploadedFile.$id)
            throw Error;
        }

        return newPost;
        
    } catch (error) {
        console.log(error);
    }
}

export async function uploadFile(file: File){
    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file
        );
        return uploadedFile;
    }catch (error) {
        console.log(error);
    }
}


export async function getFilePreview(fileId: string){
    try {
        const fileUrl = storage.getFilePreview(
            appwriteConfig.storageId, fileId, 2000, 2000, "top", 100,
        )
        return fileUrl;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteFile(fileid: string){
    try {
        await storage.deleteFile(appwriteConfig.storageId, fileid);
        return {status: "Success"}
    } catch (error){
        console.log(error);
    }
}


