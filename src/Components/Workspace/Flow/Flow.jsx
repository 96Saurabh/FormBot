import { useState } from 'react';
import axios from 'axios';
import style from './Flow.module.css';
import { LuFilm } from 'react-icons/lu';
import { PiChatLight } from 'react-icons/pi';
import { CiImageOn } from 'react-icons/ci';
import { PiGifLight } from 'react-icons/pi';
import { PiTextTBold } from 'react-icons/pi';
import { MdOutlineNumbers } from 'react-icons/md';
import { MdAlternateEmail } from 'react-icons/md';
import { BsTelephone } from 'react-icons/bs';
import { CiCalendarDate } from 'react-icons/ci';
import { FaRegStar } from 'react-icons/fa6';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { ImFlag } from 'react-icons/im';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/v1/chat/chats', { fields });
      console.log('Flow created:', res.data);
      setFields([]);
      setFieldCounts({});
    } catch (error) {
      console.error('Error creating flow:', error);
    }
  };

  return (
    <div>
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
          <form onSubmit={handleSubmit}>
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
                      readOnly={field.readOnly} // Make input read-only if the flag is set
                    />
                  </div>
                </div>
              </div>
            ))}
            <button type="submit" className={style.saveButton}>
              Save Flow
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Flow;
