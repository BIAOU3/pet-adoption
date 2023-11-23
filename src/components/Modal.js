import React from 'react';
import '../css/Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button onClick={onClose} className="modal-close-button">X</button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
