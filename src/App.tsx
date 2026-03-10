
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/HomePage'
import { LoginRegisterPage } from './pages/LoginRegisterPage'
import { GlobalStateProvider } from './global/globalState'
import { ProfilePage } from './pages/ProfilePage'
import { CartPage } from './pages/CartPage'
import { FavoritePage } from './pages/FavoritePage'
import { OrderHistoryPage } from './pages/OrderHistoryPage'
import { VouchersPage } from './pages/VouchersPage'
import { MyWalletPage } from './pages/MyWalletPage'
import { SupportPage } from './pages/SupportPage'
import { MyCreditCardsPage } from './pages/MyCreditCardsPage'
import { ServicePage } from './pages/ServicePage'
import { MyReturnsPage } from './pages/MyReturnsPage'
import { MyReviewsPage } from './pages/MyReviewsPage'
import { DeliveryAddressPage } from './pages/DeliveryAddressPage'
import { BillingDetailsPage } from './pages/BillingDetailsPage'
import { SafetySettingsPage } from './pages/SafetySettingsPage'

function App() {

  return (
    <>
    <GlobalStateProvider>
      <BrowserRouter> 
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path = "auth" element = {<LoginRegisterPage />}/>
          <Route path = "home" element = {<HomePage />}/>
          <Route path = "profile" element = {<ProfilePage />}/>
          <Route path = "cart" element = {<CartPage/>}/>
          <Route path = "favorites" element = {<FavoritePage/>} /> 
          <Route path = "order-history" element = {<OrderHistoryPage />}/>
          <Route path = "my-vourchers" element = {<VouchersPage/>} />
          <Route path = "my-wallet" element = {<MyWalletPage/>} />
          <Route path = "support" element = {<SupportPage/>} />
          <Route path = "my-credit-cards" element = {<MyCreditCardsPage/>} />
          <Route path = "service" element = {<ServicePage/>} />
          <Route path = "my-returns" element = {<MyReturnsPage/>} />
          <Route path = "my-reviews" element = {<MyReviewsPage/>} />
          <Route path = "delivery-addresses" element = {<DeliveryAddressPage/>} />
          <Route path = "billing-details" element = {<BillingDetailsPage/>} />
          <Route path = "safety-settings" element = {<SafetySettingsPage/>} />
        </Routes>
      </BrowserRouter>
    </GlobalStateProvider>
      
    </>
  )
}

export default App
