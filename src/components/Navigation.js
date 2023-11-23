import React from 'react';
import '../css/Navigation.css';
import defaultAvatar from '../assets/OIP.jpeg';

const Navigation = ({ onNavigate, user, avatar, onLogout }) => {
    const handleAdoptClick = () => {
        if (!user) {
            alert('Please log in before adopting a pet.'); 
        } else {
            onNavigate('FunCat');
        }
    };

    return (
        <nav className="navigation-bar">
            <button onClick={() => onNavigate('home')}>Home</button>
            <button onClick={() => onNavigate('about')}>About</button>
            {user && (
                <>
                    <button onClick={handleAdoptClick}>Adopt</button>
                    <button onClick={() => onNavigate('submitPet')}>Submit Pet</button>
                    <button onClick={onLogout} className="logout-button">Log Out</button>
                    <img src={avatar || defaultAvatar} className="user-avatar" alt="User Avatar" />
                </>
            )}
            {!user && (
                <>
                    <button onClick={() => onNavigate('petShow')}>Pet Show</button>
                    <button onClick={() => onNavigate('register')}>Register</button>
                    <button onClick={() => onNavigate('login')}>Login</button>
                </>
            )}
        </nav>
    );
};

export default Navigation;
