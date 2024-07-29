import React from 'react'
import { useEffect } from 'react';
import Home from './pages/Home.tsx';
import { connectSocket, socket } from './socket.ts';
import {Route, Routes} from "react-router-dom"
import Boarding from './components/Boarding.tsx';

type Props = {}
function App() {

  useEffect(()=>{
    if(!socket){
      connectSocket();
    }
    socket.on("connect",()=>{
      console.log("socket connected");
    })
},[socket]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Boarding/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
      </Routes>
    </div>
  );
}


export default App;
