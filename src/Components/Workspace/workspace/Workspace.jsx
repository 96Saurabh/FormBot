import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { RiArrowDropDownLine, RiDeleteBin6Line } from 'react-icons/ri';
import { FiFolderPlus } from 'react-icons/fi';
import style from './Workspace.module.css';
import Modal from '../../model/Model';
import { createFolder, getFolders, deleteFolder } from '../../../api/chat.api';
import { createChat } from '../../../api/form.api';

function Workspace() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = JSON.parse(localStorage.getItem('userId'));
    setUserId(storedUserId);
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    try {
      setLoading(true);
      const response = await getFolders();
      setFolders(response.folders || []);
    } catch (error) {
      console.error('Error fetching folders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (folderId) => {
    try {
      await deleteFolder(folderId);
      fetchFolders();
    } catch (error) {
      console.error('Error deleting folder:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDone = async (folderName) => {
    if (folderName) {
      try {
        const response = await createFolder({ folderName });
        console.log('Folder created:', response);
        fetchFolders();
      } catch (error) {
        console.error('Error creating folder:', error);
      }
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
};

  const handleCreateTypebotClick = async () => {
    if (selectedFolder) {
      const chatPostPayload = {
        userId: userId,
        folderId: selectedFolder,
        
      };
      try {
        await createChat(chatPostPayload);
        // Navigate or update UI as needed
      } catch (error) {
        console.error('Error creating chat:', error);
      }
    } else {
      alert('Please select a folder to create a typebot');
    }
  };

  return (
    <div>
      <div className={style.centercontainer}>
        <div className={style.dropdown}>
          <button className={style.dropbtn}>
            Dropdown
            <RiArrowDropDownLine />
          </button>
          <div className={style.dropdowncontent}>
            <Link to="/setting">
              <span>Setting</span>
            </Link>
            
              <span onClick={logout}>Logout</span>
            
          </div>
        </div>
      </div>
      <hr />
      <div className={style.topcontainer}>
        <div className={style.folder} onClick={openModal}>
          <span>
            <FiFolderPlus />
          </span>
          <span>Create a Folder</span>
        </div>
        {folders.length > 0 && (
          folders.map((folder) => (
            <div key={folder._id} className={style.subfolder}>
              <span onClick={() => setSelectedFolder(folder._id)}>{folder.folderName}</span>
              <span onClick={(e) => { e.stopPropagation(); handleDelete(folder._id); }}>
                <RiDeleteBin6Line style={{ color: 'red' }} />
              </span>
            </div>
          ))
        )}
      </div>
      <div className={style.foldercontainer}>
        <div className={style.createtypebot} onClick={handleCreateTypebotClick}>
          <h4>
            <FaPlus style={{ margin: '50px 10px 10px 70px' }} />
          </h4>
          <h4 style={{ margin: '12px 0px 10px 22px' }}>Create a typebot</h4>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} onDone={handleDone} />
    </div>
  );
}

export default Workspace;
