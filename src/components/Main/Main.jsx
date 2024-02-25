import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import './main.css'
import MainCard from '../MainCard/MainCard'
import Modal from '../Modal/Modal'
import { useSelector, useDispatch } from 'react-redux';
import { openModal, closeModal } from '../../store/modalSlice';
import { Data } from '../../utils/data';

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

  const [columns, setColumns] = useState([
    {
      category: 'resources',
      todos: Data.filter((todo) => todo.status === 'resources'),
    },
    {
      category: 'todo',
      todos: Data.filter((todo) => todo.status === 'todo'),
    },
    {
      category: 'doing',
      todos: Data.filter((todo) => todo.status === 'doing'),
    },
    {
      category: 'done',
      todos: Data.filter((todo) => todo.status === 'done'),
    },
  ]);

  console.log(columns);

  useEffect(() => {
    console.log(columns);
  }, [columns]);

  const mainCard = ["resources", "todo", "doing", "done"];

  const handleOnDragEnd = (result) => {
    const { source, destination, type, draggableId } = result;

    console.log(source, destination, type, draggableId);
    if (!destination) return;

    if(source.droppableId === destination.droppableId && source.index===destination.index) return;

    // handle maincard drag and drop
    if(type === 'maincard'){
      const sourceCol = columns[source.index];
      const destinationCol = columns[destination.index];
      console.log(sourceCol, destinationCol);

      const updatedColumns = [...columns];

      const [removed] = updatedColumns.splice(source.index, 1);
      updatedColumns.splice(destination.index, 0, removed);
      
      setColumns(updatedColumns);
      console.log(updatedColumns);
    }else if(type === 'card'){
      if(source.droppableId === destination.droppableId){
        // same column
        const column = columns[source.droppableId];
        const [removed] = column.todos.splice(source.index, 1);
        column.todos.splice(destination.index, 0, removed);
        setColumns({
          ...columns,
          [destination.droppableId]: {
            ...column,
            todos: column.todos,
          }
        });
        console.log(columns);
      }else{
        // different column
        const sourceColumn = columns[source.droppableId];
        const destinationColumn = columns[destination.droppableId];
        const [removed] = sourceColumn.todos.splice(source.index, 1);

        const updatedRemoved = { ...removed, status: mainCard[destination.droppableId] };
        
        destinationColumn.todos.splice(destination.index, 0, updatedRemoved);
        setColumns({
          ...columns,
          [source.droppableId]: {
            ...sourceColumn,
            todos: sourceColumn.todos,
          },
          [destination.droppableId]: {
            ...destinationColumn,
            todos: destinationColumn.todos,
          }
        });
        console.log(columns);
      }
    }
  };

  const category = ['resources', 'todo', 'doing', 'done'];

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId='main' direction='horizontal' type='maincard'>
      {(provided) => (
      <div className='main-container'
        {...provided.droppableProps}
        ref={provided.innerRef}
      >
        <div className='main'>
          {category.map((status, index) => (
            <MainCard key={index} id={status} index={index} status={status} onStatus={handleClick} onEdit={handleEditTodo} />
          ))}

          {provided.placeholder}
        </div>
        {isOpen && <Modal cardStatus={cardStatus} onCloseClick={handleCloseModal} editTodo={editTodo} />}
      </div>
      )}
      </Droppable>
    </DragDropContext>
  )
}

export default Main
