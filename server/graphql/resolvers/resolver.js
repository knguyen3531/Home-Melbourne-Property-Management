const User = require('../../models/User');
const Property = require('../../models/Property');
const MaintenanceRequest = require('../../models/MaintenanceRequest');

const resolvers = {
  Query: {
    async getUsers() {
      return User.find({});
    },
    async getProperties() {
      return Property.find({});
    },
    async getMaintenanceRequests() {
      return MaintenanceRequest.find({});
    },
  },
  Mutation: {
    async createUser(_, { input }) {
      return User.create(input);
    },
    async createProperty(_, { input }) {
      return Property.create(input);
    },
    async createMaintenanceRequest(_, { input }) {
      return MaintenanceRequest.create(input);
    },
  },
};

module.exports = resolvers;
