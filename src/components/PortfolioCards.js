import React, { useState, useEffect, useRef } from 'react';
import { animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';

function PortfolioCards() {
  const [cards, setCards] = useState([]);
  const [topZIndex, setTopZIndex] = useState(1);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const initialCards = [
      { id: 1, image: '/Starry Night by Van Gogh.jpg', title: 'Artwork 1', medium: 'Oil on canvas', size: '24x36 inches', date: '2023' },
      { id: 2, image: '/Cafe Terrace on Forum.jpg', title: 'Artwork 2', medium: 'Acrylic on wood', size: '18x24 inches', date: '2024' },
      { id: 3, image: '/Sunflowers by Van Gogh.jpg', title: 'Artwork 3', medium: 'Oil on canvas', size: '24x36 inches', date: '2023' },
    ];
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
    const cardWidth = 300;
    const cardHeight = 400;

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
            width: '300px',
            height: '400px',
            transform: `rotate(${card.rotation}deg)`,
          }}
          className="card"
        >
          <img 
            src={card.image} 
            alt={card.title} 
            onClick={() => setFullscreenImage(card.image)} 
          />
          <div className="card-info">
            <h3>{card.title}</h3>
            <p>{card.medium}</p>
            <p>{card.size}</p>
            <p>{card.date}</p>
          </div>
        </animated.div>
      ))}
      {fullscreenImage && (
        <div className="fullscreen-overlay" onClick={() => setFullscreenImage(null)}>
          <div className="fullscreen-image">
            <img src={fullscreenImage} alt="Fullscreen view" />
            <button className="close-button" onClick={() => setFullscreenImage(null)}>×</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PortfolioCards;
