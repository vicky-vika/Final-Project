import React, { useContext } from 'react'; 
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NewLocation from './components/NewLocation';
import Footer from './components/Footer';
import Gallery from './components/Gallery';  
import CountryPage from './components/CountryPage';  
import Logout from './components/Logout';
import ProtectedRoute from './components/ProtectedRoute';
import AuthContext from './core/AuthContext';
import Students from './components/Students';
import Login from './components/Login';

function App() {
  const { user } = useContext(AuthContext); 
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} /> 
          <Route path="/country/:id" element={<CountryPage />} /> 
          <Route path="/students" element={<Students />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="/logout" element={<Logout />} />
          <Route path="/newLocation" element={
            <ProtectedRoute user={user}>
              <NewLocation /> 
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;