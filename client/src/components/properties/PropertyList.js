import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PropertyList() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Fetch the properties from your API
    const fetchProperties = async () => {
      const response = await fetch('/api/properties');
      const data = await response.json();
      setProperties(data);
    };

    fetchProperties();
  }, []);

  return (
    <div>
      <h2>Properties</h2>
      <ul>
        {properties.map(property => (
          <li key={property.id}>
            <Link to={`/properties/${property.id}`}>{property.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PropertyList;
