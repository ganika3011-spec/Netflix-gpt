import React from 'react'
import Header from './Header'
import { useState ,useRef} from 'react'
import { checkValidateData } from '../utils/Validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../utils/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();

  const [isSignIn, setIsSignIn] = useState(true); // State to toggle between Sign In and Sign Up forms
  const [errorMessage,setErrorMessage] = useState(null);
  
  const name= useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const ToggleSignInForm = () => {
    // Logic to toggle between Sign In and Sign Up forms
    // This can be implemented using state to conditionally render the appropriate form
    setIsSignIn(!isSignIn);
  }

  const handleButtonClick = async () => {
    try {
      // If user is on Sign Up form, validate name+email+password
      if (!isSignIn) {
        const messages = checkValidateData(name?.current?.value || '', email?.current?.value || '', password?.current?.value || '');
        setErrorMessage(messages);
        if (messages) return;

        // Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email.current.value, password.current.value);
        const user = userCredential.user;

        // Also write a user document to Firestore so user is added to DB
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          name: name?.current?.value || '',
          email: user.email,
          createdAt: serverTimestamp(),
        });

        console.log('User signed up and saved to Firestore:', user.uid);
        setErrorMessage(null);
        navigate('/browse'); // Navigate to browse after successful signup
        return;
      }

      // Sign In flow: validate email and password (no name required)
      if (!email?.current?.value || !password?.current?.value) {
        setErrorMessage('Please enter email and password.');
        return;
      }
      setErrorMessage(null);

      const userCredential = await signInWithEmailAndPassword(auth, email.current.value, password.current.value);
      console.log('User signed in:', userCredential.user);
      navigate('/browse'); // Navigate to browse after successful signin
    } catch (error) {
      console.error(error.code, error.message);
      setErrorMessage(error.message || 'Authentication error');
    }
  };
  return (
    <div className="">
      
        <Header showSignOut={false} />

      <div className="absolute inset-0">
      
        <img
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f562aaf4-5dbb-4603-a32b-6ef6c2230136/dh0w8qv-9d8ee6b2-b41a-4681-ab9b-8a227560dc75.jpg/v1/fill/w_1192,h_670,q_70,strp/the_netflix_login_background__canada__2024___by_logofeveryt_dh0w8qv-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6Ii9mL2Y1NjJhYWY0LTVkYmItNDYwMy1hMzJiLTZlZjZjMjIzMDEzNi9kaDB3OHF2LTlkOGVlNmIyLWI0MWEtNDY4MS1hYjliLThhMjI3NTYwZGM3NS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.FScrpAAFnKqBVKwe2syeiOww6mfH6avq-DRHZ_uFVNw"
          alt="backgroundImage"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Optional Dark Overlay (Netflix Look) */}
      <div className="absolute inset-0 bg-black bg-opacity-50 m-auto flex items-center justify-center rounded-lg">
        <form onSubmit={(e)=>e.preventDefault()} className='p-12 bg-black bg-opacity-50 rounded-md w-[380px]'>

          <h1 className='text-white text-3xl font-bold mb-8'>
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignIn && <input
          ref={name}
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-3 rounded mb-4 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          /> }
          <input
          ref={email}            type="text"
            placeholder="Email or phone number"
            className="w-full px-4 py-3 rounded mb-4 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          <input
          ref={password}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded mb-6 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <p className="text-red-500 font-bold">{errorMessage}</p>
          <button
            type="submit"
            className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition duration-300 "
          onClick={handleButtonClick}>
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>

          <p className="text-gray-400 text-sm mt-6">
            {isSignIn ? "New to Netflix?" : "Already have an account?"} 
            <span className="text-white cursor-pointer hover:underline ml-1" onClick={ToggleSignInForm}>
              {isSignIn ? "Sign up now" : "Sign in now"}
            </span>
          </p>

        </form>

      </div>
      
      

    </div>
      
);
};

export default Login;