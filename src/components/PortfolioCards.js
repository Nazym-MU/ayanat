import React from 'react';

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
  { id: 18, mediaType: 'video', video: '/2D Animation, July 2024.mp4', title: '2D animation', date: 'July 2024' }
].reverse();

const Portfolio = () => {
  return (
    <div className="portfolio-container">
      <header className="portfolio-header">
        <h1>My Art Portfolio</h1>
      </header>
      <div className="portfolio-gallery">
        {initialCards.map((card, index) => (
          <React.Fragment key={card.id}>
            {index > 0 && index % 3 === 0 && (
              <div className="section-divider">
                <span>{new Date(card.date).getFullYear()}</span>
              </div>
            )}
            <div className="portfolio-card">
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
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;