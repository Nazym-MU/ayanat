// components/PortfolioCards.js
import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';

function PortfolioCards() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const initialCards = [
      { id: 1, image: '/Starry Night by Van Gogh.jpg', title: 'Artwork 1', medium: 'Oil on canvas', size: '24x36 inches', date: '2023' },
      { id: 2, image: '/Cafe Terrace on Forum.jpg', title: 'Artwork 2', medium: 'Acrylic on wood', size: '18x24 inches', date: '2024' },
      { id: 1, image: '/Sunflowers by Van Gogh.jpg', title: 'Artwork 1', medium: 'Oil on canvas', size: '24x36 inches', date: '2023' },
    ].map(card => ({
      ...card,
      rotation: Math.random() * 20 - 10,
      x: 0,
      y: 0
    }));
    setCards(initialCards);
  }, []);

  const bind = useDrag(({ args: [index], down, movement: [mx, my] }) => {
    setCards(prevCards => 
      prevCards.map((card, i) => 
        i === index 
          ? { ...card, x: down ? mx : card.x + mx, y: down ? my : card.y + my }
          : card
      )
    );
  });

  return (
    <div className="portfolio-cards">
      {cards.map((card, index) => (
        <animated.div
          key={card.id}
          {...bind(index)}
          style={{
            transform: `translate3d(${card.x}px, ${card.y}px, 0) rotate(${card.rotation}deg)`,
            zIndex: cards.length - index,
          }}
          className="card"
        >
          <img src={card.image} alt={card.title} />
          <div className="card-info">
            <h3>{card.title}</h3>
            <p>{card.medium}</p>
            <p>{card.size}</p>
            <p>{card.date}</p>
          </div>
        </animated.div>
      ))}
    </div>
  );
}

export default PortfolioCards;