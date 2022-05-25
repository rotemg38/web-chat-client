import './App.css';
import Login from './login/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from "./enroll/register";
import MainScreenChats from './mainScreenChats/mainScreenChats';
import { useEffect } from 'react';
import {disConnectUser, getConnectedUser} from './dbHandle/dbHardcoded'


function App() {

  useEffect(()=>{
    async function fetchData(){ 
      await getConnectedUser();
    }
    fetchData();
    
  }, []);

  const logOut = async (e)=>{
    await disConnectUser();
    window.location.assign("http://localhost:3000/");
  }
  return (
    <> 
    <header>
        <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
        <div className="menu">
                <a className="navbar-brand brand" href="http://localhost:3000/"><h2>NewIcq</h2></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                    <ul className="navbar-nav flex-grow-1">
                        <li className="nav-item">
                            <a className="nav-link text-dark" href="http://localhost:5000/">Rate Our App</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark" href="http://localhost:3000/chats">Chats</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark" href="http://localhost:3000/">LogIn</a>
                        </li>
                        <li className="nav-item">
                          <button className="btn btn-link nav-link text-dark" onClick={logOut}>LogOut</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>

    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/enroll' element={<Register />}></Route>
          <Route path='/chats' element={<MainScreenChats />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;
