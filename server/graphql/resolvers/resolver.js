// server/graphql/resolvers/resolver.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Property = require('../../models/Property');
const MaintenanceRequest = require('../../models/MaintenanceRequest');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    async getUsers() {
      return User.find({});
    },
    async getProperties() {
      return Property.find({}).populate('owner', 'email'); 
    },
    async getMaintenanceRequests() {
      return MaintenanceRequest.find({});
    },
    async getPropertiesByUser(_, { userEmail }) {
      const user = await User.findOne({ email: userEmail });
      if (!user) throw new Error('User not found');
      return await Property.find({ owner: user._id }).populate('tenants');
    },
  },
  Mutation: {
    async createUser(_, { input }) {
      const user = new User(input);
      await user.save();

      return {
        id: user._id,
        email: user.email,
        phone: user.phone,
        billingAddress: user.billingAddress
      };
    },

    async loginUser(_, { email, password }) {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('User not found');
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new AuthenticationError('Invalid password');
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return {
        success: true,
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email

        },
        token
      };
    },

    async createPayment(_, { propertyId }) {
      try {
        // Find the property by ID
        const property = await Property.findById(propertyId);
        if (!property) {
          throw new Error('Property not found');
        }
        
        // Update the rent status to "paid"
        property.rentStatus = 'paid';
        await property.save();

        return {
          success: true,
          message: 'Payment successful',
        };
      } catch (error) {
        console.error('Error creating payment:', error);
        return {
          success: false,
          message: 'Failed to create payment',
        };
      }
    },
  },
};

module.exports = resolvers;
