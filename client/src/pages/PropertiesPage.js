import React from 'react';
import PropertyList from '../components/properties/PropertyList';

function PropertiesPage() {
  return (
    <div>
      <h1>Properties</h1>
      <PropertyList />
      {/* Possibly include PropertyDetail based on selected property */}
    </div>
  );
}

export default PropertiesPage;
