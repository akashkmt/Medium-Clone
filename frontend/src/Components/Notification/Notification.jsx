import React from 'react'
import Left from '../LeftParts/left'
import Right from '../RightParts/right'
import "./Notification.css"
const Notification = () => {
  return (
    <>
     <div className="main">
        <Left/>
            <div className="div2">
              <h1>Notifications</h1>
              <div className="flex">
                <p>All</p>
                <p>Responses</p>
              </div>
              <div className="hrb"></div>
              <div className="flex1">
               <p>You're all caught up.</p>
               <p style={{color:"#1a8917"}} className='p2'>Your stats</p>
              </div>
            </div>
            <Right/>
            </div>   
    </>
  )
}

export default Notification