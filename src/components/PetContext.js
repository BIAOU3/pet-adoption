import React, { createContext, useContext, useState } from 'react';

export const PetContext = createContext();

export const PetProvider = ({ children }) => {
  const [adoptedPets, setAdoptedPets] = useState([]);

  const adoptPet = (newPet) => {
    setAdoptedPets((currentAdoptedPets) => {
      if (currentAdoptedPets.some((pet) => pet.id === newPet.id)) {
        return currentAdoptedPets;
      }
      return [...currentAdoptedPets, newPet];
    });
  };

  return (
    <PetContext.Provider value={{ adoptedPets, adoptPet }}>
      {children}
    </PetContext.Provider>
  );
};
