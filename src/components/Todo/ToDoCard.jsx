import React from 'react'
import './todo.css'
import { CiCircleChevRight } from "react-icons/ci";
import { TfiAlignLeft } from "react-icons/tfi";
import { AiOutlinePaperClip } from "react-icons/ai";

const ToDoCard = ({title, image, date, attach}) => {
  return (
    <div className='todo'>
        <div className='imageContainer'>
            {image && <img src={image} className='image' alt=""/>}
        </div>
        <h3 className='title'>{title}</h3>
        <div className='todo-footer'>
            <TfiAlignLeft className='footer' />
            <CiCircleChevRight className='footer' />
            <p className='footer'>{date}</p>
            <AiOutlinePaperClip className='footer' />
            <p className='footer'>{attach}</p>
        </div>
    </div>
  )
}

export default ToDoCard
