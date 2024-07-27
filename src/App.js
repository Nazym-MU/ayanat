import React, { useState, useEffect } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { useSprings, animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import './App.css';

const Card = ({ artwork, index, flipped, setFlipped, handleSwipe }) => {
  const handleClick = () => {
    setFlipped(index, !flipped[index]);
  };

  const bind = useDrag(({ swipe: [swipeX] }) => {
    if (swipeX !== 0) {
      handleSwipe(index, swipeX);
    }
  });

  return (
    <animated.div {...bind()} className={`card ${flipped[index] ? 'flipped' : ''}`} onClick={handleClick}>
      <div className="card-front">
        <img src={artwork.image} alt={artwork.title} />
      </div>
      <div className="card-back">
        <h3>{artwork.title}</h3>
        <p>{artwork.description}</p>
      </div>
    </animated.div>
  );
};

const App = () => {
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const [offset, setOffset] = useState(0);
  const [isKazakh, setIsKazakh] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setOffset(window.pageYOffset);
      setScrollY(window.pageYOffset);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const content = {
    english: {
      intro: "I am Ayanat, and I am an artist.",
      welcome: "Welcome to my world of colors, shapes, and imagination.",
      portfolio: "Portfolio",
      contact: "Contact Me",
      contactDesc: "Let's create something beautiful together!",
      button: "Get in Touch",
    },
    kazakh: {
      intro: "Менің атым Аянат және мен суретшімін.",
      welcome: "Түстер, пішіндер және қиял әлеміме қош келдіңіз.",
      portfolio: "Портфолио",
      contact: "Маған хабарласыңыз",
      contactDesc: "Бірге әдемі дүние жасайық!",
      button: "Байланысу",
    },
  };

  const artworks = [
    { 
      title: isKazakh ? "Армандағы пейзаж" : "Dreamy Landscape",
      description: isKazakh ? "Қиял әлемін бейнелейтін сюрреалистік май картинасы." : "A surreal oil painting depicting a dreamlike landscape.",
      image: "/Cafe Terrace on Forum.jpg"
    },
    { 
      title: isKazakh ? "Қалалық хаос" : "Urban Chaos",
      description: isKazakh ? "Қала өмірінің мәнін көрсететін жарқын сандық иллюстрация." : "A vibrant digital illustration capturing the essence of city life.",
      image: "/Starry Night by Van Gogh.jpg"
    },
    { 
      title: isKazakh ? "Қозғалыстағы тыныштық" : "Serenity in Motion",
      description: isKazakh ? "Қозғалыс арқылы тыныштықты бейнелейтін кинетикалық мүсін." : "A kinetic sculpture that embodies tranquility through movement.",
      image: "/Sunflowers by Van Gogh.jpg"
    },
  ];

  const currentLang = isKazakh ? content.kazakh : content.english;

  const [flipped, setFlipped] = useState(new Array(artworks.length).fill(false));
  const [gone] = useState(() => new Set());

  const [props, api] = useSprings(artworks.length, i => ({
    x: 0,
    y: i * -4,
    scale: 1,
    zIndex: artworks.length - i,
  }));

  const setFlippedState = (index, isFlipped) => {
    const newFlipped = [...flipped];
    newFlipped[index] = isFlipped;
    setFlipped(newFlipped);
  };

  const handleSwipe = (index, direction) => {
    gone.add(index);
    api.start(i => {
      if (i !== index) return;
      const x = (200 + window.innerWidth) * direction;
      return { x, scale: 0.5, zIndex: 0 };
    });

    if (gone.size === artworks.length) {
      setTimeout(() => {
        gone.clear();
        api.start(i => ({ x: 0, y: i * -4, scale: 1, zIndex: artworks.length - i }));
      }, 600);
    }
  };

  return (
    <div className="App">
      <div 
        className="custom-cursor" 
        style={{ 
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: `translate(-50%, -50%) rotate(${scrollY}deg)`
        }}
      ></div>
      <motion.button
        className="lang-toggle"
        onClick={() => setIsKazakh(!isKazakh)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isKazakh ? '🇬🇧' : '🇰🇿'}
      </motion.button>

      <header style={{ transform: `translateY(${offset * 0.5}px)` }}>
        <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          {currentLang.intro}
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
          {currentLang.welcome}
        </motion.p>
      </header>

      <section className="portfolio">
        <motion.h2 style={{ scale }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}>
          {currentLang.portfolio}
        </motion.h2>
        <div className="card-stack">
          {props.map((styles, i) => (
            <animated.div key={i} style={styles}>
              <Card 
                artwork={artworks[i]} 
                index={i} 
                flipped={flipped}
                setFlipped={setFlippedState}
                handleSwipe={handleSwipe}
              />
            </animated.div>
          ))}
        </div>
      </section>

      <motion.section
        className="contact"
        style={{ transform: `translateY(${offset * -0.3}px)` }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <h2>{currentLang.contact}</h2>
        <p>{currentLang.contactDesc}</p>
        <button>{currentLang.button}</button>
      </motion.section>
    </div>
  );
};

export default App;