import React, { useState } from 'react';
import './Slider.css';

const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="slider">
      <button className="slider-button prev" onClick={goToPrev}>
        &#10094;
      </button>
      <div className="slider-content">
        <div
          className="slides"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="slide">
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      <button className="slider-button next" onClick={goToNext}>
        &#10095;
      </button>
    </div>
  );
};

export default Slider;