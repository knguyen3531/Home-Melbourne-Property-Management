// client/src/pages/DashboardPage.js

import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/AuthContext';
import './DashboardPageStyles.css';

function DashboardPage() {
  const [userProperties, setUserProperties] = useState([]);
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchUserProperties = async () => {
      if (user && user.email && token) {
        const graphqlEndpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:5000/graphql'; // Fallback to a default value

        console.log('Making request to:', graphqlEndpoint); // For debugging

        try {
          const response = await fetch(graphqlEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              query: `
                query GetPropertiesByUser($userEmail: String!) {
                  getPropertiesByUser(userEmail: $userEmail) {
                    id
                    address
                    bedrooms
                    bathrooms
                    sqft
                    type
                    amenities
                    description
                    rentPrice
                  }
                }
              `,
              variables: {
                userEmail: user.email,
              },
            }),
          });

          const { data, errors } = await response.json();
          if (errors) {
            console.error('GraphQL Errors:', errors);
            throw new Error('GraphQL Errors');
          }
          if (data.getPropertiesByUser) {
            setUserProperties(data.getPropertiesByUser);
          } else {
            throw new Error('Failed to fetch properties');
          }
        } catch (error) {
          console.error('Error fetching user properties:', error);
        }
      }
    };

    fetchUserProperties();
  }, [user, token]);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      {userProperties.length ? (
        userProperties.map(property => (
          <div key={property.id} className="property-item">
            <h2>{property.address}</h2>
            <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
            <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
            <p><strong>Sqft:</strong> {property.sqft}</p>
            <p><strong>Type:</strong> {property.type}</p>
            {/* Render amenities if they exist */}
            {property.amenities && (
              <p><strong>Amenities:</strong> {property.amenities.join(', ')}</p>
            )}
            {property.description && (
              <p><strong>Description:</strong> {property.description}</p>
            )}
            <p><strong>Rent Price:</strong> ${property.rentPrice}</p>
          </div>
        ))
      ) : (
        <p>No properties found for this user.</p>
      )}
    </div>
  );
}

export default DashboardPage;
