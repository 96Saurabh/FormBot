import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { RiArrowDropDownLine, RiDeleteBin6Line } from "react-icons/ri";
import { FiFolderPlus } from "react-icons/fi";
import style from "./Workspace.module.css";
import Modal from '../../model/Model';
import { createFolder, getFolders, deleteFolder } from "../../../api/chat.api";

function Workspace() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Hook for redirection

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    try {
      setLoading(true);
      const response = await getFolders();
      setFolders(response.folders || []);
    } catch (error) {
      console.error("Error fetching folders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (folderId) => {
    try {
      await deleteFolder(folderId);
      fetchFolders(); // Refresh the list of folders
    } catch (error) {
      console.error("Error deleting folder:", error);
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
        console.log("Folder created:", response);
        fetchFolders(); // Refresh the list of folders
      } catch (error) {
        console.error("Error creating folder:", error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear all local storage data
    navigate('/')
  };

  const handleCreateTypebot = () => {
    if (!selectedFolder) {
      alert("Please select a folder name.");
      return;
    }
    const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
    if (userId) {
      navigate(`/formpage?folderId=${selectedFolder}&userId=${userId}`);
    }
  };


  const logout = () => {
    localStorage.clear();
    navigate("/login");
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
            <div key={folder._id} className={style.subfolder} onClick={() => setSelectedFolder(folder._id)}>
              <span>{folder.folderName}</span>
              <span onClick={(e) => { e.stopPropagation(); handleDelete(folder._id); }}>
                <RiDeleteBin6Line style={{ color: "red" }} />
              </span>
            </div>
          ))
        )}
      </div>
      <div className={style.foldercontainer}>
        {selectedFolder ? (
          <div className={style.createtypebot} onClick={handleCreateTypebot}>
            <h4>
              <FaPlus style={{ margin: "50px 10px 10px 70px" }} />
            </h4>
            <h4 style={{ margin: "12px 0px 10px 22px" }}>Create a typebot</h4>
          </div>
        ) : (
          <div className={style.createtypebot} onClick={handleCreateTypebot}>
            <h4>
              <FaPlus style={{ margin: "50px 10px 10px 70px" }} />
            </h4>
            <h4 style={{ margin: "12px 0px 10px 22px" }}>Create a typebot</h4>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} onDone={handleDone} />
    </div>
  );
}

export default Workspace;
