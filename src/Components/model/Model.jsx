import React, { useState } from 'react';
import style from './Model.module.css';

function Modal({ isOpen, onClose, onDone }) {
  const [folderName, setFolderName] = useState('');

  if (!isOpen) return null;

  const handleDone = () => {
    onDone(folderName);
    onClose();
  };

  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContent}>
        <button className={style.closeButton} onClick={onClose}>X</button>
        <h2>Create New Folder</h2>
        <input
          type="text"
          placeholder="Enter folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className={style.inputField}
        />
        <div className={style.buttonContainer}>
          <button className={style.doneButton} onClick={handleDone}>Done</button>
          <button className={style.cancelButton} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
