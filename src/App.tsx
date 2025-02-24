// import {Routes,Route} from 'react-router-dom';
// import './globals.css';
// import SigninForm from './_auth/forms/SigninForm';
// import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile } from './_root/pages';
// import SignupForm from './_auth/forms/SignupForm';
// import AuthLayout from './_auth/AuthLayout';
// import RootLayout from './_root/RootLayout';
// import { Toaster } from "@/components/ui/toaster"

// const App = () => {
//   return (
//     <main >
//       <Routes>
//         {/* public routes */}
//         <Route element={<AuthLayout />}>
//           <Route path='/sign-in' element={<SigninForm/>} />
//           <Route path='/sign-up' element={<SignupForm/>} />
//         </Route>
//         {/* private routes */}
//         <Route element={<RootLayout />}>
//           <Route path='/home' element={<Home />} /> 
//           <Route path="/explore" element={<Explore />}/>
//           <Route path="/saved" element={<Saved />}/>
//           <Route path="/all-users" element={<AllUsers />}/>
//           <Route path="/create-post" element={<CreatePost />}/>
//           <Route path="/update-post/:id" element={<EditPost />}/>
//           <Route path="/posts/:id" element={<PostDetails />}/>
//           <Route path="/posts/:id/*" element={<Profile />}/>
//           <Route path="/update-profile/:id" element={<UpdateProfile />}/>
//         </Route>
//       </Routes>
//       <Toaster />
//     </main>
//   )
// }
// export default App;

// // import React from 'react';

// // const App = () => {
// //   return <h1>Hello, React with Vite!</h1>;
// // };

// // export default App; // ✅ Ensure 'export default' exists

// // index in Home

import { Routes, Route, Navigate } from 'react-router-dom';
import './globals.css';
import SigninForm from './_auth/forms/SigninForm';
import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile } from './_root/pages';
import SignupForm from './_auth/forms/SignupForm';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <main>
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path='/sign-in' element={<SigninForm />} />
          <Route path='/sign-up' element={<SignupForm />} />
        </Route>
        
        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route path='/home' element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/saved' element={<Saved />} />
          <Route path='/all-users' element={<AllUsers />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:id' element={<EditPost />} />
          <Route path='/posts/:id' element={<PostDetails />} />
          <Route path='/posts/:id/*' element={<Profile />} />
          <Route path='/update-profile/:id' element={<UpdateProfile />} />
        </Route>
        
        {/* Redirect from root to /home */}
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
