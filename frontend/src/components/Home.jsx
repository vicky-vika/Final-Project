import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import About from './About';
import Destinations from './Destinations';
import Gallery from './Gallery';
import VisitedMap from './VisitedMap';
import './Home.css';

export const Home = () => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/images')
      .then((response) => response.json())
      .then((data) => {
        setImages(data); 
        if (data.length > 0) {
          setBackgroundImage(data[0]); 
        }
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * images.length);
        setBackgroundImage(images[randomIndex]); // choose random pic
      }, 5000); // change every 5 seconds

      return () => clearInterval(interval); 
    }
  }, [images]);

  return (
    <>
      <Navbar />
      <section
        id="home"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <h2>Zoey M. Romeo's Travel Blog</h2>
      </section>
      <section id="about">
        <About />
      </section>
      <section id="destinations">
        <Destinations />
      </section>
      <section id="gallery">
        <Gallery />
      </section>
      <section id="map">
        <h2>Visited Locations</h2>
        <VisitedMap />
      </section>
    </>
  );
};

export default Home;