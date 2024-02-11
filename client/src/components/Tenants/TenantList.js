import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TenantList() {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    const fetchTenants = async () => {
      const response = await fetch('/api/tenants');
      const data = await response.json();
      setTenants(data);
    };

    fetchTenants();
  }, []);

  return (
    <div>
      <h2>Tenants</h2>
      <ul>
        {tenants.map(tenant => (
          <li key={tenant.id}>
            <Link to={`/tenants/${tenant.id}`}>{tenant.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TenantList;
