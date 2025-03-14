import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from './Slider';
import './CountryPage.css';
import Navbar from './Navbar';

const CountryPage = () => {
  const { id } = useParams();
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/country/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Country Data:', data);
        setCountryData(data);
        setLoading(false);

      
        if (data.city) {
          fetch(`http://localhost:3000/weather/current?city=${data.city}`)
            .then((response) => response.json())
            .then((weather) => {
              console.log('Current Weather:', weather);
              setCurrentWeather(weather);
            })
            .catch((error) => {
              console.error('Error fetching current weather:', error);
            });

          fetch(`http://localhost:3000/weather/forecast?city=${data.city}`)
            .then((response) => response.json())
            .then((forecastData) => {
              console.log('Weather Forecast:', forecastData);
              setForecast(forecastData);
            })
            .catch((error) => {
              console.error('Error fetching weather forecast:', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error fetching country data:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!countryData) return <p>Country not found</p>;

  const images = [
    countryData.img1,
    countryData.img2,
    countryData.img3,
    countryData.img4,
    countryData.img5,
    countryData.img6,
  ].filter(Boolean);

  return (
  <>
  <Navbar />
  
    <div className="country-page">
      <h2>{countryData.country}</h2>
      <h3>{countryData.city}</h3>
      <p>
        <strong>Visit Dates: </strong>
        {new Date(countryData.visit_date_from).toLocaleDateString()} -{' '}
        {new Date(countryData.visit_date_to).toLocaleDateString()}
      </p>

      <section id="country-gallery">
        <Slider images={images} />
      </section>

      <section className="country-content">
        <div className="description-text-section">
          <p className="description-text">{countryData.country_description}</p>
        </div>

        <div className="weather-info">
          {currentWeather && (
            <div className="weather-section">
              <h4>Current Weather</h4>
              <p>
                <strong>Temperature:</strong> {currentWeather.current.temp_c}°C
              </p>
              <p>
                <strong>Weather:</strong> {currentWeather.current.condition.text}
              </p>
              <img
                src={currentWeather.current.condition.icon}
                alt={currentWeather.current.condition.text}
              />
            </div>
          )}

          {forecast && (
            <div className="forecast-section">
              <h4>3-Day Forecast</h4>
              <div className="forecast-days">
                {forecast.forecast.forecastday.map((day, index) => (
                  <div key={index} className="forecast-day">
                    <p>
                      <strong>Date:</strong> {new Date(day.date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Temperature:</strong> {day.day.avgtemp_c}°C
                    </p>
                    <p>
                      <strong>Weather:</strong> {day.day.condition.text}
                    </p>
                    <img
                      src={day.day.condition.icon}
                      alt={day.day.condition.text}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
    </>  
  );
};

export default CountryPage;