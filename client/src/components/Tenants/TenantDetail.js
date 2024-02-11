import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function TenantDetail() {
  const { tenantId } = useParams(); // Getting tenant ID from URL parameters
  const [tenant, setTenant] = useState(null);

  useEffect(() => {
    // Function to fetch tenant details from your API
    const fetchTenantDetail = async () => {
      try {
        const response = await fetch(`/api/tenants/${tenantId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTenant(data);
      } catch (error) {
        console.error("Could not fetch tenant data:", error);
      }
    };

    fetchTenantDetail();
  }, [tenantId]); // Dependency array includes tenantId to refetch if it changes

  if (!tenant) {
    return <div>Loading tenant details...</div>;
  }

  return (
    <div>
      <h2>Tenant Details</h2>
      <p><strong>Name:</strong> {tenant.name}</p>
      <p><strong>Email:</strong> {tenant.email}</p>
      <p><strong>Phone:</strong> {tenant.phone}</p>
      <p><strong>Lease Start:</strong> {tenant.leaseStart}</p>
      <p><strong>Lease End:</strong> {tenant.leaseEnd}</p>
      {/* Add more details as needed */}
    </div>
  );
}

export default TenantDetail;
