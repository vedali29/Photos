import React from 'react';
import { motion } from 'framer-motion';

const ImageGrid = ({ images, onImageClick, loading }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const getGridSpan = (image) => {
    const aspectRatio = image.width / image.height;
    
    // Enhanced span logic for better visual balance
    if (aspectRatio > 1.7) return 'col-span-2 row-span-1 md:col-span-2 lg:col-span-2';
    if (aspectRatio < 0.7) return 'col-span-1 row-span-2 md:col-span-1 lg:col-span-1';
    return 'col-span-1 row-span-1 md:col-span-1 lg:col-span-1';
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[minmax(200px,auto)] gap-3 p-3 max-w-[2000px] mx-auto"
    >
      {images.map((image) => {
        const spanClass = getGridSpan(image);
        
        return (
          <motion.div
            key={image.id}
            variants={item}
            className={`relative cursor-pointer group ${spanClass}`}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3, ease: 'easeOut' }
            }}
            onClick={() => onImageClick(image)}
          >
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <img
                src={image.urls.regular}
                alt={image.alt_description}
                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Enhanced overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={image.user.profile_image.small} 
                      alt={image.user.name}
                      className="w-8 h-8 rounded-full ring-2 ring-white/50"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-white text-sm">{image.user.name}</p>
                      {image.description && (
                        <p className="text-xs text-gray-200 line-clamp-1 mt-0.5">{image.description}</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="p-2 rounded-full bg-white/10 backdrop-blur-sm"
                      >
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ImageGrid;
