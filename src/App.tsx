
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/HomePage'
import { LoginRegisterPage } from './pages/LoginRegisterPage'
import { GlobalStateProvider } from './global/globalState'
import { ProfilePage } from './pages/ProfilePage'
import { CartPage } from './pages/CartPage'
import { FavoritePage } from './pages/FavoritePage'

function App() {

  return (
    <>
    <GlobalStateProvider>
      <BrowserRouter> 
        <Routes>
          <Route path = "login" element = {<LoginRegisterPage />}/>
          <Route path = "home" element = {<HomePage />}/>
          <Route path = "profile" element = {<ProfilePage />}/>
          <Route path = "cart" element = {<CartPage/>}/>
          <Route path = "favorites" element = {<FavoritePage/>} /> 
        </Routes>
      </BrowserRouter>
    </GlobalStateProvider>
      
    </>
  )
}

export default App
