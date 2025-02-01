import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="#" />
      ):(
        <>
          <section className="flex flex-1 justify-center align-center flex-col py-10">
            <Outlet />
          </section>

          <img src="/assets/images/side-img.jpg" alt="logo" className="hidden x1:block h-screen w-1/2 object-cover bg-no-repeat" />
        </>
      )
    }
    </>
  )
}

export default AuthLayout
