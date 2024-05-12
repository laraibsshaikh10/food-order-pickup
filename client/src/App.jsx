import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './routes/Home'
import OrderConfirmationPage from './routes/OrderConfirmationPage'
import CartPage from './routes/CartPage'
import MenuItemsPage from './routes/MenuItemsPage'
function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/menu_items' element={<MenuItemsPage />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/order' element={<OrderConfirmationPage />} />
    </Routes>
  )
}

export default App
