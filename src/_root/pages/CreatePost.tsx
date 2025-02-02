// import PostForm from '@/components/forms/PostForm'
// import React from 'react'

// const CreatePost = () => {
//   return (
//     <div className='flex flex-1'>
//       <div className='common-container'>
//         <div className='max-w-5x1 flex-start gap-3justify-start w-full'>
//           <img src="/assets/icon/add-post.svg" width={36} height={36} alt="add" />
//           <h2 className='h3-bold md:h2-bold text-left w-full'>Create</h2>
//         </div>
//         <PostForm action='Create' />
//       </div>
//     </div> 
//   )
// }

// export default CreatePost

import PostForm from '@/components/forms/PostForm';
import React from 'react';

const CreatePost = () => {
  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
          <img src="/assets/icon/add-post.svg" width={36} height={36} alt="add" />
          <h2 className='h3-bold md:h2-bold text-left w-full'>Create</h2>
        </div>
        <PostForm action='Create' />
      </div>
    </div> 
  );
}

export default CreatePost;
