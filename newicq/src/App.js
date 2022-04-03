import './App.css';
import Login from './login/login';


import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import Register from "./enroll/register";
import MainScreenChats from './mainScreenChats/mainScreenChats';

function App() {
  return (
    <div className="App">
      {/*<Register/>*/}
      {/*<Login/>*/}
      {<MainScreenChats/>}
      {/*
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/enroll' element={<Register/>}></Route>
    </Routes>
    <div>Not register?
      <Link to="/enroll" className="link-primary">Click here </Link>
    
      to register</div> 
   
    </BrowserRouter>
  */}
    </div>
  );
}

export default App;
