import './App.css';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Home from './pages/home/Home.jsx';
import Profile from './pages/profile/profileL.jsx';
import LoginSignup from './pages/loginSignUp/login.jsx';
import PrivateRoute from './components/privateRoute.jsx';
import BookPage from './pages/book/bookPage.jsx';
import Search from './pages/searchBook.jsx';
function App() {
  return (
    <div>
      
      <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home />} />
        
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile/>} />
        </Route>
        <Route path='/login' element={<LoginSignup/>}/>
        <Route path={`/book/:bookSlug`} element={<BookPage/>}/>
        <Route path={`/books`} element={<Search/>}/>
      </Routes>
     </BrowserRouter>
     
      
    </div>
  );
}

export default App;
