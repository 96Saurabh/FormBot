import { useState } from "react";
import axios from "axios";

function ShareButton() {
  // Use a fixed formId value here
  const formId = "66ab8752a921ac8af7374acd";
  const [shareableUrl, setShareableUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState(null); // State to store form data

  const handleShareClick = async () => {
    try {
      // Fetch the shareable URL
      const response = await axios.get(`https://formbot-backend-5fip.onrender.com/api/v1/chat/generate-shareable-url/${formId}`);
      const url = response.data.shareableUrl;
      console.log("Form ID in ShareButton:", formId);
      setShareableUrl(url);

      // Fetch the form data
      const formResponse = await axios.get(`https://formbot-backend-5fip.onrender.com/api/v1/chat/getsingle-form/${formId}`);
      const form = formResponse.data;
      setFormData(form);
      console.log("Form data:", form);

      // Copy the URL to the clipboard
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000); // Hide the message after 3 seconds
      }).catch(err => {
        console.error("Failed to copy: ", err);
      });
    } catch (error) {
      console.error("Error generating shareable URL or fetching form data:", error);
    }
  };

  return (
    <div>
      <button onClick={handleShareClick}>Share</button>
      {copied && <p>Link copied to clipboard!</p>}
      {shareableUrl && (
        <div>
          <p>Share this link:</p>
          <a href={shareableUrl} target="_blank" rel="noopener noreferrer">{shareableUrl}</a>
        </div>
      )}
      {formData && (
        <div>
          <h3>Form Details:</h3>
          <p><strong>ID:</strong> {formData._id}</p>
          <p><strong>Name:</strong> {formData.formName}</p>
          {/* Display other form details as needed */}
        </div>
      )}
    </div>
  );
}

export default ShareButton;
