import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import './NewLocation.css';

const NewLocation = () => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [visitDateFrom, setVisitDateFrom] = useState("");
  const [visitDateTo, setVisitDateTo] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [img4, setImg4] = useState("");
  const [img5, setImg5] = useState("");
  const [img6, setImg6] = useState("");
  const [countryDescription, setCountryDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newLocation = {
      country,
      city,
      visit_date_from: visitDateFrom,
      visit_date_to: visitDateTo,
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      country_description: countryDescription,
    };

    try {
      const response = await fetch('http://localhost:3000/details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLocation),
      });

      if (response.ok) {
        alert('Location added successfully!');
        navigate('/'); // redirect to the homepage or gallery
      } else {
        alert('Failed to add location');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the location');
    }
  };

  return (
    <>
      <Navbar />
      <section>
        <h1 className="heading">Suggest a Location to Visit</h1>
        <form id="newLocation" onSubmit={handleSubmit}>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <label htmlFor="visitDateFrom">Visited from: </label>
          <input
            type="date"
            id="visitDateFrom"
            name="visitDateFrom"
            value={visitDateFrom}
            onChange={(e) => setVisitDateFrom(e.target.value)}
            required
          />
          <label htmlFor="visitDateTo">Visited to: </label>
          <input
            type="date"
            id="visitDateTo"
            name="visitDateTo"
            value={visitDateTo}
            onChange={(e) => setVisitDateTo(e.target.value)}
            required
          />
          <label htmlFor="countryDescription">Country Description</label>
          <textarea
            id="countryDescription"
            name="countryDescription"
            value={countryDescription}
            onChange={(e) => setCountryDescription(e.target.value)}
            required
          ></textarea>
          <label htmlFor="img1">Image URL 1</label>
          <input
            type="text"
            id="img1"
            name="img1"
            value={img1}
            onChange={(e) => setImg1(e.target.value)}
          />
          <label htmlFor="img2">Image URL 2</label>
          <input
            type="text"
            id="img2"
            name="img2"
            value={img2}
            onChange={(e) => setImg2(e.target.value)}
          />
          <label htmlFor="img3">Image URL 3</label>
          <input
            type="text"
            id="img3"
            name="img3"
            value={img3}
            onChange={(e) => setImg3(e.target.value)}
          />
          <label htmlFor="img4">Image URL 4</label>
          <input
            type="text"
            id="img4"
            name="img4"
            value={img4}
            onChange={(e) => setImg4(e.target.value)}
          />
          <label htmlFor="img5">Image URL 5</label>
          <input
            type="text"
            id="img5"
            name="img5"
            value={img5}
            onChange={(e) => setImg5(e.target.value)}
          />
          <label htmlFor="img6">Image URL 6</label>
          <input
            type="text"
            id="img6"
            name="img6"
            value={img6}
            onChange={(e) => setImg6(e.target.value)}
          />
          <button type="submit">Submit Location</button>
        </form>
      </section>
    </>
  );
};

export default NewLocation;