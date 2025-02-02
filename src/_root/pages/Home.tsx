// import { PostCard } from '@/components/shared';
// import { useGetRecentPosts } from '@/lib/react-query/queriesAndMutations'
// import { Models } from 'appwrite';
// import { Loader } from 'lucide-react'
// import React from 'react'

// const Home = () => {

//   const { data: posts, isPending: isPostLoading, isError: isErrorPosts} = useGetRecentPosts();

//   return (
//     <div className='flex flex-1 '>
//       <div className='Home-container'>
//         <div className='home-posts'>
//           <h2 className='h3-bold md:h2-bold text-left w-full'>Home Feed</h2>
//           {isPostLoading && !posts ?(
//             <Loader />
//           ) : (
//             <ul className='flex flex-col flex-1 gap-9 w-full'>
//               {posts?.documents.map((post: Models.Document) => (
//                 <PostCard post={post} key={post.caption}/>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Home

import { PostCard } from '@/components/shared';
import { useGetRecentPosts } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';
import { Loader } from 'lucide-react';
import React from 'react';

const Home = () => {
  const { data: posts, isPending: isPostLoading, isError: isErrorPosts } = useGetRecentPosts();

  return (
    <div className='flex flex-1'>
      <div className='Home-container'>
        <div className='home-posts'>
          <h2 className='h3-bold md:h2-bold text-left w-full'>Home Feed</h2>
          {isPostLoading ? (
            <div className="flex-center w-full h-full">
              <Loader />
            </div>
          ) : isErrorPosts ? (
            <p className="text-red-500 text-center">There was an error loading posts. Please try again.</p>
          ) : posts?.documents && posts.documents.length > 0 ? (
            <ul className='flex flex-col flex-1 gap-9 w-full'>
              {posts.documents.map((post: Models.Document) => (
                <PostCard post={post} key={post.$id} />
              ))}
            </ul>
          ) : (
            <p className="text-center w-full">No posts available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
