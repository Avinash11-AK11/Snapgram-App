import { getCurrentUser } from '@/lib/appwrite/api';
import { IContextType, IUser } from '@/types';
import React, {createContext, useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';


export const INITIAL_USER = {
    id: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '',
    bio: '',
};

// for lot of user. 
const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean,
}

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<IUser>(INITIAL_USER)
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate();

    const checkAuthUser = async () => {
        try {
            const currentAccount = await getCurrentUser();


            if(currentAccount){
                setUser({
                    id: currentAccount.$id,
                    name: currentAccount.name,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    imageUrl: currentAccount.imageUrl,
                    bio: currentAccount.bio
                })

                setIsAuthenticated(true);

                return true;
            }
            return false;

        } catch (error) {
            console.log(error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(()=>{
        if(
            localStorage.getItem('cookieFallback') === '[]' ||
            localStorage.getItem('cookieFallback') === null
        ) navigate('/sign-in')

        checkAuthUser();
    },[]);


    const value = {user, setUser, isLoading, isAuthenticated, setIsAuthenticated, checkAuthUser}

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useUserContext = () => useContext(AuthContext);

// import { getCurrentUser } from '@/lib/appwrite/api';
// import { IContextType, IUser } from '@/types';
// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export const INITIAL_USER: IUser = {
//   id: '',
//   name: '',
//   username: '',
//   email: '',
//   imageUrl: '',
//   bio: '',
// };

// const INITIAL_STATE = {
//   user: INITIAL_USER,
//   isLoading: false,
//   isAuthenticated: false,
//   setUser: () => {},
//   setIsAuthenticated: () => {},
//   checkAuthUser: async () => false,
// };

// const AuthContext = createContext<IContextType>(INITIAL_STATE);

// const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<IUser>(INITIAL_USER);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const navigate = useNavigate();

//   const checkAuthUser = async () => {
//     try {
//       const currentAccount = await getCurrentUser();
//       if (currentAccount) {
//         setUser({
//           id: currentAccount.$id,
//           name: currentAccount.name,
//           username: currentAccount.username,
//           email: currentAccount.email,
//           imageUrl: currentAccount.imageUrl,
//           bio: currentAccount.bio,
//         });
//         setIsAuthenticated(true);
//         navigate('/dashboard'); // Redirect to dashboard after successful authentication
//       } else {
//         setIsAuthenticated(false);
//       }
//     } catch (error) {
//       setError("Failed to authenticate. Please try again.");
//       console.log(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     setIsLoading(true); // Start loading when checking auth
//     if (
//       localStorage.getItem('cookieFallback') === '[]' ||
//       localStorage.getItem('cookieFallback') === null
//     ) {
//       navigate('/sign-in');
//     }

//     checkAuthUser();
//   }, []);

//   const value = { user, setUser, isLoading, isAuthenticated, setIsAuthenticated, checkAuthUser, error };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//       {error && <div className="error-message">{error}</div>} {/* Error Message */}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;

// export const useUserContext = () => useContext(AuthContext);
