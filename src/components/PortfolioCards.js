import React, { useState, useEffect, useRef } from 'react';
import { animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';

function PortfolioCards() {
  const [cards, setCards] = useState([]);
  const [topZIndex, setTopZIndex] = useState(1);
  const [fullscreenMedia, setFullscreenMedia] = useState(null);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
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

    const container = containerRef.current;
    const centerX = (container.offsetWidth - 300) / 2;
    const centerY = (container.offsetHeight - 400) / 2;

    setCards(initialCards.map(card => ({
      ...card,
      x: centerX,
      y: centerY,
      zIndex: 1,
      rotation: Math.random() * 10 - 5,
    })));
  }, []);

  const bind = useDrag(({ args: [index], down, movement: [mx, my], memo = [cards[index].x, cards[index].y] }) => {
    const container = containerRef.current;
    const cardWidth = isMobile ? 200 : 300;
    const cardHeight = isMobile ? 250 : 400;

    let newX = memo[0] + mx;
    let newY = memo[1] + my;

    newX = Math.max(0, Math.min(newX, container.offsetWidth - cardWidth));
    newY = Math.max(0, Math.min(newY, container.offsetHeight - cardHeight));

    setCards(prevCards => 
      prevCards.map((card, i) => 
        i === index 
          ? { ...card, x: newX, y: newY, zIndex: down ? topZIndex : card.zIndex }
          : card
      )
    );

    if (down) {
      setTopZIndex(prev => prev + 1);
    }

    return memo;
  });

  return (
    <div className="portfolio-cards" ref={containerRef}>
      {cards.map((card, index) => (
        <animated.div
          key={card.id}
          {...bind(index)}
          style={{
            left: `${card.x}px`,
            top: `${card.y}px`,
            zIndex: card.zIndex,
            width: isMobile ? '200px' : '300px',
            height: isMobile ? '300px' : '550px',
            transform: `rotate(${card.rotation}deg)`,
          }}
          className="card"
        >
          {card.mediaType === 'image' ? (
            <img 
            src={card.image} 
            alt={card.title || 'Artwork'}
            onClick={() => setFullscreenMedia(card)} 
            style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
          />
          ) : (
            <video 
              src={card.video} 
              controls 
              style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
              onClick={() => setFullscreenMedia(card)}
            />
          )}
          <div className="card-info">
            {card.title && <h3>{card.title}</h3>}
            {card.medium && <p>Medium: {card.medium}</p>}
            {card.size && <p>Size: {card.size}</p>}
            <p>Date: {card.date}</p>
          </div>
        </animated.div>
      ))}
      {fullscreenMedia && (
        <div className="fullscreen-overlay" onClick={() => setFullscreenMedia(null)}>
          <div className="fullscreen-media">
            {fullscreenMedia.mediaType === 'image' ? (
              <img src={fullscreenMedia.image} alt="Fullscreen artwork" />
            ) : (
              <video src={fullscreenMedia.video} controls autoPlay />
            )}
            <button className="close-button" onClick={() => setFullscreenMedia(null)}>×</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PortfolioCards;
