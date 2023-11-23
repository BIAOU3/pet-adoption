import React, { useState } from 'react';
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Navigation from './components/Navigation';
import AboutPage from './components/AboutPage';
import FunCatPage from './components/FunCatPage';
import SubmitPetForm from './components/SubmitPetForm';
import PetShow from './components/PetShow'; 

import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  const handleUserLoggedIn = (userInfo, userAvatar) => {
    setUser(userInfo);
    setAvatar(userAvatar);
    setCurrentView('home');
  };

  const handleLogout = () => {
    setUser(null);
    setAvatar(null);
    setCurrentView('home');
  };

  let renderView;
  switch (currentView) {
    case 'login':
      renderView = <LoginForm onNavigate={handleNavigate} onUserLoggedIn={handleUserLoggedIn} />;
      break;
    case 'register':
      renderView = <RegisterForm onNavigate={handleNavigate} />;
      break;
    case 'FunCat':
      renderView = <FunCatPage />;
      break;
    case 'about':
      renderView = <AboutPage />;
      break;
    case 'submitPet':
      renderView = <SubmitPetForm />;
      break;
    case 'petShow':
      renderView = <PetShow />;
      break;
    case 'home':
    default:
      renderView = <HomePage />;
      break;
  }

  return (
    <div className="app">
      <Navigation onNavigate={handleNavigate} user={user} avatar={avatar} onLogout={handleLogout} />
      {renderView}
    </div>
  );
}

export default App;
