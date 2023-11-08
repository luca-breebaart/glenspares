import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Home/home';
import AddCarPartForm from './AddPart/AddCarPartForm';
import Cart from './cart/cart';

function App() {

  return (
    
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/AddPart' element={<AddCarPartForm />} />
      <Route path='/cart' element={<Cart />} />
    </Routes>

  );
}

export default App;
