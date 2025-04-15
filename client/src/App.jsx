import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import About from './pages/About';
import SignUp from './pages/SignUp';

import Profile from './pages/Profile'
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';
import Chat from './pages/Chat';
import ChatContainer from './components/ChatContainer';
import { Toaster } from 'react-hot-toast';
import PaymentForm from './components/PaymentForm';
import Failure from './components/Failure';
import Success from './components/Success';


export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/sign-in' element={<SignIn />}/>
      <Route path='/sign-up' element={<SignUp />}/>
      <Route path='/about' element={<About />}/>
      <Route path='/listing/:listingId' element={<Listing />}/>
     
      <Route path='/search' element={<Search/>}/>
      <Route path='/payment' element={<PaymentForm/>}/>
      <Route path='/payment-success' element={<Success/>}/>
      <Route path='/payment-failure' element={<Failure/>}/>
   
      <Route element={<PrivateRoute/>}>

      <Route path='/profile' element={<Profile />} />
      <Route path='/create-listing'element={<CreateListing />}></Route>
      <Route path='/update-listing/:listingId'element={<UpdateListing />}></Route>
      <Route path='/chat/' element={<Chat />}></Route>
      <Route path='/chat/:userId' element={<ChatContainer />}></Route>
    </Route>
    </Routes>
    <Toaster/>
    </BrowserRouter>
  );
}





/*<Route path='/update-listing/listingId'element={<UpdateListing />}></Route>
yesma bhayeko listingId maps to the listing of the dog.
*/
