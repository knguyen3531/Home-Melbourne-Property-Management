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
      return User.find({}).select('-password'); // Exclude passwords from user objects
    },
    async getUser(_, { id }) {
      const user = await User.findById(id).select('-password'); // Exclude password from the results
      if (!user) throw new Error('User not found');
      return user;
    },
    async getUserByEmail(_, { email }) {
      const user = await User.findOne({ email: email }).select('-password');
      if (!user) throw new Error('User not found');
      return user;
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
      return Property.find({ owner: user._id }).populate('tenants');
    },
  },
  Mutation: {
    async createUser(_, { input }) {
      const newUser = new User(input);
      await newUser.save();

      return {
        id: newUser._id,
        email: newUser.email,
        phone: newUser.phone,
        billingAddress: newUser.billingAddress
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
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return {
        success: true,
        message: 'Login successful',
        user: {
          id: user._id,
          email: user.email
        },
        token
      };
    },
    async createPayment(_, { propertyId }) {
      const property = await Property.findById(propertyId);
      if (!property) {
        throw new Error('Property not found');
      }

      property.rentStatus = 'paid';
      await property.save();

      return {
        success: true,
        message: 'Payment successful',
      };
    },
  },
};

module.exports = resolvers;
