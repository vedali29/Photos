import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const popularSearches = [
    'Nature', 'Architecture', 'Travel', 'Food', 'Animals',
    'Technology', 'Art', 'Fashion', 'Sports'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="fixed top-0 w-full bg-opacity-75 text-white z-50">
      <motion.div
        className="flex justify-between items-center p-4 mx-auto max-w-7xl"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex space-x-4">
          <button className="bg-white text-gray-900 transition-colors px-4 py-2 rounded-full">Home</button>
          <button className="bg-white text-gray-900 transition-colors px-4 py-2 rounded-full">Explore</button>
          <button className="bg-white text-gray-900 transition-colors px-4 py-2 rounded-full">Create Feed</button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex items-center w-3/4">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search images..."
              className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 bg-transparent text-white"
            />
            <svg 
              className="absolute top-1/2 transform -translate-y-1/2 left-3 w-5 h-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a4 4 0 11-8 0 4 4 0 018 0zm2 8l-4-4"></path>
            </svg>
            
            <AnimatePresence>
              {showSuggestions && (
                <motion.div 
                  className="absolute z-10 w-full mt-2 bg-black rounded-lg shadow-lg border border-gray-200"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-white mb-2">Popular Searches</h3>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((suggestion) => (
                        <motion.button
                          key={suggestion}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="px-3 py-1 text-sm bg-black border-2 border-white text-white hover:bg-gray-800 rounded-full transition-colors"
                          whileHover={{ scale: 1.05 }}
                        >
                          {suggestion}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            type="submit"
            className="ml-2 px-6 py-2 bg-white text-black rounded-full shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white-500 transition-colors flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            Search
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default SearchBar;
