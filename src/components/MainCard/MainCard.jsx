import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../../store/modalSlice';
import './maincard.css'
import Modal from '../Modal/Modal'
import ToDoCard from '../Todo/ToDoCard'

const MainCard = ({status}) => {

  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

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
      dispatch(openModal());
    }
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }
  
  const filteredData = useSelector(state => state.todo.todos.filter(item => item.status === status));

  return (
    <div className='maincard'>
        <div>
          <h3 className='heading'>{heading}</h3>
          <div className="todo-cards-container">
          {filteredData.map(todo => (
            <ToDoCard key={todo.id} todo={todo} />
          ))}
          </div>
        </div>
        <button className='addNewTask' onClick={handleClick}>Add a Card...</button>
        {showModal && <Modal onCloseClick={handleCloseModal} />}
    </div>
  )
}

export default MainCard
