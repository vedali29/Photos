# Image Search Application

## Project Overview

This project is a responsive image search application built using React and Tailwind CSS. The application allows users to search for images and view them in a grid format. Users can also click on individual images to view them in a modal. The project features a sticky search bar and a footer with useful links and social media icons.

## Features

- Responsive design using Tailwind CSS
- Sticky search bar that remains at the top of the page
- Image grid layout to display search results
- Modal for viewing individual images
- Footer with useful links and social media icons

## Technologies Used

- **React**: A JavaScript library for building user interfaces
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development
- **Font Awesome**: A popular icon library used for social media icons in the footer

## Components

### SearchBar

The `SearchBar` component allows users to search for images. It includes a sticky search bar that remains at the top of the page and displays popular search suggestions.

### ImageGrid

The `ImageGrid` component displays the search results in a grid layout. Each image can be clicked to open a modal.

### ImageModal

The `ImageModal` component displays the selected image in a larger view. Users can close the modal to return to the image grid.


## API Integration

The application uses the `fetchImages` function to retrieve images based on the search query. The API integration is done as follows:

### API Function

```javascript
import axios from 'axios';

export const fetchImages = async (query) => {
  const response = await axios.get(`https://api.unsplash.com/search/photos`, {
    params: { query },
    headers: {
      Authorization: 'Client-ID YOUR_UNSPLASH_ACCESS_KEY',
    },
  });
  return response.data.results;
};
