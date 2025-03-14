import { useContext, useState } from 'react';
import AuthContext from '../core/AuthContext';
import { useNavigate } from 'react-router';
import Navbar from './Navbar';

const url = 'http://localhost:3000/login';

const Login = () => {
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email: formFields.email,
      password: formFields.password,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Login failed');
      }

      const result = await response.json();
      if (result.found) {
        login({ userId: result.data.id, name: result.data.email }); // Passe dies an deine Datenstruktur an
        navigate('/');
      } else {
        setError('Wrong credentials');
      }
    } catch (error) {
      setError(error.message);
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <Navbar />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="email">E-mail:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formFields.email}
            onChange={handleChange}
          />
        </p>
        <p>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formFields.password}
            onChange={handleChange}
          />
        </p>
        <p>
          <input type="submit" id="btSubmit" value="Login" />
        </p>
      </form>
    </>
  );
};

export default Login;