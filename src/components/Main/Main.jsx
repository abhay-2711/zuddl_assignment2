import React, { useState } from 'react'
import './main.css'
import MainCard from '../MainCard/MainCard'
import Modal from '../Modal/Modal'
import { useSelector, useDispatch } from 'react-redux';
import { openModal, closeModal } from '../../store/modalSlice';

const Main = () => {

  const [editTodo, setEditTodo] = useState(null);
  const [cardStatus, setCardStatus] = useState('resources');

  const isOpen = useSelector(state => state.modal.isOpen);

  const dispatch = useDispatch();

  const handleClick = (status) => {
    setCardStatus(status);
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
          <MainCard key={index} status={status} onStatus={handleClick} onEdit={handleEditTodo} />
        ))}
      </div>
      {isOpen && <Modal cardStatus={cardStatus} onCloseClick={handleCloseModal} editTodo={editTodo} />}
    </div>
  )
}

export default Main
