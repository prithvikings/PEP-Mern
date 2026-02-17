import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'react-hot-toast';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  ChatBubbleBottomCenterTextIcon, 
  EllipsisHorizontalIcon,
  BookmarkIcon 
} from '@heroicons/react/24/solid';
import { BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline';

const ConfessionCard = ({ confession, refreshFeed }) => {
  const { user } = useAuth();
  
  // --- STATE: VOTING ---
  // Default to 0/null if backend doesn't send these fields yet
  const [score, setScore] = useState(confession.score || 0);
  const [userVote, setUserVote] = useState(confession.userVote || null); // 'up' | 'down' | null

  // --- STATE: SAVING ---
  const [isSaved, setIsSaved] = useState(confession.isSaved || false);

  // --- STATE: MENU & SECURITY ---
  const [menuOpen, setMenuOpen] = useState(false);
  const [verificationMode, setVerificationMode] = useState(null); // 'edit' | 'delete' | null
  const [secretCode, setSecretCode] = useState('');
  const [editText, setEditText] = useState(confession.text);

  const isAuthor = user && user._id === confession.author;

  // --- HANDLER: VOTING (Optimistic) ---
  const handleVote = async (type) => {
    if (!user) return toast.error("Login to vote!");

    // 1. Calculate Optimistic State
    let newScore = score;
    let newVote = type;

    if (userVote === type) {
      // Toggle OFF (Remove vote)
      newScore = type === 'up' ? score - 1 : score + 1;
      newVote = null;
    } else if (userVote === null) {
      // New Vote (Neutral -> Vote)
      newScore = type === 'up' ? score + 1 : score - 1;
    } else {
      // Switch Vote (Up -> Down OR Down -> Up)
      newScore = type === 'up' ? score + 2 : score - 2;
    }

    // 2. Apply State Immediately
    setScore(newScore);
    setUserVote(newVote);

    // 3. API Call
    try {
      await api.post(`/confessions/${confession._id}/vote`, { type });
    } catch (error) {
      // Revert on Failure
      setScore(score);
      setUserVote(userVote);
      toast.error("Vote failed");
      console.error("Voting error:", error);
    }
  };

  // --- HANDLER: SAVING (Optimistic) ---
  const handleSave = async () => {
    if (!user) return toast.error("Login to save secrets!");
    
    const previousState = isSaved;
    setIsSaved(!isSaved);

    try {
      await api.post(`/users/save/${confession._id}`);
      toast.success(!previousState ? "Saved to Profile" : "Removed from Saved");
    } catch (error) {
      setIsSaved(previousState);
      toast.error("Failed to save");
      console.error("Saving error:", error);
    }
  };

  // --- HANDLER: VERIFY & EXECUTE (Edit/Delete) ---
  const handleVerifyAndExecute = async () => {
    if (secretCode.length < 4) return toast.error("Code must be 4 digits");

    try {
      if (verificationMode === 'delete') {
        await api.delete(`/confessions/${confession._id}`, { data: { secretCode } });
        toast.success("Confession buried.");
        refreshFeed();
      } else if (verificationMode === 'edit') {
        await api.put(`/confessions/${confession._id}`, { text: editText, secretCode });
        toast.success("Confession updated.");
        refreshFeed();
      }
      setVerificationMode(null);
      setSecretCode('');
    } catch (error) {
      const msg = error.response?.status === 401 ? "Invalid Secret Code!" : "Action failed";
      toast.error(msg);
    }
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#242424] rounded-r-xl rounded-l-md shadow-lg border border-gray-800 flex overflow-hidden group relative mb-6"
    >
      {/* --- LEFT SIDEBAR: VOTING --- */}
      <div className="bg-[#1f1f1f] w-12 flex flex-col items-center py-4 gap-1 border-r border-gray-800">
        <button 
          onClick={() => handleVote('up')}
          className={`p-1 rounded hover:bg-gray-800 transition-colors ${userVote === 'up' ? 'text-orange-500' : 'text-gray-500'}`}
        >
          <ArrowUpIcon className="w-6 h-6" />
        </button>
        
        <span className={`text-sm font-bold ${userVote === 'up' ? 'text-orange-500' : userVote === 'down' ? 'text-blue-500' : 'text-gray-300'}`}>
          {score}
        </span>

        <button 
          onClick={() => handleVote('down')}
          className={`p-1 rounded hover:bg-gray-800 transition-colors ${userVote === 'down' ? 'text-blue-500' : 'text-gray-500'}`}
        >
          <ArrowDownIcon className="w-6 h-6" />
        </button>
      </div>

      {/* --- RIGHT SIDE: CONTENT --- */}
      <div className="flex-1 p-4 relative">
        
        {/* HEADER */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <span className="text-neon-purple font-bold text-sm tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              {confession.alias}
            </span>
            <span className="text-xs text-gray-600">•</span>
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(confession.createdAt))} ago
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Save Button */}
            <button onClick={handleSave} className="text-gray-500 hover:text-yellow-400 transition-colors" title="Save">
              {isSaved ? <BookmarkIcon className="w-5 h-5 text-yellow-500" /> : <BookmarkOutline className="w-5 h-5" />}
            </button>

            {/* Context Menu */}
            <div className="relative">
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-500 hover:text-white transition-colors">
                <EllipsisHorizontalIcon className="w-6 h-6" />
              </button>
              
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-xl z-10 py-1 overflow-hidden">
                  <button 
                    onClick={() => { toast.success("Reported"); setMenuOpen(false); }}
                    className="block w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-gray-800 transition-colors"
                  >
                    Report
                  </button>
                  {isAuthor && (
                    <>
                      <div className="h-px bg-gray-700 my-1"></div>
                      <button onClick={() => { setVerificationMode('edit'); setMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-xs text-blue-400 hover:bg-gray-800 transition-colors">Edit</button>
                      <button onClick={() => { setVerificationMode('delete'); setMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-gray-800 transition-colors">Delete</button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="mb-4">
          <p className="text-gray-200 text-base leading-relaxed whitespace-pre-wrap font-light">
            {confession.text}
          </p>
        </div>

        {/* FOOTER (Tags & Comments) */}
        <div className="flex items-center justify-between border-t border-gray-800 pt-3">
          <div className="flex flex-wrap gap-2">
            {confession.tags.map(tag => (
              <span key={tag} className="text-[10px] uppercase tracking-wider bg-[#1a1a1a] text-gray-500 px-2 py-1 rounded border border-gray-800">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center gap-1 text-gray-600 text-xs hover:text-gray-400 cursor-pointer transition-colors">
            <ChatBubbleBottomCenterTextIcon className="w-4 h-4" />
            <span>Comments</span>
          </div>
        </div>

        {/* --- SECURITY OVERLAY (Inline Modal) --- */}
        <AnimatePresence>
          {verificationMode && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 bg-[#242424]/95 flex flex-col items-center justify-center p-6 z-20 backdrop-blur-sm rounded-r-xl"
            >
              <h4 className="text-white font-bold mb-1 tracking-wide">
                {verificationMode === 'delete' ? 'VERIFY DELETION' : 'VERIFY EDIT'}
              </h4>
              <p className="text-[10px] text-gray-400 mb-4 text-center uppercase tracking-widest">
                Enter your 4-digit secret code
              </p>
              
              {verificationMode === 'edit' && (
                <textarea 
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full bg-[#1a1a1a] text-white p-2 rounded mb-3 text-sm border border-gray-700 focus:border-purple-500 outline-none resize-none"
                  rows="3"
                />
              )}

              <input 
                type="password"
                maxLength="4"
                placeholder="••••"
                className="bg-[#1a1a1a] text-center text-white text-xl tracking-[0.5em] w-32 p-2 rounded border border-gray-700 focus:border-red-500 outline-none mb-4 transition-colors"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                autoFocus
              />
              
              <div className="flex gap-3">
                <button 
                  onClick={handleVerifyAndExecute} 
                  className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-1.5 rounded-full hover:opacity-90 text-xs font-bold uppercase shadow-lg transition-opacity"
                >
                  Confirm
                </button>
                <button 
                  onClick={() => { setVerificationMode(null); setSecretCode(''); }} 
                  className="text-gray-400 px-4 py-1.5 hover:text-white text-xs font-bold uppercase transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
};

export default ConfessionCard;