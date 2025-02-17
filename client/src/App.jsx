import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import About from './pages/About';
import SignUp from './pages/SignUp';
import Donate from './pages/Donate';
import Profile from './pages/Profile'
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';
import News from './pages/News';
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
      <Route path='/donate' element={<Donate />}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/news' element={<News/>}/>
   
   
      <Route element={<PrivateRoute/>}>
      <Route path='/profile' element={<Profile />} />
      <Route path='/create-listing'element={<CreateListing />}></Route>
      <Route path='/update-listing/:listingId'element={<UpdateListing />}></Route>


    </Route>
    </Routes>
    
    </BrowserRouter>
  );
}





/*<Route path='/update-listing/listingId'element={<UpdateListing />}></Route>
yesma bhayeko listingId maps to the listing of the dog.
*/
