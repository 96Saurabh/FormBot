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
        <span className={style.closespan} onClick={onClose}>X</span>
        <h3>Create New Folder</h3>
        <input
          type="text"
          placeholder="Enter folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className={style.inputField}
        />
        <div className={style.buttonContainer}>
          <span className={style.doneButton} onClick={handleDone}>Done</span>
          <span className={style.cancelButton} onClick={onClose}>Cancel</span>
        </div>
      </div>
    </div>
  );
}

export default Modal;
