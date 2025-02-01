import {ID} from 'appwrite';
import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from './config';
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