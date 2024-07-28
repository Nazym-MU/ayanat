import React, { useState, useEffect } from 'react';

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const updatePosition = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', updatePosition);

    const updateRotation = () => setRotation((prev) => prev + 5);
    window.addEventListener('scroll', updateRotation);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('scroll', updateRotation);
    };
  }, []);

  return (
    <div
      className="custom-cursor"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `rotate(${rotation}deg)`,
      }}
    />
  );
}

export default CustomCursor;