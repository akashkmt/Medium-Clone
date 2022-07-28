import React from 'react'
import Left  from "./LeftPart/left";
import Post from './midPart/Post';
import Right  from "./RightPart/right";

export default function Homepage() {
  return (
    <div>
        <Left/>
        
        <Right/>
        <Post/>
    </div>
  )
}
