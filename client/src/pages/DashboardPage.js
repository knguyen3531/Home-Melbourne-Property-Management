import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/AuthContext';
import './DashboardPageStyles.css';

function DashboardPage() {
  const [userProperties, setUserProperties] = useState([]);
  const [nextDueDate, setNextDueDate] = useState(null);
  const [formData, setFormData] = useState({
    cardholderName: '',
    cardNumber: '',
    cvv: '',
    expirationDate: ''
  });
  const [isFormFilled, setIsFormFilled] = useState(false);
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchUserProperties = async () => {
      if (user && user.email && token) {
        const graphqlEndpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:5000/graphql';

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
            updateNextDueDate(data.getPropertiesByUser);
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

  const updateNextDueDate = (properties) => {
    const currentDate = new Date();
    const nextMonth = currentDate.getMonth() + 1;
    const nextYear = currentDate.getFullYear();
    const calculatedDueDate = new Date(nextYear, nextMonth, 1); // First day of next month

    properties.forEach(property => {
      if (property.rentStatus === 'paid') {
        calculatedDueDate.setMonth(calculatedDueDate.getMonth() + 2);
      } else if (property.rentStatus === 'unpaid') {
        calculatedDueDate.setMonth(calculatedDueDate.getMonth() + 1);
      }
    });

    setNextDueDate(calculatedDueDate);
  };

  // Function to handle payment submission
  const handlePayment = async (propertyId) => {
    const graphqlEndpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:5000/graphql';

    try {
      const response = await fetch(graphqlEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `
            mutation CreatePayment($propertyId: ID!) {
              createPayment(propertyId: $propertyId) {
                success
                message
              }
            }
          `,
          variables: {
            propertyId,
          },
        }),
      });

      const { data } = await response.json();
      if (data.createPayment.success) {
        alert(data.createPayment.message); // Show success message
        // Update the UI to reflect the payment status change
        setUserProperties(prevProps => {
          const updatedProperties = prevProps.map(property => {
            if (property.id === propertyId) {
              return { ...property, rentStatus: 'paid' };
            }
            return property;
          });

          // Recalculate next due date here with the updated properties
          updateNextDueDate(updatedProperties);

          return updatedProperties;
        });
      } else {
        throw new Error(data.createPayment.message);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Failed to process payment.');
    }
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Function to check if the form is filled
  useEffect(() => {
    const isFilled = Object.values(formData).every(value => value !== '');
    setIsFormFilled(isFilled);
  }, [formData]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <div>
        <h2>Next Due Date: {nextDueDate ? nextDueDate.toLocaleDateString() : 'Calculating...'}</h2>
      </div>
      {userProperties.length ? (
        userProperties.map(property => (
          <div key={property.id} className="property-item">
            <h2 className="property-heading">{property.address}</h2>
            <p className="property-detail"><strong>Bedrooms:</strong> {property.bedrooms}</p>
            <p className="property-detail"><strong>Bathrooms:</strong> {property.bathrooms}</p>
            <p className="property-detail"><strong>Sqft:</strong> {property.sqft}</p>
            <p className="property-detail"><strong>Type:</strong> {property.type}</p>
            {property.amenities && (
              <p className="property-detail"><strong>Amenities:</strong> {property.amenities.join(', ')}</p>
            )}
            {property.description && (
              <p className="property-detail"><strong>Description:</strong> {property.description}</p>
            )}
            <p className="property-detail"><strong>Rent Price:</strong> ${property.rentPrice}</p>
            <p className="property-detail"><strong>Rent Status:</strong> {property.rentStatus}</p>
            {/* Payment form */}
            <form onSubmit={(e) => {
              e.preventDefault();
              handlePayment(property.id);
            }} className="form">
              <div>
                <label className="label">Cardholder Name:</label>
                <input type="text" name="cardholderName" placeholder="Name" value={formData.cardholderName} onChange={handleInputChange} required className="input" />
              </div>
              <div>
                <label className="label">Card Number:</label>
                <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleInputChange} required className="input" />
              </div>
              <div>
                <label className="label">CVV:</label>
                <input type="text" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleInputChange} required className="input" />
              </div>
              <div>
                <label className="label">Expiration Date:</label>
                <input type="month" name="expirationDate" value={formData.expirationDate} onChange={handleInputChange} required className="input" />
              </div>
              <button type="submit" disabled={!isFormFilled} className="submit-button">Submit Payment</button>
            </form>
          </div>
        ))
      ) : (
        <p>No properties found for this user.</p>
      )}
    </div>
  );
}

export default DashboardPage;
