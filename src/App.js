import React, { useState, useEffect } from 'react';
import Intro from './components/Intro';
import PortfolioCards from './components/PortfolioCards';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import LanguageToggle from './components/LanguageToggle';
import { IntlProvider } from 'react-intl';
import messages from './messages';
import './App.css';

function App() {
  const [language, setLanguage] = useState('en');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <IntlProvider messages={messages[language]} locale={language}>
      <div className="App">
        <CustomCursor />
        <LanguageToggle language={language} setLanguage={setLanguage} />
        <Intro scrollY={scrollY} />
        <PortfolioCards />
        <Contact />
      </div>
    </IntlProvider>
  );
}

export default App;