import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import ConfessionCard from '../components/ConfessionCard';
import { useAuth } from '../context/AuthContext';
import { UserCircleIcon, BookmarkIcon, DocumentTextIcon } from '@heroicons/react/24/solid';

const Profile = () => {
  const { user: authUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState(null);
  const [activeTab, setActiveTab] = useState('my_posts'); // 'my_posts' | 'saved'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/users/profile'); // Calls your new backend endpoint
        setProfileData(data);
      } catch (error) {
        console.error("Failed to load profile", error);
        // If 401, redirect to home
        if (error.response?.status === 401) navigate('/');
      } finally {
        setLoading(false);
      }
    };

    if (authUser) fetchProfile();
    else navigate('/');
  }, [authUser, navigate]);

  if (loading) return <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-gray-500">Loading Profile...</div>;
  if (!profileData) return null;

  const { user, myConfessions, savedConfessions } = profileData;

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-100 font-sans pt-24 pb-10 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Profile Header */}
        <div className="bg-[#242424] rounded-2xl p-8 border border-gray-800 flex flex-col md:flex-row items-center gap-6 mb-8 shadow-2xl">
          <img 
            src={user.avatar || "https://via.placeholder.com/150"} 
            alt="Avatar" 
            className="w-24 h-24 rounded-full border-4 border-purple-500/20 shadow-lg"
          />
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-bold text-white mb-1">{user.displayName}</h1>
            <p className="text-gray-400 text-sm mb-4">{user.email}</p>
            <div className="flex gap-3 justify-center md:justify-start">
              <span className="bg-purple-900/30 text-purple-400 px-3 py-1 rounded-full text-xs border border-purple-500/30 uppercase tracking-wide">
                {user.role}
              </span>
              <span className="bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full text-xs border border-blue-500/30">
                {myConfessions.length} Secrets
              </span>
            </div>
          </div>
          <button 
            onClick={logout}
            className="text-red-400 hover:bg-red-900/20 px-4 py-2 rounded-lg text-sm border border-red-900/30 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-800">
          <button 
            onClick={() => setActiveTab('my_posts')}
            className={`pb-3 flex items-center gap-2 px-4 transition-all relative ${
              activeTab === 'my_posts' ? 'text-purple-400' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <DocumentTextIcon className="w-5 h-5" />
            <span className="font-bold text-sm">My Confessions</span>
            {activeTab === 'my_posts' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
            )}
          </button>

          <button 
            onClick={() => setActiveTab('saved')}
            className={`pb-3 flex items-center gap-2 px-4 transition-all relative ${
              activeTab === 'saved' ? 'text-yellow-400' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <BookmarkIcon className="w-5 h-5" />
            <span className="font-bold text-sm">Saved Secrets</span>
            {activeTab === 'saved' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
            )}
          </button>
        </div>

        {/* Content Grid */}
        <div className="space-y-4">
          {activeTab === 'my_posts' ? (
            myConfessions.length > 0 ? (
              myConfessions.map(confession => (
                <ConfessionCard key={confession._id} confession={confession} refreshFeed={() => {}} />
              ))
            ) : (
              <div className="text-center py-20 text-gray-500">
                <p>You haven't whispered any secrets yet.</p>
              </div>
            )
          ) : (
            savedConfessions.length > 0 ? (
              savedConfessions.map(confession => (
                <ConfessionCard key={confession._id} confession={{...confession, isSaved: true}} refreshFeed={() => {}} />
              ))
            ) : (
              <div className="text-center py-20 text-gray-500">
                <p>No saved secrets. Look for the bookmark icon!</p>
              </div>
            )
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;