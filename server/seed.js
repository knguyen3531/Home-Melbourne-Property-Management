// server/seed.js

const mongoose = require('mongoose');
const User = require('./models/User');
const Property = require('./models/Property');
const MaintenanceRequest = require('./models/MaintenanceRequest');

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Property.deleteMany();
    await MaintenanceRequest.deleteMany();

    // Create users
    const user1 = await User.create({ email: 'khoi@example.com', password: 'password123' });
    const user2 = await User.create({ email: 'James_smith@example.com', password: 'qwerty456' });

    // Create properties
    const property1 = await Property.create({ owner: user1._id, address: '123 Main St, Anytown, USA', tenants: [user2._id] });
    const property2 = await Property.create({ owner: user2._id, address: '456 Elm St, Somewhere, USA' });

    // Create maintenance requests
    await MaintenanceRequest.create({ propertyId: property1._id, description: 'Leaky faucet in the kitchen', status: 'Pending' });
    await MaintenanceRequest.create({ propertyId: property1._id, description: 'Broken window in the living room', status: 'In Progress' });
    await MaintenanceRequest.create({ propertyId: property2._id, description: 'Clogged drain in the bathroom', status: 'Pending' });

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = seedDatabase;
