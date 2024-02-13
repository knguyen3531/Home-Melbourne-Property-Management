import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/AuthContext';
import './ProfilePageStyles.css'; // Import your CSS file for styling

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.email && token) {
        const graphqlQuery = {
          query: `
            query GetUserByEmail($email: String!) {
              getUserByEmail(email: $email) {
                id
                email
                phone
                billingAddress
              }
            }
          `,
          variables: {
            email: user.email,
          },
        };

        try {
          const response = await fetch(process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:5000/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(graphqlQuery),
          });

          const { data, errors } = await response.json();
          if (errors) {
            console.error('GraphQL Errors:', errors);
            throw new Error('Error fetching user data');
          }
          if (data.getUserByEmail) {
            setUserData(data.getUserByEmail);
          } else {
            throw new Error('User data not found');
          }
        } catch (error) {
          console.error('Fetch user data failed:', error);
        }
      }
    };

    fetchUserData();
  }, [user, token]);

  return (
    <div className="profile-container">
      <h1 className="profile-title">Your Profile</h1>
      {userData ? (
        <div className="user-details">
          <p className="user-detail">Email: {userData.email}</p>
          <p className="user-detail">Phone: {userData.phone}</p>
          <p className="user-detail">Billing Address: {userData.billingAddress}</p>
        </div>
      ) : (
        <p className="loading-message">Loading user data...</p>
      )}
    </div>
  );
}

export default ProfilePage;
