import React, { useState, useEffect, useRef } from 'react';
import { animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';

function PortfolioCards() {
  const [cards, setCards] = useState([]);
  const [topZIndex, setTopZIndex] = useState(1);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();

    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  useEffect(() => {
    const initialCards = [
      { id: 1, image: '/Perspective drawing.jpeg', title: 'Perspective drawing', medium: 'Watercolour pencils + black pen', size: 'A2', date: 'October 2023' },
      { id: 2, image: '/Watercolour pencil portrait.jpeg', title: 'Portrait', medium: 'Watercolour pencils', size: 'December 2023', date: 'December 2023' },
      { id: 3, image: '/December 2023.jpeg', medium: 'Digital', date: 'December 2023' },
      { id: 4, image: '/January 2024.jpeg', title: 'Portrait', medium: 'Digital', date: 'January 2024' },
      { id: 5, image: '/February 2024.jpeg', medium: 'Digital', date: 'February 2024' },
      { id: 6, image: '/Observational drawing.jpeg', title: 'Observational drawing', medium: 'Watercolour pencils + black pen', size: 'A4', date: 'March 2024' },
      { id: 7, image: '/March 2024.jpeg', medium: 'Digital', date: 'March 2024' },
      { id: 8, image: '/Constructive drawing.jpeg', size: 'A4', date: 'May 2024' },
      { id: 9, image: '/May 2024.jpeg', medium: 'Digital', date: 'May 2024' },
      { id: 10, image: '/June 2024.jpeg', medium: 'Digital', date: 'June 2024' },
      { id: 11, image: '/Live drawing.jpeg', title: 'Observational drawing', size: 'A5', date: 'June 2024' },
      { id: 12, image: '/Perspective practice.jpeg', size: 'A4', date: 'June 2024' },
      { id: 13, image: '/Драпировка.jpeg', title: 'Драпировка', size: 'A4', date: 'June 2024' },
      { id: 14, image: '/Натюрморт.jpeg', title: 'Натюрморт', size: 'A3', date: 'June 2024' },
      { id: 15, image: '/Sushi.png', title: 'Sushi', medium: 'Blender 3D model', date: 'July 2024' },
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
    const cardWidth = isMobile ? 220 : 320;
    const cardHeight = isMobile ? 260 : 420;

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
            width: isMobile ? '220px' : '320px',
            height: isMobile ? '260px' : '420px',
            transform: `rotate(${card.rotation}deg)`,
          }}
          className="card"
        >
          <img 
            src={card.image} 
            alt={card.title || 'Artwork'}
            onClick={() => setFullscreenImage(card.image)} 
          />
          <div className="card-info">
            {card.title && <h3>{card.title}</h3>}
            {card.medium && <p>Medium: {card.medium}</p>}
            {card.size && <p>Size: {card.size}</p>}
            <p>Date: {card.date}</p>
          </div>
        </animated.div>
      ))}
      {fullscreenImage && (
        <div className="fullscreen-overlay" onClick={() => setFullscreenImage(null)}>
          <div className="fullscreen-image">
            <img src={fullscreenImage} alt="Fullscreen artwork" />
            <button className="close-button" onClick={() => setFullscreenImage(null)}>×</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PortfolioCards;
