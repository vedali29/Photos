import axios from 'axios';

const API_KEY = "P8WCHu5UIuuEcjpFRZtZn0l9Jy0cwj3KX69pqDWT670";
const API_URL = 'https://api.unsplash.com/search/photos';

export const fetchImages = async (query) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        query,
        client_id: API_KEY,
        per_page: 20
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw new Error('Failed to fetch images');
  }
};
