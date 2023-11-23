import React, { useState, useEffect } from 'react';
import '../css/PetShow.css';

const PetShow = () => {
  const getPetsData = () => {
    const imagesContext = require.context('../assets/pet', false, /\.jpg$/);
    const petsData = imagesContext.keys().map((filename, index) => {
      const match = filename.match(/(cat|dog)(\d+)\.jpg$/);
      const petType = match[1];
      const petNumber = match[2];
      const isCat = petType === 'cat';
      return {
        id: index + 1, 
        name: `${petType.charAt(0).toUpperCase() + petType.slice(1)} ${petNumber}`,
        description: `A ${isCat ? 'friendly' : 'loyal'} ${petType}`,
        imageUrl: imagesContext(filename),
      };
    });

    return petsData.sort(() => Math.random() - 0.5);
  };

  const petsData = getPetsData();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % petsData.length);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [petsData]);

  return (
    <div className="pet-show-page">
      <header className="pet-show-header">
        <h1>Pet Show</h1>
      </header>
      <section className="pet-display">
        {petsData.length > 0 ? petsData.map((pet, index) => (
          <div
            key={pet.id}
            className={`pet-card ${index === currentImageIndex ? 'active' : ''}`}
          >
            <img src={pet.imageUrl} alt={pet.name} className="pet-image" />
          </div>
        )) : <div className="no-results">No pets available</div>}
      </section>
    </div>
  );
};

export default PetShow;
