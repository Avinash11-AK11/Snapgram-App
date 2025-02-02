// import { GridPostList, Loader } from "@/components/shared";
// import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";

// const LikedPosts = () => {
//   const { data: currentUser } = useGetCurrentUser();

//   if (!currentUser)
//     return (
//       <div className="flex-center w-full h-full">
//         <Loader />
//       </div>
//     );

//   return (
//     <>
//       {currentUser.liked.length === 0 && (
//         <p className="text-light-4">No liked posts</p>
//       )}

//       <GridPostList posts={currentUser.liked} showStats={false} />
//     </>
//   );
// };

// export default LikedPosts;

import { GridPostList, Loader } from "@/components/shared";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";

const LikedPosts = () => {
  const { data: currentUser, isLoading, isError } = useGetCurrentUser();

  // Show loading spinner if the data is loading
  if (isLoading) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  // Show error message if data loading failed
  if (isError || !currentUser) {
    return (
      <p className="text-light-4">
        Failed to load user data. Please try again later.
      </p>
    );
  }

  // Ensure currentUser.liked is an array before rendering
  const likedPosts = Array.isArray(currentUser.liked)
    ? currentUser.liked
    : [];

  return (
    <>
      {likedPosts.length === 0 ? (
        <p className="text-light-4">You haven't liked any posts yet.</p>
      ) : (
        <GridPostList posts={likedPosts} showStats={false} />
      )}
    </>
  );
};

export default LikedPosts;
