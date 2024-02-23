import React, { useState } from 'react'
import './maincard.css'
import Modal from '../Modal/Modal'
import { Data } from '../../utils/data'
import ToDoCard from '../Todo/ToDoCard'

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
  
  const filteredData = Data.filter(item => item.status === status);

  return (
    <div className='maincard'>
        <div>
          <h3 className='heading'>{heading}</h3>
          <div className="todo-cards-container">
          {filteredData.map(item => (
            <ToDoCard key={item.id} title={item.title} image={item.image} date={item.date} attach={item.attach} />
          ))}
          </div>
        </div>
        <button className='addNewTask' onClick={handleClick}>Add a Card...</button>
        {showModal && <Modal onCloseClick={handleCloseModal} />}
    </div>
  )
}

export default MainCard
