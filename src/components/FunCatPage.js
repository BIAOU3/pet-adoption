import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import '../css/FunCatPage.css';

const FunCatPage = () => {
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

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPetType, setSelectedPetType] = useState('');
  const [filteredPets, setFilteredPets] = useState(petsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPetForAdoption, setSelectedPetForAdoption] = useState(null);
  const [email, setEmail] = useState('');
  const [adoptionSuccess, setAdoptionSuccess] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    const lowerCaseValue = event.target.value.toLowerCase();
    setFilteredPets(petsData.filter(pet => pet.name.toLowerCase().includes(lowerCaseValue)));
  };

  const handlePetTypeChange = (event) => {
    setSelectedPetType(event.target.value);
    setFilteredPets(petsData.filter(pet => event.target.value ? pet.name.toLowerCase().startsWith(event.target.value) : true));
  };

  const openModal = (petId) => {
    setIsModalOpen(true);
    setSelectedPetForAdoption(petId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPetForAdoption(null);
    setEmail('');
    setAdoptionSuccess(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setAdoptionSuccess(true);
    setTimeout(() => {
      closeModal();
    }, 1000);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setEmail(user.email);
    }
  }, []);

  return (
    <div className="funcat-page">
      <header className="funcat-header">
        <h1>Pet List</h1>
      </header>
      <div className="search-and-filter">
        <select className="funpet-type-select" value={selectedPetType} onChange={handlePetTypeChange}>
          <option value="">All Pet Types</option>
          <option value="cat">Cats</option>
          <option value="dog">Dogs</option>
        </select>
        <input type="text" placeholder="Search by name" value={searchTerm} onChange={handleSearchChange} className="search-input" />
      </div>
      <section className="funpet-display">
        {filteredPets.length > 0 ? filteredPets.map(pet => (
          <div key={pet.id} className="funpet-card">
            <img src={pet.imageUrl} alt={pet.name} className="funpet-image" />
            <div className="funpet-details">
              <h3>{pet.name}</h3>
              <p>{pet.description}</p>
              <button onClick={() => openModal(pet.id)} className="adopt-button">Adopt</button>
            </div>
          </div>
        )) : <div className="no-results">No results</div>}
      </section>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {adoptionSuccess ? (
          <p>Congratulations! Adoption successful.</p>
        ) : (
          <>
            <p>Are you sure you want to adopt this pet?</p>
            <form onSubmit={handleSubmit}>
              <label>
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  className="email-input"
                />
              </label>
              <div className="modal-actions">
                <button type="submit" className="modal-confirm">Confirm Adoption</button>
                <button onClick={closeModal} className="modal-cancel">Cancel</button>
              </div>
            </form>
          </>
        )}
      </Modal>
    </div>
  );
};

export default FunCatPage;
