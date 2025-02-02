// import { Outlet, Navigate } from "react-router-dom";

// const AuthLayout = () => {
//   const isAuthenticated = false;
//   return (
//     <>
//       {isAuthenticated ? (
//         <Navigate to="/" />
//       ):(
//         <>
//           <section className="flex flex-1 justify-center align-center flex-col py-10">
//             <Outlet />
//           </section>

//           <img src="/assets/images/side-img.jpg" alt="logo" className="hidden x1:block h-screen w-1/2 object-cover bg-no-repeat" />
//         </>
//       )
//     }
//     </>
//   )
// }

// export default AuthLayout

import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";  // Assuming you have this hook for user state

const AuthLayout = () => {
  const { isAuthenticated } = useUserContext();  // Get authentication status from context

  return (
    <>
      {isAuthenticated ? (
        // Redirect to home if the user is authenticated
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet /> {/* Renders the nested routes (SignIn/SignUp pages) */}
          </section>

          {/* Responsive image */}
          <img
            src="/assets/images/side-img.jpg"
            alt="side illustration"
            className="hidden lg:block h-screen w-1/2 object-cover bg-no-repeat"
          />
        </>
      )}
    </>
  );
};

export default AuthLayout;

