import React, { useState } from 'react';
import Intro from './components/Intro';
import PortfolioCards from './components/PortfolioCards';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import LanguageToggle from './components/LanguageToggle';
import { IntlProvider } from 'react-intl';
import messages from './messages';
import './App.css';

/*
Further plans (September 13 - September 14):

Database:
- Create a postgreSQL database
- Connect the database to the portfolio
- Add an upload, edit, and delete functionality for the projects
- Add a login functionality only for the admin

UI:
- Add dark mode
- Add a scroll to top button
- Add a footer

Contact:
- Add a contact form to send an email to the admin

Mobile:
- Make the portfolio responsive for mobile devices

Nice to have:
- Notifications for the content updates for followers
- AI assistant to help with the portfolio
*/


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