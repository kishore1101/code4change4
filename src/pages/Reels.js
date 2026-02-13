import React, { useState, useRef, useEffect } from 'react';
import ReelPlayer from '../components/ReelPlayer';  // Correct path to components folder
import { dummyReels } from '../data/dummyData';     // Correct path to data folder
import '../components/ReelPlayer.css';               // Import CSS from components folder
import './Reels.css';                                 // Page-specific CSS

const Reels = () => {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (container) {
        const scrollTop = container.scrollTop;
        const reelHeight = window.innerHeight;
        const newIndex = Math.round(scrollTop / reelHeight);
        if (newIndex !== currentReelIndex && newIndex >= 0 && newIndex < dummyReels.length) {
          setCurrentReelIndex(newIndex);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [currentReelIndex]);

  return (
    <div className="reels-page">
      <div className="reels-container" ref={containerRef}>
        {dummyReels.map((reel, index) => (
          <ReelPlayer 
            key={reel.id} 
            reel={reel} 
            isActive={index === currentReelIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default Reels;