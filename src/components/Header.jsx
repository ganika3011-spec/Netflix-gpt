import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from '../utils/userSlice';

const Header = ({ showSignOut = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleSignOut = () => {
    // Sign out user from Firebase Auth
    signOut(auth).then(() => {
      dispatch(removeUser()); // Remove user from Redux store
      navigate('/'); // Redirect to login page after sign out
    }).catch((error) => {
      console.error('Error signing out:', error);
      dispatch(removeUser()); // Remove user from Redux store even if there's an error
      navigate('/');
    });
  }
  return (
    <div className="px-8 py-2 bg-gradient-to-b from-black relative z-20 flex justify-between items-center">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix Logo"
        className="w-60"
      />
      {showSignOut && (
        <div className="flex items-center gap-4">
          <img src="https://wallpapers.com/images/thumbnail/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg" alt="User Icon" className="w-8 h-8 rounded" />
          <button onClick={handleSignOut} className="px-4 py-1 bg-red-600 text-white rounded font-semibold hover:bg-red-700 transition">Sign Out</button>
        </div>
      )}
    </div>
  )
}

export default Header