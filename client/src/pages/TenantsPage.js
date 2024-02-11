import React from 'react';
import TenantList from '../components/Tenants/TenantList';

function TenantsPage() {
  return (
    <div>
      <h1>Tenants</h1>
      <TenantList />
      {/* Tenant management functionality */}
    </div>
  );
}

export default TenantsPage;
