import React from 'react'
import Header from '../Components/Header'

const NotFoundPage = ({cart}) => {
  return (
    <>
    <Header cart={cart}/>
    <div className='not-found'>
        <h1>404</h1>
        <h2>Page Not Found.</h2>
    </div>
    </>
  )
}

export default NotFoundPage