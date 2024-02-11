const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    password: String!
  }

  type Property {
    id: ID!
    owner: ID!
    address: String!
    tenants: [ID]
  }

  type MaintenanceRequest {
    id: ID!
    propertyId: ID!
    description: String!
    status: String
  }

  input CreateUserInput {
    email: String!
    password: String!
  }

  input CreatePropertyInput {
    owner: ID!
    address: String!
    tenants: [ID]
  }

  input CreateMaintenanceRequestInput {
    propertyId: ID!
    description: String!
    status: String
  }

  type Query {
    getUsers: [User]
    getProperties: [Property]
    getMaintenanceRequests: [MaintenanceRequest]
  }

  type Mutation {
    createUser(input: CreateUserInput): User
    createProperty(input: CreatePropertyInput): Property
    createMaintenanceRequest(input: CreateMaintenanceRequestInput): MaintenanceRequest
  }
`;

module.exports = typeDefs;
