import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Books from './components/Books';
import Mybag from './components/Mybag';
import Readers from './components/Readers';
import Returns from './components/Returns';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='App'>
    <Navbar/>
    <Routes>
      <Route path='' element={<Home/>}/> 
      <Route path='/Books' element={<Books/>}/> 
      <Route path='/Mybag' element={<Mybag/>}/> 
      <Route path='/Readers' element={<Readers/>}/> 
      <Route path='/Returns' element={<Returns/>}/> 
    </Routes>
    </div>
  );
}

export default App;
