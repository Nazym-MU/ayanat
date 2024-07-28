import React, { useState } from 'react';
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


  return (
    <IntlProvider messages={messages[language]} locale={language}>
      <div className="App">
        <CustomCursor />
        <LanguageToggle language={language} setLanguage={setLanguage} />
        <Intro />
        <PortfolioCards />
        <Contact />
      </div>
    </IntlProvider>
  );
}

export default App;