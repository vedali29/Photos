import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchImages } from '../api';

const ImageModal = ({ image, onClose, onImageClick }) => {
  const [relatedImages, setRelatedImages] = useState([]);

  useEffect(() => {
    const fetchRelatedImages = async () => {
      try {
        // Use image tags, description, or alt_description for better related image search
        const searchQuery = image?.tags?.[0]?.title || 
                          image?.description || 
                          image?.alt_description ||
                          'similar';
        
        const images = await fetchImages(searchQuery);
        
        // Filter out the current image and limit to 8 related images
        const filteredImages = images
          .filter(img => img.id !== image.id)
          .slice(0, 8);
        
        setRelatedImages(filteredImages);
      } catch (error) {
        console.error('Error fetching related images:', error);
        setRelatedImages([]);
      }
    };

    if (image) {
      fetchRelatedImages();
    }
  }, [image]);

  if (!image) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl relative w-[90%] h-[90vh] mx-auto flex"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main Image Section */}
        <div className="w-2/3 p-4 relative">
          <motion.img 
            src={image.urls.regular} 
            alt={image.alt_description || 'Image'} 
            className="w-full h-full object-contain rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          
          {/* Author Info and Download Button */}
          <div className="absolute bottom-8 left-8 p-3 flex items-center justify-between w-11/12">
            <div className="flex items-center space-x-3 bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-2">
              <img 
                src={image.user.profile_image.medium} 
                alt={image.user.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="text-white">
                <p className="font-medium">{image.user.name}</p>
                <p className="text-sm opacity-80">@{image.user.username}</p>
              </div>
            </div>
            <button
              onClick={() => window.open(image.urls.full, '_blank')}
              className="px-4 py-2 align-middle bg-gray-900 text-white rounded-lg hover:bg-black transition flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Details Section */}
        <div className="w-1/3 p-6 flex flex-col overflow-y-auto">
          {/* Image Info */}
          <div className="mt-6">
            {image.description && (
              <h3 className="text-xl font-bold dark:text-white mb-4">
                {image.description}
              </h3>
            )}
            {image.location?.title && (
              <p className="text-gray-600 dark:text-gray-300 flex items-center mb-6">
                <span className="mr-2">📍</span>
                {image.location.title}
              </p>
            )}
          </div>

          {/* Related Images */}
          {relatedImages.length > 0 && (
            <div className="mt-auto">
              <h4 className="text-lg font-semibold dark:text-white mb-3">Similar Photos</h4>
              <div className="grid grid-cols-2 gap-2">
                {relatedImages.map(relatedImage => (
                  <motion.img 
                    key={relatedImage.id}
                    src={relatedImage.urls.thumb}
                    alt={relatedImage.alt_description || 'Related image'}
                    className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => onImageClick(relatedImage)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Close Button */}
        <button 
          className="absolute top-4 right-4 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors text-white"
          onClick={onClose}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ImageModal;
