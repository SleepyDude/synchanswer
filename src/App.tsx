import './App.css'
import Lobby from './components/Lobby'
import { Routes, Route } from 'react-router-dom';
import Room from './components/Room';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Lobby />}/>
        <Route path='/rooms/:roomId' element={<Room />}/>
      </Routes>
      
    </>
  )
}

export default App
