import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import ConfessionCard from '../components/ConfessionCard';
import PostModal from '../components/PostModal';

const Home = () => {
  const { user, login, logout } = useAuth();
  const [confessions, setConfessions] = useState([]);
  const [page, setPage] = useState(1);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [filter, setFilter] = useState('latest'); // latest | popular

  const fetchConfessions = async (reset = false) => {
    try {
      const p = reset ? 1 : page;
      const { data } = await api.get(`/confessions?page=${p}&sort=${filter}`);
      
      if (reset) {
        setConfessions(data.confessions);
        setPage(2);
      } else {
        setConfessions(prev => [...prev, ...data.confessions]);
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error("Failed to load feed", error);
    }
  };

  useEffect(() => {
    fetchConfessions(true);
  }, [filter]);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-100 font-sans">
      <Toaster position="bottom-center" toastOptions={{ style: { background: '#333', color: '#fff' } }} />
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full bg-[#1a1a1a]/90 backdrop-blur-md border-b border-gray-800 z-40">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            TeaTeller
          </h1>
          
          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* Confess Button */}
                <button 
                  onClick={() => setIsPostModalOpen(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors shadow-lg hover:shadow-purple-500/20"
                >
                  + Confess
                </button>

                {/* Profile Dropdown */}
                <div className="relative group cursor-pointer z-50">
                  <img 
                    src={user.avatar || "https://via.placeholder.com/32"} 
                    alt="User" 
                    className="w-9 h-9 rounded-full border border-gray-600 hover:border-purple-500 transition-colors object-cover" 
                  />
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-[#242424] rounded-xl shadow-2xl hidden group-hover:block border border-gray-700 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-700">
                      <p className="text-xs text-gray-400">Signed in as</p>
                      <p className="text-sm font-bold text-white truncate">{user.displayName}</p>
                    </div>
                    
                    <Link 
                      to="/profile" 
                      className="block px-4 py-3 text-sm text-gray-200 hover:bg-purple-900/30 hover:text-white transition-colors"
                    >
                      👤 My Profile
                    </Link>
                    
                    <button 
                      onClick={logout} 
                      className="block w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-900/20 transition-colors"
                    >
                      🚪 Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <button onClick={login} className="text-sm font-bold text-gray-300 hover:text-white transition-colors">
                Login with Google
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* --- MAIN FEED --- */}
      <main className="max-w-2xl mx-auto pt-24 px-4 pb-10">
        
        {/* Filters */}
        <div className="flex gap-6 mb-8 border-b border-gray-800">
          <button 
            onClick={() => setFilter('latest')}
            className={`pb-3 text-sm font-bold tracking-wide transition-all relative ${
              filter === 'latest' ? 'text-purple-400' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            LATEST
            {filter === 'latest' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></span>}
          </button>
          
          <button 
            onClick={() => setFilter('popular')}
            className={`pb-3 text-sm font-bold tracking-wide transition-all relative ${
              filter === 'popular' ? 'text-blue-400' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            POPULAR
            {filter === 'popular' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>}
          </button>
        </div>

        {/* Confession List */}
        <div className="space-y-6">
          {confessions.length > 0 ? (
            confessions.map((confession) => (
              <ConfessionCard 
                key={confession._id} 
                confession={confession} 
                refreshFeed={() => fetchConfessions(true)}
              />
            ))
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 mb-4">It's quiet... too quiet.</p>
              <button onClick={() => fetchConfessions(true)} className="text-purple-400 hover:text-purple-300 text-sm">Refresh Feed</button>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {confessions.length > 0 && (
          <div className="text-center mt-10">
            <button 
              onClick={() => fetchConfessions(false)}
              className="px-6 py-2 bg-[#242424] hover:bg-[#2a2a2a] text-gray-400 hover:text-white rounded-full text-sm border border-gray-800 transition-colors"
            >
              Load More Secrets
            </button>
          </div>
        )}
      </main>

      {/* --- POST MODAL --- */}
      {isPostModalOpen && (
        <PostModal 
          onClose={() => setIsPostModalOpen(false)} 
          refreshFeed={() => fetchConfessions(true)} 
        />
      )}
    </div>
  );
};

export default Home;