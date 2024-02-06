const mongoose = require('mongoose');
const User = require('./models/User');
const Property = require('./models/Property');

mongoose.connect('your-mongodb-connection-string', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const tenants = [
  {
    name: 'John Doe',
    email: 'johndoe@email.com',
    phone: '123-456-7890',
    role: 'tenant',
    propertyAddress: '123 Main St, Apartment 101',
  },
  {
    name: 'Alice Smith',
    email: 'alicesmith@email.com',
    phone: '987-654-3210',
    role: 'tenant',
    propertyAddress: '456 Elm St, Unit B',
  },
  // Add more tenant objects here
];

const landlords = [
  {
    name: 'Property Management Inc.',
    email: 'pmi@email.com',
    phone: '555-123-4567',
    role: 'landlord',
    propertyAddress: '789 Oak St, Suite 200',
  },
  {
    name: 'XYZ Properties',
    email: 'xyzproperties@email.com',
    phone: '777-888-9999',
    role: 'landlord',
    propertyAddress: '101 Pine St, Building 3',
  },
  // Add more landlord objects here
];

const seedDB = async () => {
  await User.deleteMany({});
  await Property.deleteMany({});

  for (let tenant of tenants) {
    const newTenant = new User(tenant);
    await newTenant.save();
  }

  for (let landlord of landlords) {
    const newLandlord = new User(landlord);
    await newLandlord.save();
  }

  // Add more seeding logic if necessary
};

seedDB().then(() => {
  mongoose.connection.close();
});
