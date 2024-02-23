import React from 'react'
import { useSelector } from 'react-redux';
import './maincard.css'
import ToDoCard from '../Todo/ToDoCard'

const MainCard = ({status, onButtonClick}) => {

  const categoryHeadings = {
    resources: "Resources",
    todo: "To Do",
    doing: "Doing",
    done: "Done"
  };

  const heading = categoryHeadings[status];
  
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
        <button className='addNewTask' onClick={onButtonClick}>Add a Card...</button>
    </div>
  )
}

export default MainCard
