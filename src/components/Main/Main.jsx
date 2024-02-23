import React from 'react'
import './main.css'
import MainCard from '../MainCard/MainCard'
import Modal from '../Modal/Modal'
import { useSelector, useDispatch } from 'react-redux';
import { openModal, closeModal } from '../../store/modalSlice';

const Main = () => {

  const isOpen = useSelector(state => state.modal.isOpen);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openModal());
  }

  const handleCloseModal = () => {
    dispatch(closeModal());
  }

  const category = ['resources', 'todo', 'doing', 'done'];

  return (
    <div className='main-container'>
      <div className='main'>
        {category.map((status, index) => (
          <MainCard key={index} status={status} onButtonClick={handleClick} />
        ))}
      </div>
      {isOpen && <Modal onCloseClick={handleCloseModal} />}
    </div>
  )
}

export default Main
