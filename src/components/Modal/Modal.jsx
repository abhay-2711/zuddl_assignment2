import React, { useState } from 'react'
import './modal.css'

const Modal = ({ onCloseClick }) => {

    const handleSubmit = () => {
        console.log('submitting');
    }

    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

  return (
    <div className='modalBackground'>
        <div className='modalContainer'>
            <div className='top'>
            <h3 className='modalTitle'>Create a Task</h3>
            <button className='closeModal' onClick={() => onCloseClick()}>X</button>
            </div>
            <label htmlFor='taskName' className='label'>Task Name</label>
            <input id='taskName' className='modalInput' type='text' placeholder='Enter a task...' />
            <label htmlFor='status' className='label'>Status</label>
            <select id='status' className='modalInput'>
                <option selected value='resources'>Resources</option> 
                <option value='todo'>To Do</option>
                <option value='doing'>Doing</option>
                <option value='done'>Done</option>
            </select>
            <label className='label'>Image</label>
            <label htmlFor='image' className='inputImage'>Choose Image</label>
            <input id='image' className='fileInput' type='file' accept='image/*' onChange={handleImageChange} />
            {imagePreview && (
                <div className='imagePreviewContainer'>
                    <img src={imagePreview} alt='Preview' className='imagePreview' />
                </div>
            )}
            <button className='modalSubmit' onClick={handleSubmit}>Add Card</button>
        </div>
    </div>
  )
}

export default Modal
