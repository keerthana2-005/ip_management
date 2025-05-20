import React from 'react';
import Navbar from '../components/Navbar';
import UserDetails from '../components/UserDetails';
import { User } from 'lucide-react';


const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-indigo-950">
      <Navbar />
      <UserDetails />
    </div>
    
  );
};

export default ProfilePage;
