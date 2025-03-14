import { useContext, useEffect } from 'react';
import AuthContext from '../core/AuthContext';
import { useNavigate } from 'react-router';
import Navbar from './Navbar';
import Home from './Home';

const Logout = () => {
  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();
  
  useEffect(() => {
    logout();
    navigate('/')
  },[]);

  // return null
  return 
  <>
  <Navbar />
  <Home />
  </>
};

export default Logout;