import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import api from '../api/axios';

const TAG_OPTIONS = ["Funny", "Dark", "Love", "Work", "College", "Rant"];

const PostModal = ({ onClose, refreshFeed }) => {
  const [text, setText] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      if (selectedTags.length < 3) setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (secretCode.length < 4) return toast.error("Secret code must be at least 4 chars!");
    if (!text.trim()) return toast.error("Confession cannot be empty.");

    setLoading(true);
    try {
      await api.post('/confessions', {
        text,
        secretCode,
        tags: selectedTags
      });
      toast.success("Secret whispered into the void.");
      refreshFeed();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to post confession.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#242424] w-full max-w-lg rounded-2xl border border-gray-800 p-6 shadow-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
            Whisper a Secret
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <textarea
              className="w-full bg-[#1a1a1a] text-gray-200 p-4 rounded-xl border border-gray-700 focus:border-purple-500 outline-none transition-colors resize-none"
              rows="5"
              placeholder="I never told anyone that..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">SECRET CODE (Don't forget this!)</label>
              <input 
                type="password"
                maxLength="6"
                placeholder="****"
                className="w-full bg-[#1a1a1a] text-white p-3 rounded-lg border border-gray-700 focus:border-blue-500 outline-none tracking-widest"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-xs text-gray-500 mb-2">TAGS (Max 3)</label>
            <div className="flex flex-wrap gap-2">
              {TAG_OPTIONS.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                    selectedTags.includes(tag) 
                      ? 'bg-purple-900/50 border-purple-500 text-white' 
                      : 'bg-[#1a1a1a] border-gray-700 text-gray-400 hover:border-gray-500'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Posting..." : "Confess Anonymously"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default PostModal;