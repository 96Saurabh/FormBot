import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import style from './Flow.module.css';
import { LuFilm } from 'react-icons/lu';
import { PiChatLight, PiGifLight, PiTextTBold } from 'react-icons/pi';
import { CiImageOn, CiCalendarDate } from 'react-icons/ci';
import { MdOutlineNumbers, MdAlternateEmail } from 'react-icons/md';
import { BsTelephone } from 'react-icons/bs';
import { FaRegStar } from 'react-icons/fa6';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { ImFlag } from 'react-icons/im';
import { RxCross1 } from 'react-icons/rx';
import axios from 'axios';
const URL="http://localhost:8000/api/v1/form"
const inputFields = {
  text: { label: 'Text', placeholder: 'Enter your text', type: 'text' },
  image: { label: 'Image', placeholder: 'Enter Image URL', type: 'url' },
  video: { label: 'Video', placeholder: 'Enter Video URL', type: 'url' },
  gif: { label: 'GIF', placeholder: 'Enter GIF URL', type: 'url' },
  inputText: { label: 'Input Text', placeholder: 'Enter Text', type: 'text' },
  inputNumber: { label: 'Input Number', placeholder: 'Enter Number', type: 'number' },
  inputEmail: { label: 'Input Email', placeholder: 'Enter Email', type: 'email' },
  inputPhone: { label: 'Input Phone', placeholder: 'Enter Phone Number', type: 'tel' },
  inputDate: { label: 'Input Date', placeholder: 'Enter Date', type: 'date' },
  inputRating: { label: 'Input Rating', placeholder: 'Enter Rating', type: 'text' },
  inputButton: { label: 'Input Button', placeholder: 'Enter Button Label', type: 'text' },
};

function Flow() {
  const [fields, setFields] = useState([]);
  const [fieldCounts, setFieldCounts] = useState({});
  const [readOnlyFields, setReadOnlyFields] = useState({});
  const [formName, setFormName] = useState('');
  const [formId, setFormId] = useState('');
  const navigate = useNavigate();

  const handleAddField = (label, isReadOnly = false) => {
    const fieldKey = Object.keys(inputFields).find(key => inputFields[key].label === label);
    if (!fieldKey) return;

    const count = fieldCounts[fieldKey] || 0;
    const newCount = count + 1;
    const newField = {
      ...inputFields[fieldKey],
      label: count === 0 ? inputFields[fieldKey].label : `${inputFields[fieldKey].label} ${newCount}`,
      value: '',
      readOnly: isReadOnly, // Set readOnly flag
    };

    setFields([...fields, newField]);
    setFieldCounts({ ...fieldCounts, [fieldKey]: newCount });
    if (isReadOnly) {
      setReadOnlyFields(prev => ({ ...prev, [fieldKey]: true }));
    }
  };

  const handleFieldChange = (index, event) => {
    const newFields = [...fields];
    newFields[index].value = event.target.value;
    setFields(newFields);
  };

  const handleSaveClick = async () => {
    if (!formName) {
      alert("Please enter a form name.");
      return;
    }

    const userId = localStorage.getItem('userId');
    const folderId = "some-folder-id";

    const formData = {
      userId,
      folderId,
      name: formName,
      fields: fields.map(field => ({
        label: field.label,
        value: field.value,
        type: field.type,
        readOnly: field.readOnly,
      })),
    };

    try {
      const response = await axios.post(`${URL}/create-chat`, formData);
      console.log('Form saved:', response.data);
      setFormId(response.data.formId); // Save formId from the response
      alert('Form saved successfully.');
    } catch (error) {
      console.error('Error saving form:', error);
    }
  };

  const handleShareClick = async () => {
    if (formId) {
      try {

        

        const response = await axios.get(`http://localhost:8000/api/v1/form/shareable-link/${formId}`);
        const shareableLink = response.data.shareableLink;
        navigator.clipboard.writeText(shareableLink)
          .then(() => {
            alert('Link copied to clipboard!');
          })
          .catch((error) => {
            console.error('Error copying link to clipboard:', error);
          });

          // Increment view count when the shareable link is requested 
        await axios.get(`${URL}/form/increment-views/${formId}`);
      } catch (error) {
        console.error('Error fetching shareable link:', error);
      }
    } else {
      alert('Form not saved yet.');
    }
  };
  

  return (
    <div>
      <div className={style.navbar}>
        <input
          type="text"
          placeholder="Enter Form Name"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          className={style.input}
        />
        <div className={style["navbar-center"]}>
          <Link to="">Flow</Link>
          <Link to="/workspace/theme">Theme</Link>
          <Link to="/workspace/response">Response</Link>
        </div>
        <div className={style["navbar-end"]}>
          <span className={style.share} onClick={handleShareClick}>
            Share
          </span>
          <span className={style.save} onClick={handleSaveClick}>
            Save
          </span>
          <Link to="/workspace">
            <span>
              <RxCross1 style={{ color: "red" }} />
            </span>
          </Link>
        </div>
      </div>
      <div className={style.container}>
        <div className={style.leftContainer}>
          <div className={style.mainbody}>
            <h4>Bubbles</h4>
            <div className={style.bubbles}>
              <p className={style.text} onClick={() => handleAddField('Text')}>
                <PiChatLight style={{ color: '#1A5FFF' }} /> Text
              </p>
              <p className={style.text} onClick={() => handleAddField('Image')}>
                <CiImageOn style={{ color: '#1A5FFF' }} /> Image
              </p>
              <p className={style.text} onClick={() => handleAddField('Video')}>
                <LuFilm style={{ color: '#1A5FFF' }} /> Video
              </p>
              <p className={style.text} onClick={() => handleAddField('GIF')}>
                <PiGifLight style={{ color: '#1A5FFF' }} /> GIF
              </p>
            </div>
            <div className={style.inputs}>
              <h4>Inputs</h4>
              <div className={style.inputfield}>
                <p className={style.text} onClick={() => handleAddField('Input Text', true)}>
                  <PiTextTBold style={{ color: 'rgba(255, 165, 76, 1)' }} /> Text
                </p>
                <p className={style.text} onClick={() => handleAddField('Input Number', true)}>
                  <MdOutlineNumbers style={{ color: 'rgba(255, 165, 76, 1)' }} /> Number
                </p>
                <p className={style.text} onClick={() => handleAddField('Input Email', true)}>
                  <MdAlternateEmail style={{ color: 'rgba(255, 165, 76, 1)' }} /> Email
                </p>
                <p className={style.text} onClick={() => handleAddField('Input Phone', true)}>
                  <BsTelephone style={{ color: 'rgba(255, 165, 76, 1)' }} /> Phone
                </p>
                <p className={style.text} onClick={() => handleAddField('Input Date', true)}>
                  <CiCalendarDate style={{ color: 'rgba(255, 165, 76, 1)' }} /> Date
                </p>
                <p className={style.text} onClick={() => handleAddField('Input Rating', true)}>
                  <FaRegStar style={{ color: 'rgba(255, 165, 76, 1)' }} /> Rating
                </p>
                <p className={style.text} onClick={() => handleAddField('Input Button', true)}>
                  <IoMdCheckboxOutline style={{ color: 'rgba(255, 165, 76, 1)' }} /> Buttons
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={style.rightContainer}>
          <div className={style.heading}>
            <div className={style.start}>
              <ImFlag /> Start
            </div>
          </div>
          <form>
            {fields.map((field, index) => (
              <div className={style.inputdata} key={index}>
                <div className={style.field}>
                  <h5>{field.label}</h5>
                  <div>
                    <input
                      type={field.type}
                      name={field.type}
                      placeholder={field.placeholder}
                      className={style.input}
                      value={field.value}
                      onChange={(event) => handleFieldChange(index, event)}
                      readOnly={field.readOnly}
                    />
                  </div>
                </div>
              </div>
            ))}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Flow;
