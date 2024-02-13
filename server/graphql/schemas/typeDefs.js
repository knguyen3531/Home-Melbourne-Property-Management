const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    phone: String
    billingAddress: String
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
    rentStatus: String
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
    rentStatus: String
  }

  input CreateMaintenanceRequestInput {
    propertyId: ID!
    description: String!
    status: String
  }

  input UserUpdateInput {
    email: String
    phone: String
    billingAddress: String
  }

  type AuthResponse {
    success: Boolean!
    message: String
    user: User
    token: String
  }

  type PaymentResponse {
    success: Boolean!
    message: String
  }

  type Query {
    getUsers: [User]
    getProperties: [Property]
    getUserByEmail(email: String!): User
    getMaintenanceRequests: [MaintenanceRequest]
    getPropertiesByUser(userEmail: String!): [Property]
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(input: CreateUserInput): User
    createProperty(input: CreatePropertyInput): Property
    createMaintenanceRequest(input: CreateMaintenanceRequestInput): MaintenanceRequest
    loginUser(email: String!, password: String!): AuthResponse!
    createPayment(propertyId: ID!): PaymentResponse!
    updateUser(id: ID!, input: UserUpdateInput!): User
  }
`;

module.exports = typeDefs;
