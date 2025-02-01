import {ID} from 'appwrite';
import { ImageGravity } from 'appwrite'; 
import { INewPost, INewUser, IUpdatePost, IUpdateUser } from "@/types";
import { account, appwriteConfig, avatars, databases, storage } from './config';
// import { Query } from '@tanstack/react-query';
import { Query } from 'appwrite';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../react-query/queryKeys';

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


export function getFilePreview(fileId: string){
    try {
        const fileUrl = storage.getFilePreview(
            appwriteConfig.storageId, fileId, 2000, 2000, ImageGravity.Top, 100
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


export async function getRecentPosts(){
    const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        [Query.orderDesc('$createdAt'), Query.limit(20)]
    )

    if(!posts) throw Error;

    return posts;
}

// ============================== LIKE / UNLIKE POST
export async function likePost(postId: string, likesArray: string[]) {
    try {
      const updatedPost = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        postId,
        {
          likes: likesArray,
        }
      );
  
      if (!updatedPost) throw Error;
  
      return updatedPost;
    } catch (error) {
      console.log(error);
    }
  }

  export async function savePost(userId: string, postId: string) {
    try {
      const updatedPost = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.savesCollectionId,
        ID.unique(),
        {
          user: userId,
          post: postId,
        }
      );
  
      if (!updatedPost) throw Error;
  
      return updatedPost;
    } catch (error) {
      console.log(error);
    }
  }

// ============================== DELETE SAVED POST
export async function deleteSavedPost(savedRecordId: string) {
    try {
      const statusCode = await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.savesCollectionId,
        savedRecordId
      );
  
      if (!statusCode) throw Error;
  
      return { status: "Ok" };
    } catch (error) {
      console.log(error);
    }
}
  
// ============================== GET USER'S POST
export async function getUserPosts(userId?: string) {
  if (!userId) return;
  
  try {
      const post = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.equal("creator", userId), Query.orderDesc("$createdAt")]
      );
  
      if (!post) throw Error;
  
      return post;
  } catch (error) {
      console.log(error);
  }
}

// ============================== GET POST BY ID
export async function getPostById(postId?: string) {
  if (!postId) throw Error;
  
  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    );
  
    if (!post) throw Error;

    return post;
  } catch (error) {
    console.log(error);
  }
}

// ============================== UPDATE POST
// export async function updatePost(post: IUpdatePost) {
//     const hasFileToUpdate = post.file.length > 0;
  
//     try {
//       let image = {
//         imageUrl: post.imageUrl,
//         imageId: post.imageId,
//       };
  
//       if (hasFileToUpdate) {
//         // Upload new file to appwrite storage
//         const uploadedFile = await uploadFile(post.file[0]);
//         if (!uploadedFile) throw Error;
  
//         // Get new file url
//         const fileUrl = getFilePreview(uploadedFile.$id);
//         if (!fileUrl) {
//           await deleteFile(uploadedFile.$id);
//           throw Error;
//         }

        
//         image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
//       }
  
//       // Convert tags into array
//       const tags = post.tags?.replace(/ /g, "").split(",") || [];
  
//       //  Update post
//       const updatedPost = await databases.updateDocument(
//         appwriteConfig.databaseId,
//         appwriteConfig.postCollectionId,
//         post.postId,
//         {
//           caption: post.caption,
//           imageUrl: image.imageUrl,
//           imageId: image.imageId,
//           location: post.location,
//           tags: tags,
//         }
//       );
  
//       // Failed to update
//       if (!updatedPost) {
//         // Delete new file that has been recently uploaded
//         if (hasFileToUpdate) {
//           await deleteFile(image.imageId);
//         }
  
//         // If no new file uploaded, just throw error
//         throw Error;
//       }
  
//       // Safely delete old file after successful update
//       if (hasFileToUpdate) {
//         await deleteFile(post.imageId);
//       }
  
//       return updatedPost;
//     } catch (error) {
//       console.log(error);
//     }
// }

// async function updatePost(post: IUpdatePost) {
//   const hasFileToUpdate = post.file.length > 0;

//   try {
//       let image = {
//           imageUrl: new URL(post.imageUrl), // Convert string to URL object
//           imageId: post.imageId,
//       };

//       if (hasFileToUpdate) {
//           // Upload new file to appwrite storage
//           const uploadedFile = await uploadFile(post.file[0]);
//           if (!uploadedFile) throw Error;

//           // Get new file url
//           const fileUrl = getFilePreview(uploadedFile.$id);
//           if (!fileUrl) {
//               await deleteFile(uploadedFile.$id);
//               throw Error;
//           }

//           // Update image object with new URL and ID
//           image = { ...image, imageUrl: new URL(fileUrl), imageId: uploadedFile.$id }; // Convert fileUrl to URL object
//       }

//       // Convert tags into array
//       const tags = post.tags?.replace(/ /g, "").split(",") || [];

//       // Update post
//       const updatedPost = await databases.updateDocument(
//           appwriteConfig.databaseId,
//           appwriteConfig.postCollectionId,
//           post.postId,
//           {
//               caption: post.caption,
//               imageUrl: image.imageUrl.toString(), // Convert URL object back to string for storage
//               imageId: image.imageId,
//               location: post.location,
//               tags: tags,
//           }
//       );

//       // Failed to update
//       if (!updatedPost) {
//           // Delete new file that has been recently uploaded
//           if (hasFileToUpdate) {
//               await deleteFile(image.imageId);
//           }

//           // If no new file uploaded, just throw error
//           throw Error;
//       }

//       // Safely delete old file after successful update
//       if (hasFileToUpdate) {
//           await deleteFile(post.imageId);
//       }

//       return updatedPost;
//   } catch (error) {
//       console.log(error);
//   }
// }

// ============================== DELETE POST
export async function deletePost(postId: string, imageId: string) {
    if (!postId || !imageId) throw Error;
  
    try {
        await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        postId
      );
  
      await deleteFile(imageId);
  
      return { status: "Ok" };
    } catch (error) {
      console.log(error);
    }
}

export async function getInfinitePosts({ pageParam }: { pageParam: number }) {
  const queries: any[] = [Query.orderDesc("$updatedAt"), Query.limit(10)];

  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam.toString()));
  }

  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      queries
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function updatePost(post: IUpdatePost) {
    const hasFileToUpdate = post.file.length > 0;

    try {
        let image = {
            imageUrl: new URL(post.imageUrl), // Convert string to URL object
            imageId: post.imageId,
        };

        if (hasFileToUpdate) {
            // Upload new file to appwrite storage
            const uploadedFile = await uploadFile(post.file[0]);
            if (!uploadedFile) throw Error;

            // Get new file url
            const fileUrl = getFilePreview(uploadedFile.$id);
            if (!fileUrl) {
                await deleteFile(uploadedFile.$id);
                throw Error;
            }

            // Update image object with new URL and ID
            image = { ...image, imageUrl: new URL(fileUrl), imageId: uploadedFile.$id }; // Convert fileUrl to URL object
        }

        // Convert tags into array
        const tags = post.tags?.replace(/ /g, "").split(",") || [];

        // Update post
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            post.postId,
            {
                caption: post.caption,
                imageUrl: image.imageUrl.toString(), // Convert URL object back to string for storage
                imageId: image.imageId,
                location: post.location,
                tags: tags,
            }
        );

        // Failed to update
        if (!updatedPost) {
            // Delete new file that has been recently uploaded
            if (hasFileToUpdate) {
                await deleteFile(image.imageId);
            }

            // If no new file uploaded, just throw error
            throw Error;
        }

        // Safely delete old file after successful update
        if (hasFileToUpdate) {
            await deleteFile(post.imageId);
        }

        return updatedPost;
    } catch (error) {
        console.log(error);
    }
}

// ============================== GET POSTS
export async function searchPosts(searchTerm: string) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.search("caption", searchTerm)]
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

// export const useGetPosts = () => {
//   return useInfiniteQuery({
//     queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
//     queryFn: getInfinitePosts,
//     getNextPageParam  : (lastPage) => {
//       if(lastPage && lastPage.documents.length === 0) return null;
  
//       const lastid = lastPage?.documents[lastPage?.documents.length - 1].$id;
  
//       return lastid;
//     }
//   })
// }

export const useSearchPosts = (searchTerm: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: () => searchPosts(searchTerm),
    enabled: !!searchTerm
  })
}

// ============================== GET ACCOUNT
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET USERS
export async function getUsers(limit?: number) {
  const queries: any[] = [Query.orderDesc("$createdAt")];

  if (limit) {
    queries.push(Query.limit(limit));
  }

  try {
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      queries
    );

    if (!users) throw Error;

    return users;
  } catch (error) {
    console.log(error);
  }
}


// ============================== GET USER BY ID
export async function getUserById(userId: string) {
  try {
    const user = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId
    );

    if (!user) throw Error;

    return user;
  } catch (error) {
    console.log(error);
  }
}

// ============================== UPDATE USER
export async function updateUser(user: IUpdateUser) {
  const hasFileToUpdate = user.file.length > 0;
  try {
    let image = {
      imageUrl: user.imageUrl,
      imageId: user.imageId,
    };

    if (hasFileToUpdate) {
      // Upload new file to appwrite storage
      const uploadedFile = await uploadFile(user.file[0]);
      if (!uploadedFile) throw Error;

      // Get new file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    //  Update user
    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      user.userId,
      {
        name: user.name,
        bio: user.bio,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
      }
    );

    // Failed to update
    if (!updatedUser) {
      // Delete new file that has been recently uploaded
      if (hasFileToUpdate) {
        await deleteFile(image.imageId);
      }
      // If no new file uploaded, just throw error
      throw Error;
    }

    // Safely delete old file after successful update
    if (user.imageId && hasFileToUpdate) {
      await deleteFile(user.imageId);
    }

    return updatedUser;
  } catch (error) {
    console.log(error);
  }
}