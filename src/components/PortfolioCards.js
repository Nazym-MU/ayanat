// const initialCards = [
//   { id: 1, mediaType: 'image', image: '/Perspective drawing.jpeg', title: 'Perspective drawing', medium: 'Watercolour pencils + black pen', size: 'A2', date: 'October 2023' },
//   { id: 2, mediaType: 'image', image: '/Watercolour pencil portrait.jpeg', title: 'Portrait', medium: 'Watercolour pencils', size: 'December 2023', date: 'December 2023' },
//   { id: 3, mediaType: 'image', image: '/December 2023.jpeg', medium: 'Digital', date: 'December 2023' },
//   { id: 4, mediaType: 'image', image: '/January 2024.jpeg', title: 'Portrait', medium: 'Digital', date: 'January 2024' },
//   { id: 5, mediaType: 'image', image: '/February 2024.jpeg', medium: 'Digital', date: 'February 2024' },
//   { id: 6, mediaType: 'image', image: '/Observational drawing.jpeg', title: 'Observational drawing', medium: 'Watercolour pencils + black pen', size: 'A4', date: 'March 2024' },
//   { id: 7, mediaType: 'image', image: '/March 2024.jpeg', medium: 'Digital', date: 'March 2024' },
//   { id: 8, mediaType: 'image', image: '/Constructive drawing.jpeg', size: 'A4', date: 'May 2024' },
//   { id: 9, mediaType: 'image', image: '/May 2024.jpeg', medium: 'Digital', date: 'May 2024' },
//   { id: 10, mediaType: 'image', image: '/June 2024.jpeg', medium: 'Digital', date: 'June 2024' },
//   { id: 11, mediaType: 'image', image: '/Live drawing.jpeg', title: 'Observational drawing', size: 'A5', date: 'June 2024' },
//   { id: 12, mediaType: 'image', image: '/Perspective practice.jpeg', size: 'A4', date: 'June 2024' },
//   { id: 13, mediaType: 'image', image: '/Драпировка.jpeg', title: 'Драпировка', size: 'A4', date: 'June 2024' },
//   { id: 14, mediaType: 'image', image: '/Натюрморт.jpeg', title: 'Натюрморт', size: 'A3', date: 'June 2024' },
//   { id: 15, mediaType: 'image', image: '/Sushi.png', title: 'Sushi', medium: 'Blender 3D model', date: 'July 2024' },
//   { id: 16, mediaType: 'video', video: '/Animation practice, March 2024.mp4', title: 'Animation practice', date: 'March 2024' },
//   { id: 17, mediaType: 'video', video: '/2D Animation, April 2024.mp4', title: '2D animation', date: 'April 2024' },
//   { id: 18, mediaType: 'video', video: '/2D Animation, July 2024.mp4', title: '2D animation', date: 'July 2024' },
//   { id: 19, mediaType: 'video', video: '/Starship.mp4', title: 'Starship animation', medium: 'Blender 3D animation', date: 'August 2024' },
// ].reverse();

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; 

const Portfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const fullscreenRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'portfolio'));
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPortfolioItems(items.reverse());
      } catch (error) {
        console.error('Error fetching portfolio items: ', error);
      }
    };

    fetchData();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseFullscreen = (e) => {
    if (e.target === fullscreenRef.current) {
      setSelectedItem(null);
    }
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const categories = [
    { name: '2D Animation', filter: item => item.title && item.title.toLowerCase().includes('animation') },
    { name: 'Watercolor Pencil', filter: item => item.medium && item.medium.toLowerCase().includes('watercolour pencil') },
    { name: 'Drawings', filter: item => item.title && (item.title.toLowerCase().includes('drawing') || item.title.toLowerCase().includes('драпировка') || item.title.toLowerCase().includes('натюрморт')) },
    { name: 'Digital Art', filter: item => item.medium && item.medium.toLowerCase().includes('digital') },
    { name: '3D Models', filter: item => item.medium && item.medium.toLowerCase().includes('blender 3d') },
  ];

  return (
    <div className="portfolio-container">
      <header className="portfolio-header">
        <h1>My Art Portfolio</h1>
      </header>
      {categories.map(category => (
        <div key={category.name} className="category-section">
          <h2>{category.name}</h2>
          <div className="portfolio-gallery">
            {portfolioItems.filter(category.filter).map(item => (
              <div key={item.id} className="portfolio-card" onClick={() => handleItemClick(item)}>
                {item.mediaType === 'image' ? (
                  <img src={item.image} alt={item.title || item.medium} className="card-media" />
                ) : (
                  <video src={item.video} controls className="card-media" />
                )}
                <div className="card-info">
                  <h3>{item.title || item.medium}</h3>
                  {item.medium && <p className="card-medium">{item.medium}</p>}
                  {item.size && <p className="card-size">{item.size}</p>}
                  <p className="card-date">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {selectedItem && (
        <div className="fullscreen-overlay" ref={fullscreenRef} onClick={handleCloseFullscreen}>
          <div className="fullscreen-content">
            <button className="close-button" onClick={() => setSelectedItem(null)}>×</button>
            {selectedItem.mediaType === 'image' ? (
              <img
                src={selectedItem.image}
                alt={selectedItem.title || selectedItem.medium}
                className="fullscreen-media"
              />
            ) : (
              <video src={selectedItem.video} controls className="fullscreen-media" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
