import React from 'react'
import './main.css'
import MainCard from '../MainCard/MainCard'

const Main = () => {
  
  return (
    <div className='main'>
      <MainCard status="resources" />
      <MainCard status="todo" />
      <MainCard status="doing" />
      <MainCard status="done" />
    </div>
  )
}

export default Main
