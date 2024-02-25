import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import './main.css'
import MainCard from '../MainCard/MainCard'
import Modal from '../Modal/Modal'
import { useSelector, useDispatch } from 'react-redux';
import { openModal, closeModal } from '../../store/modalSlice';
import { moveTodo } from '../../store/todoSlice';

const Main = () => {

  const [editTodo, setEditTodo] = useState(null);
  const [cardStatus, setCardStatus] = useState('resources');

  const isOpen = useSelector(state => state.modal.isOpen);
  const columns1 = useSelector(state => state.todo.columns);

  const dispatch = useDispatch();

  const handleClick = (status) => {
    setCardStatus(status);
    dispatch(openModal()); 
  }

  const handleCardStatusChange = (status) => {
    setCardStatus(status);
  }

  const handleCloseModal = () => {
    setEditTodo(null);
    dispatch(closeModal());
  }

  const handleEditTodo = (todo) => {
    setEditTodo(todo);
    dispatch(openModal());
  }

  const [columns, setColumns] = useState(columns1);

  // useEffect(() => {
  //   console.log(columns);
  // }, [columns]);

  const mainCard = ["resources", "todo", "doing", "done"];

  const handleOnDragEnd = (result) => {
    const { source, destination, type, draggableId } = result;

    console.log(source, destination, type, draggableId);
    if (!destination) return;

    if(source.droppableId === destination.droppableId && source.index===destination.index) return;

    if(type === 'maincard'){
      // handle maincard drag and drop
      setColumns(prevColumns => {
        const updatedColumns = [...prevColumns];
        const [removed] = updatedColumns.splice(source.index, 1);
        updatedColumns.splice(destination.index, 0, removed);

        return updatedColumns;
      });
      dispatch(moveTodo(columns));
    }else if(type === 'card'){
      if(source.droppableId === destination.droppableId){
        // same column
        setColumns(prevColumns => {
          const updatedColumns = [...prevColumns];
          const column = columns[source.droppableId];
          const [removed] = column.todos.splice(source.index, 1);
          column.todos.splice(destination.index, 0, removed);
          
          updatedColumns[source.droppableId] = column;
          return updatedColumns;
        });
        dispatch(moveTodo(columns));
      }else{
        // different column
        setColumns(prevColumns => {
          const updatedColumns = [...prevColumns];
          const sourceColumn = updatedColumns[source.droppableId];
          const destinationColumn = updatedColumns[destination.droppableId];
          const [removed] = sourceColumn.todos.splice(source.index, 1);
          const updatedRemoved = { ...removed, status: mainCard[destination.droppableId] };
          destinationColumn.todos.splice(destination.index, 0, updatedRemoved);

          let temp = {};
          temp = destinationColumn;
          updatedColumns[source.droppableId] = sourceColumn;
          updatedColumns[destination.droppableId] = temp;
          
          return updatedColumns;
        })
        dispatch(moveTodo(columns));
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId='main' direction='horizontal' type='maincard'>
      {(provided) => (
      <div className='main-container'
        {...provided.droppableProps}
        ref={provided.innerRef}
      >
        <div className='main'>
          {columns.map((column, index) => (
            <MainCard key={index} id={column.category} index={index} status={column.category} onStatus={handleClick} onEdit={handleEditTodo} />
          ))}

          {provided.placeholder}
        </div>
        {isOpen && <Modal cardStatus={cardStatus} onCloseClick={handleCloseModal} editTodo={editTodo} onCardStatusChange={handleCardStatusChange} />}
      </div>
      )}
      </Droppable>
    </DragDropContext>
  )
}

export default Main
