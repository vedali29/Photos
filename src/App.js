import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import ImageGrid from './components/ImageGrid';
import ImageModal from './components/ImageModal';
import { fetchImages } from './api';

const App = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleImageClick = (image) => {
    setSelectedImage(image);
  }

  const searchImages = async (query) => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchImages(query);
      setImages(result);
    } catch (err) {
      setError('Failed to fetch images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchImages('nature');
  }, []);

  return (
    <div className="container mx-auto p-4">
      
      <SearchBar onSearch={searchImages} />
      {error && (
        <div className="text-red-500 text-center my-4">{error}</div>
      )}
      <ImageGrid 
        images={images} 
        onImageClick={setSelectedImage} 
        loading={loading}
      />
      <ImageModal 
        image={selectedImage} 
        onClose={() => setSelectedImage(null)} 
        onImageClick={handleImageClick}
      />
    </div>
  );
};

export default App;
