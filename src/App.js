import React, { useState } from 'react';
import Intro from './components/Intro';
import PortfolioCards from './components/PortfolioCards';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import LanguageToggle from './components/LanguageToggle';
import { IntlProvider } from 'react-intl';
import messages from './messages';
import './App.css';
import connectDB from '../db';
import express from 'express';
import Artwork from '../models/artworks';


connectDB();

const app = express();

app.get('/api/artworks', async (req, res) => {
  try {
    const artworks = await Artwork.find(); // Fetch all artworks
    res.json(artworks);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});



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