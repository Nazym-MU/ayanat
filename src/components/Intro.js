import React from 'react';
import { FormattedMessage } from 'react-intl';

function Intro({ scrollY }) {
  return (
    <section className="intro" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
      <div className="floating-element circle"></div>
      <div className="floating-element square"></div>
      <div className="floating-element triangle"></div>
      <h1>
        <FormattedMessage id="intro.title" defaultMessage="I am {name} and I am an artist." values={{ name: 'Ayanat' }} />
      </h1>
      <p><FormattedMessage id="intro.description" defaultMessage="Additional intro text here." /></p>
    </section>
  );
}

export default Intro;