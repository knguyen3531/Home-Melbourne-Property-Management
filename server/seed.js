// server/seed.js

const User = require('./models/User');
const Property = require('./models/Property');
const MaintenanceRequest = require('./models/MaintenanceRequest');

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Property.deleteMany();
    await MaintenanceRequest.deleteMany();

    // Create users (tenants)
    const users = await User.create([
      { 
        email: 'john.doe@example.com', 
        password: 'password123', 
        firstName: 'John', 
        lastName: 'Doe', 
        phone: '123-456-7890',
        billingAddress: '123 Main St, Anytown, USA',
        rentPrice: 1200 
      },
      { 
        email: 'jane.smith@example.com', 
        password: 'qwerty456', 
        firstName: 'Jane', 
        lastName: 'Smith', 
        phone: '456-789-0123',
        billingAddress: '456 Elm St, Somewhere, USA',
        rentPrice: 800 
      },
      { 
        email: 'michael.johnson@example.com', 
        password: 'pass123', 
        firstName: 'Michael', 
        lastName: 'Johnson', 
        phone: '789-012-3456',
        billingAddress: '789 Oak St, Nowhere, USA',
        rentPrice: 1000 
      },
      { 
        email: 'emily.wilson@example.com', 
        password: 'wilson321', 
        firstName: 'Emily', 
        lastName: 'Wilson', 
        phone: '234-567-8901',
        billingAddress: '234 Maple St, Anytown, USA',
        rentPrice: 1100 
      },
      { 
        email: 'david.brown@example.com', 
        password: 'brown456', 
        firstName: 'David', 
        lastName: 'Brown', 
        phone: '567-890-1234',
        billingAddress: '567 Pine St, Somewhere, USA',
        rentPrice: 900 
      },
    ]);

    // Create properties for each user
    const properties = [];
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const property = await Property.create({
        owner: user._id,
        address: `${i + 1} Example St, Anytown, USA`,
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1800,
        type: 'Single Family Home',
        amenities: ['Swimming Pool', 'Garden', 'Garage'],
        description: `Property owned by ${user.firstName} ${user.lastName}`,
        rentPrice: user.rentPrice,
        status: 'Available',
      });
      properties.push(property);
    }

    // Create maintenance requests
    await MaintenanceRequest.create({ propertyId: properties[0]._id, description: 'Leaky faucet in the kitchen', status: 'Pending' });
    await MaintenanceRequest.create({ propertyId: properties[0]._id, description: 'Broken window in the living room', status: 'In Progress' });
    await MaintenanceRequest.create({ propertyId: properties[1]._id, description: 'Clogged drain in the bathroom', status: 'Pending' });

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = seedDatabase;
