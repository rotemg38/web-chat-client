import './App.css';
import Login from './login/login';
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Register from "./enroll/register";
import MainScreenChats from './mainScreenChats/mainScreenChats';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/enroll' element={<Register/>}></Route>
        <Route path='/chats' element={<MainScreenChats/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
