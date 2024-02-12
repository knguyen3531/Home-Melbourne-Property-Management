const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
  }

  type Property {
    id: ID!
    owner: User!
    address: String!
    tenants: [User]
    bedrooms: Int
    bathrooms: Int
    sqft: Int
    type: String
    amenities: [String]
    description: String
    rentPrice: Float
    rentStatus: String  # Added rentStatus field
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
    bedrooms: Int
    bathrooms: Int
    sqft: Int
    type: String
    amenities: [String]
    description: String
    rentPrice: Float
    rentStatus: String  # Added rentStatus field
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
    getPropertiesByUser(userEmail: String!): [Property]
  }

  type Mutation {
    createUser(input: CreateUserInput): User
    createProperty(input: CreatePropertyInput): Property
    createMaintenanceRequest(input: CreateMaintenanceRequestInput): MaintenanceRequest
    loginUser(email: String!, password: String!): AuthResponse!
  }

  type AuthResponse {
    success: Boolean!
    message: String
    user: User
    token: String
  }
`;

module.exports = typeDefs;
