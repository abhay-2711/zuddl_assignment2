import React, { useState } from 'react'
import './main.css'
import MainCard from '../MainCard/MainCard'
import Modal from '../Modal/Modal'
import { useSelector, useDispatch } from 'react-redux';
import { openModal, closeModal } from '../../store/modalSlice';

const Main = () => {

  const [editTodo, setEditTodo] = useState(null);

  const isOpen = useSelector(state => state.modal.isOpen);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openModal());
  }

  const handleCloseModal = () => {
    setEditTodo(null);
    dispatch(closeModal());
  }

  const handleEditTodo = (todo) => {
    setEditTodo(todo);
    dispatch(openModal());
  }

  const category = ['resources', 'todo', 'doing', 'done'];

  return (
    <div className='main-container'>
      <div className='main'>
        {category.map((status, index) => (
          <MainCard key={index} status={status} onButtonClick={handleClick} onEdit={handleEditTodo} />
        ))}
      </div>
      {isOpen && <Modal onCloseClick={handleCloseModal} editTodo={editTodo} />}
    </div>
  )
}

export default Main
