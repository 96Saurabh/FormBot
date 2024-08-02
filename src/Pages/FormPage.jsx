import { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Flow from '../Components/Workspace/Flow/Flow';
import { createChat, getChats, deleteChat, getMessagesByChat } from '../api/form.api';

function FormPage() {
  const [fields, setFields] = useState([]);
  const [fromName, setFromName] = useState("");
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);
  const [folderId, setFolderId] = useState(null);

  useEffect(() => {
    const storedUserId = JSON.parse(localStorage.getItem('userId'));
    const storedFolderId = JSON.parse(localStorage.getItem('folderId'));
    setUserId(storedUserId);
    setFolderId(storedFolderId);
    handleFetchChats();
  }, []);

  const handleSave = async ({ fromName }) => {
    console.log('Saving chat with:', { fromName, fields, userId, folderId });

    try {
      const chatPostPayload = {
        formName: fromName,
        fields,
        userId,
        folderId,
      };

      const response = await createChat(chatPostPayload);
      console.log('Chat saved:', response);
      setChats([...chats, response]);
      alert('Chat saved successfully');
    } catch (error) {
      alert('Error saving chat');
    }
  };

  const handleFetchChats = async () => {
    try {
      const response = await getChats();
      setChats(response.chats || []);
    } catch (error) {
      alert('Error fetching chats');
    }
  };

  const handleDeleteChat = async (chatId) => {
    try {
      await deleteChat(chatId);
      setChats(chats.filter(chat => chat._id !== chatId));
      alert('Chat deleted successfully');
    } catch (error) {
      alert('Error deleting chat');
    }
  };

  const handleFetchMessagesByChat = async (chatId) => {
    try {
      const response = await getMessagesByChat(chatId);
      setMessages(response.messages || []);
    } catch (error) {
      alert('Error fetching messages');
    }
  };

  return (
    <div>
      <Navbar 
        fromName={fromName} 
        setFromName={setFromName} 
        handleSave={handleSave} 
      />
      <Flow fields={fields} setFields={setFields} />
    </div>
  );
}

export default FormPage;
