import React, { useState } from 'react'
import './maincard.css'
import Modal from '../Modal/Modal'

const MainCard = ({status}) => {

  const [showModal, setShowModal] = useState(false);

  const categoryHeadings = {
    resources: "Resources",
    todo: "To Do",
    doing: "Doing",
    done: "Done"
  };

  const heading = categoryHeadings[status];

  const handleClick = () => {
    if(!showModal){
      setShowModal(true);
    }
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }
  
  return (
    <div className='maincard'>
        <h3 className='heading'>{heading}</h3>
        <button className='addNewTask' onClick={handleClick}>Add a Card...</button>
        {showModal && <Modal onCloseClick={handleCloseModal} />}
    </div>
  )
}

export default MainCard
