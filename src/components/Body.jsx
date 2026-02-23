
import Login from './Login'
import Browse from './Browse'
import { createBrowserRouter } from "react-router-dom"
import { RouterProvider } from "react-router-dom";
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';   
import { useDispatch } from 'react-redux';
import { addUser,removeUser } from '../utils/userSlice';


const Body = () => {
    const dispatch = useDispatch();

    const appRouter = createBrowserRouter([
        {
            path: "/", 
            element: <Login />
        },
        {
            path:"/browse",
            element: <Browse />
        }
    ]);

    useEffect(() => {
        // Check if user is authenticated and dispatch to Redux
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // If user is authenticated, add to Redux store
                const { uid, email } = user;
                dispatch(addUser({ uid: uid, email: email }));
            } else {
                // If user is not authenticated, remove from Redux store
                dispatch(removeUser());
            }
        });
    }, [dispatch]);
        
    return (
        <>
            <RouterProvider router={appRouter} />
        </>
    );
}

export default Body