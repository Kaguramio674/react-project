import { imageupload } from '@/api/upload';
import { useState } from 'react';

export default function Home() {
  return (
    <>
      <h1 style={{ textAlign: 'center', fontSize: '2em' }}>Cocktail Recipes Project</h1>
      
      <p style={{ fontSize: '1.2em' }}>
        This project is a web application dedicated to cocktail menus. As an enthusiast of mixology, I found myself frustrated with the plethora of advertisements and inconsistent recipes on various cocktail menu websites. To address these issues, I decided to create my own project.
      </p>

      <p style={{ fontSize: '1.2em' }}>
        The application leverages React for the front-end, Express with TypeScript for the back-end, and MySQL for data storage. Images are managed using AWS S3. The web app boasts a range of features designed to enhance user experience and provide a seamless interface.
      </p>

      <h2 style={{ fontSize: '1.5em' }}>Key Features:</h2>
      <ul style={{ fontSize: '1.2em' }}>
        <li><strong>User Registration and Login</strong>: Users can create accounts and securely log in to access personalized features.</li>
        <li><strong>Likes and Favorites</strong>: Users can like and favorite cocktails, keeping track of their preferred recipes.</li>
        <li><strong>Search and Sort</strong>: Cocktails can be searched and sorted based on user preferences, making it easy to find specific recipes or explore new ones.</li>
        <li><strong>Add Menus</strong>: Users can contribute by adding new cocktail recipes to the menu.</li>
        <li><strong>User Authentication and Permissions</strong>: The app ensures secure access and appropriate permissions for different user actions.</li>
        <li><strong>Clean Interface with Typography and Color Coding</strong>: The app offers a visually appealing menu interface with well-organized typography and color coding to differentiate between various elements.</li>
      </ul>
    </>
  );
}
