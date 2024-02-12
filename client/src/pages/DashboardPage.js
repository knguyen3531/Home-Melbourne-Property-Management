import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/AuthContext';
import './DashboardPageStyles.css';

function DashboardPage() {
  const [userProperties, setUserProperties] = useState([]);
  const [nextDueDate, setNextDueDate] = useState(null); // State to hold the next due date
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchUserProperties = async () => {
      if (user && user.email && token) {
        const graphqlEndpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:5000/graphql';

        console.log('Making request to:', graphqlEndpoint); 

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
                    rentStatus
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

    // Calculate and set the next due date
    const calculateNextDueDate = () => {
      // Example: Calculate the next due date to be one month from the current date
      const currentDate = new Date();
      const nextMonth = currentDate.getMonth() + 1;
      const nextYear = currentDate.getFullYear();
      const calculatedDueDate = new Date(nextYear, nextMonth, 1); // First day of next month
      setNextDueDate(calculatedDueDate);
    };

    calculateNextDueDate(); // Call the function when component mounts
  }, [user, token]);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div>
        <h2>Next Due Date: {nextDueDate ? nextDueDate.toLocaleDateString() : 'Calculating...'}</h2>
      </div>
      {userProperties.length ? (
        userProperties.map(property => (
          <div key={property.id} className="property-item">
            <h2>{property.address}</h2>
            <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
            <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
            <p><strong>Sqft:</strong> {property.sqft}</p>
            <p><strong>Type:</strong> {property.type}</p>
            {property.amenities && (
              <p><strong>Amenities:</strong> {property.amenities.join(', ')}</p>
            )}
            {property.description && (
              <p><strong>Description:</strong> {property.description}</p>
            )}
            <p><strong>Rent Price:</strong> ${property.rentPrice}</p>
            <p><strong>Rent Status:</strong> {property.rentStatus}</p>
          </div>
        ))
      ) : (
        <p>No properties found for this user.</p>
      )}
    </div>
  );
}

export default DashboardPage;
