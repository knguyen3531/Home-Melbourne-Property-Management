import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePageStyles.css'; // Import the CSS file
import 'bootstrap/dist/css/bootstrap.min.css';

// Import your images with the correct paths
import handshakeImage1 from './Assets/Hand Shake 1.jpg';
import handshakeImage2 from './Assets/Hand Shake 2.jpg';
import realEstateImage from './Assets/Reals Estate.jpg';

function HomePage() {
  // State to toggle between images
  const [currentImage, setCurrentImage] = useState(handshakeImage1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(currentImage === handshakeImage1 ? handshakeImage2 : handshakeImage1);
    }, 2000); // Change image every 2 seconds
    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="container">
      <header className="jumbotron">
        <h1 className="display-4">Welcome to Home Melbourne Property Management</h1>
        <p className="lead">Your all-in-one solution for property management.</p>
        <hr className="my-4" />
        <p>Manage your properties, tenants, and maintenance requests with ease.</p>
        <Link to="/login" className="btn btn-primary btn-lg" role="button">Get Started</Link>
      </header>

      {/* Image section */}
      <section className="image-section my-5">
        <div className="image-container">
          <img
            src={currentImage}
            alt="Manage properties"
            className="main-image"
          />
          <img
            src={realEstateImage}
            alt="Real Estate"
            className="side-image"
          />
        </div>
      </section>

      {/* Our Story section */}
      <section className="our-story-section my-5">
        <div className="our-story-container">
          <h2 className="our-story-heading">Our Story</h2>
          <div className="our-story-content">
            <div className="bubble-box">
              <p>
                In the heart of Melbourne, where the city's pulse beats with a rhythm of vibrant urban life and cultural diversity, Home Melbourne Property Management was born from a vision to harmonize property management with the dynamic lifestyle of its residents.
              </p>
              <p>
                Our founders, Alex Thompson and Jamie Lee, both seasoned real estate professionals and long-time Melburnians, witnessed the growing complexity of property management in a booming market. They dreamt of a service that could simplify this complexity — a service not only built on robust technology but also on the warmth of human connection.
              </p>
              <p>
                Starting with just a small office and a handful of properties, their dedication quickly resonated with property owners. Stories of their personable approach, attention to detail, and the ease with which they turned property management into a seamless experience spread across the city.
              </p>
              <p>
                Today, Home Melbourne stands as a testament to their vision, managing hundreds of properties while still maintaining that personal touch. Our team is a family of passionate individuals who believe in creating communities, not just buildings. We celebrate the uniqueness of each property and the individuality of every tenant.
              </p>
              <p>
                As we continue to grow, our commitment remains the same: to provide a management experience that feels like home, powered by innovation and driven by the values of our community. Join us on this journey and be a part of our story.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Other sections continue */}
    </div>
  );
}

export default HomePage;
