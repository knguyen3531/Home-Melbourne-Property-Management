import React from 'react';
import RequestList from '../components/maintenance/RequestList';

function MaintenancePage() {
  return (
    <div>
      <h1>Maintenance Requests</h1>
      <RequestList />
      {/* Maintenance request handling */}
    </div>
  );
}

export default MaintenancePage;
