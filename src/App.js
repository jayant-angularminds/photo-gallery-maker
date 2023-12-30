import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Gallery from './components/Gallery';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
     <Route path='/' element={<Gallery/>}/>
     </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
