import React from 'react';

function LanguageToggle({ language, setLanguage }) {
  return (
    <div className="language-toggle">
      <button onClick={() => setLanguage('en')} className={language === 'en' ? 'active' : ''}>EN</button>
      <button onClick={() => setLanguage('kk')} className={language === 'kk' ? 'active' : ''}>KK</button>
    </div>
  );
}

export default LanguageToggle;