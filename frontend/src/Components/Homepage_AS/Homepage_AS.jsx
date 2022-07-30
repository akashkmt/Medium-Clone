import React from 'react'
import Left  from "./LeftPart/left";
import Posts from './midPart/Posts';
import SinglePost from './midPart/singlePost';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Right  from "./RightPart/right";

export default function Homepage() {
  return (
    <div>
        <Left/>
        
        <Right/>

        <BrowserRouter>
          <Routes>
            <Route path="/:postId" element={<SinglePost />} />
            <Route path="/" element={<Posts/>} />
            <Route path="/notification" element={<Posts/>} />
            <Route path="/lists" element={<Posts/>} />
            <Route path="/stories" element={<Posts/>} />
            <Route path="/new-story" element={<Posts/>} />
          </Routes>
        </BrowserRouter>
    </div>
  )
}