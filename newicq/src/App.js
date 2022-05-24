import './App.css';
import Login from './login/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from "./enroll/register";
import MainScreenChats from './mainScreenChats/mainScreenChats';
import { useState, useEffect } from 'react';
import {HubConnectionBuilder} from '@microsoft/signalr';


function App() {

  var [connection, setConnection] = useState(null);

  useEffect(async ()=>{
    var hubConnection = new HubConnectionBuilder().withUrl("http://localhost:5067/hubs/msgs").build();
    
    setConnection(hubConnection);

    await hubConnection.start();

  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/enroll' element={<Register />}></Route>
          <Route path='/chats' element={<MainScreenChats connection={connection}/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
