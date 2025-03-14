import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import '../index.css';

const Gallery = () => {
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  // Fetch data from the details table
  const fetchCities = () => {
    fetch('http://localhost:3000/details') // Updated endpoint
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCities(data);
        } else {
          console.error('Invalid response format:', data);
          setCities([]);
        }
      })
      .catch((error) => console.error('Error while loading cities:', error));
  };

  useEffect(() => {
    fetchCities();
  }, []);

  // Handle deletion of a location
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/details/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Location deleted successfully!');
        fetchCities(); // Refresh the list
      } else {
        alert('Failed to delete location');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while deleting the location');
    }
  };


  return (
    <div className="gallery-cont">
      <div className="gallery">
        {cities.map((city) => (
          <div key={city.id} className="card">
            <Link to={`/country/${city.id}`} className="picture-link">
              <div className="overlay">
                <img src={city.img1} alt={city.city} />
                <div className="text-container">
                  <h3>{city.country}</h3>
                  <p>{city.city}</p>
                  <p className="timestamp">
                    <time dateTime={city.visit_date_from}>
                      {new Date(city.visit_date_from).toLocaleDateString()}
                    </time>
                  </p>
                </div>
              </div>
            </Link>
            <div className="actions">
              <button onClick={() => handleDelete(city.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;