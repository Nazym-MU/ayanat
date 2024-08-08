import React, { useState, useRef, useEffect } from 'react';

const initialCards = [
  { id: 1, mediaType: 'image', image: '/Perspective drawing.jpeg', title: 'Perspective drawing', medium: 'Watercolour pencils + black pen', size: 'A2', date: 'October 2023' },
  { id: 2, mediaType: 'image', image: '/Watercolour pencil portrait.jpeg', title: 'Portrait', medium: 'Watercolour pencils', size: 'December 2023', date: 'December 2023' },
  { id: 3, mediaType: 'image', image: '/December 2023.jpeg', medium: 'Digital', date: 'December 2023' },
  { id: 4, mediaType: 'image', image: '/January 2024.jpeg', title: 'Portrait', medium: 'Digital', date: 'January 2024' },
  { id: 5, mediaType: 'image', image: '/February 2024.jpeg', medium: 'Digital', date: 'February 2024' },
  { id: 6, mediaType: 'image', image: '/Observational drawing.jpeg', title: 'Observational drawing', medium: 'Watercolour pencils + black pen', size: 'A4', date: 'March 2024' },
  { id: 7, mediaType: 'image', image: '/March 2024.jpeg', medium: 'Digital', date: 'March 2024' },
  { id: 8, mediaType: 'image', image: '/Constructive drawing.jpeg', size: 'A4', date: 'May 2024' },
  { id: 9, mediaType: 'image', image: '/May 2024.jpeg', medium: 'Digital', date: 'May 2024' },
  { id: 10, mediaType: 'image', image: '/June 2024.jpeg', medium: 'Digital', date: 'June 2024' },
  { id: 11, mediaType: 'image', image: '/Live drawing.jpeg', title: 'Observational drawing', size: 'A5', date: 'June 2024' },
  { id: 12, mediaType: 'image', image: '/Perspective practice.jpeg', size: 'A4', date: 'June 2024' },
  { id: 13, mediaType: 'image', image: '/Драпировка.jpeg', title: 'Драпировка', size: 'A4', date: 'June 2024' },
  { id: 14, mediaType: 'image', image: '/Натюрморт.jpeg', title: 'Натюрморт', size: 'A3', date: 'June 2024' },
  { id: 15, mediaType: 'image', image: '/Sushi.png', title: 'Sushi', medium: 'Blender 3D model', date: 'July 2024' },
  { id: 16, mediaType: 'video', video: '/Animation practice, March 2024.mp4', title: 'Animation practice', date: 'March 2024' },
  { id: 17, mediaType: 'video', video: '/2D Animation, April 2024.mp4', title: '2D animation', date: 'April 2024' },
  { id: 18, mediaType: 'video', video: '/2D Animation, July 2024.mp4', title: '2D animation', date: 'July 2024' },
  { id: 19, mediaType: 'video', video: '/Starship.mp4', title: 'Starship animation', medium: 'Blender 2D animation', date: 'August 2024' },
].reverse();


const categories = [
  { name: '2D Animation', filter: card => card.title && card.title.toLowerCase().includes('animation') },
  { name: 'Watercolor Pencil', filter: card => card.medium && card.medium.toLowerCase().includes('watercolour pencil') },
  { name: 'Drawings', filter: card => card.title && (card.title.toLowerCase().includes('drawing') || card.title.toLowerCase().includes('драпировка') || card.title.toLowerCase().includes('натюрморт')) },
  { name: 'Digital Art', filter: card => card.medium && card.medium.toLowerCase().includes('digital') },
  { name: '3D Models', filter: card => card.medium && card.medium.toLowerCase().includes('blender 3d') },
];

const Portfolio = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const fullscreenRef = useRef(null);

  const handleImageClick = (card) => {
    setSelectedImage(card);
  };

  const handleCloseFullscreen = (e) => {
    if (e.target === fullscreenRef.current) {
      setSelectedImage(null);
    }
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  return (
    <div className="portfolio-container">
      <header className="portfolio-header">
        <h1>My Art Portfolio</h1>
      </header>
      {categories.map(category => (
        <div key={category.name} className="category-section">
          <h2>{category.name}</h2>
          <div className="portfolio-gallery">
            {initialCards.filter(category.filter).map(card => (
              <div key={card.id} className="portfolio-card" onClick={() => handleImageClick(card)}>
                {card.mediaType === 'image' ? (
                  <img src={card.image} alt={card.title || card.medium} className="card-media" />
                ) : (
                  <video src={card.video} controls className="card-media" />
                )}
                <div className="card-info">
                  <h3>{card.title || card.medium}</h3>
                  {card.medium && <p className="card-medium">{card.medium}</p>}
                  {card.size && <p className="card-size">{card.size}</p>}
                  <p className="card-date">{card.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {selectedImage && (
        <div className="fullscreen-overlay" ref={fullscreenRef} onClick={handleCloseFullscreen}>
          <div className="fullscreen-content">
            <button className="close-button" onClick={() => setSelectedImage(null)}>×</button>
            {selectedImage.mediaType === 'image' ? (
              <img
                src={selectedImage.image}
                alt={selectedImage.title || selectedImage.medium}
                className="fullscreen-media"
              />
            ) : (
              <video src={selectedImage.video} controls className="fullscreen-media" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;