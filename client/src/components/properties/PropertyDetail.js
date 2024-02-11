import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PropertyDetail() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchPropertyDetail = async () => {
      const response = await fetch(`/api/properties/${propertyId}`);
      const data = await response.json();
      setProperty(data);
    };

    fetchPropertyDetail();
  }, [propertyId]);

  if (!property) return <div>Loading...</div>;

  return (
    <div>
      <h2>{property.name}</h2>
      <p>{property.description}</p>
      {/* Display more property details here */}
    </div>
  );
}

export default PropertyDetail;
