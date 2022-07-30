import React from 'react'
import "./yourstory.css"
const Postlist = ({post}) => {
  return (
    <div className="postlisting">
    {
     post.map((ele)=>{
       return(
         <div className='listu'>
          <h3>{ele.title}</h3>
          <p>{ele.content} </p>
          <div className="borderlast"></div>
         </div>
       )
     })
    }
  </div>

  )
}

export default Postlist