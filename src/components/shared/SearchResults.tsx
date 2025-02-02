import { SearchResultProps } from '@/_root/pages/Explore'
import { Models } from 'appwrite';
import { Loader } from 'lucide-react';
import React from 'react'
import GridPostList from './GridPostList';
import { searchPosts } from '@/lib/appwrite/api';

type SearchResultProps = {
    isSEARCHFetching: boolean;
    searchedPosts: Models.Document[];
}

const SearchResults = ({isSEARCHFetching, searchedPosts}: SearchResultProps) => {
  if(isSEARCHFetching) return <Loader />

  if(searchPosts && searchedPosts.documents.length > 0) {
    return (
        <GridPostList posts={searchPosts.documents}/>
    )
  }

  return (
    <p className='text-light-4 mt-10 text-center w-full'>No result found</p>
  )
}

export default SearchResults;

// import { GridPostList, Loader } from "@/components/shared";
// import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";
// import { Document } from "appwrite"; // Ensure correct import of Document type

// const LikedPosts = () => {
//   const { data: currentUser, isLoading, isError } = useGetCurrentUser();

//   if (isLoading) {
//     return (
//       <div className="flex-center w-full h-full">
//         <Loader />
//       </div>
//     );
//   }

//   if (isError || !currentUser) {
//     return <p className="text-light-4">Failed to load user data. Please try again later.</p>;
//   }

//   // Ensure likedPosts is of type Document[] (array of Appwrite Document type)
//   const likedPosts: Document[] = Array.isArray(currentUser.liked)
//     ? currentUser.liked
//     : [];

//   return (
//     <>
//       {likedPosts.length === 0 ? (
//         <p className="text-light-4">You haven't liked any posts yet.</p>
//       ) : (
//         <GridPostList posts={likedPosts} showStats={false} />
//       )}
//     </>
//   );
// };

// export default LikedPosts;

