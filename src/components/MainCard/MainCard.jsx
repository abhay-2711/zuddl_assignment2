import React, { useMemo } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import './maincard.css'
import ToDoCard from '../Todo/ToDoCard'

const MainCard = ({id, index, status, onStatus, onEdit}) => {

  const categoryHeadings = {
    resources: "Resources",
    todo: "To Do",
    doing: "Doing",
    done: "Done"
  };

  const onButtonClick = () => {
    onStatus(status);
  }

  const heading = categoryHeadings[status];
  
  const filteredData = useSelector((state) => state.todo.todos);
  
  const memoizedFilteredData = useMemo(
    () => filteredData.filter((item) => item.status === status),
    [filteredData, status]
  );

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
    <Droppable droppableId={index.toString()} type="card">
    {(provided) => (
    <div
      {...provided.droppableProps}
      ref={provided.innerRef}
      className='maincard'
    >
      <div>
        <h3 className='heading'>{heading}</h3>
        <div className="todo-cards-container">

        {memoizedFilteredData.map((todo, subIndex) => {
          return (
          <Draggable key={todo.id} draggableId={todo.id.toString()} index={subIndex}>
            {(provided) => (
              <ToDoCard 
                key={todo.id} 
                id={todo.id} 
                index={subIndex} 
                todo={todo} 
                onEdit={onEdit} 
                innerRef={provided.innerRef}
                draggableProps={provided.draggableProps}
                dragHandleProps={provided.dragHandleProps} 
              />
            )}
          </Draggable>
          )})}

        {provided.placeholder}
        </div>
      </div>
      <button className='addNewTask' onClick={onButtonClick}>Add a Card...</button>
    </div>
      )}
    </Droppable>
    </div>
    )}
    </Draggable>
  )
}

export default MainCard
