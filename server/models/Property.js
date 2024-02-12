// server/models/Property.js

const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  address: {
    type: String,
    required: true,
  },
  tenants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  sqft: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['Single Family Home', 'Apartment', 'Townhouse', 'Luxury Villa', 'Ranch House'],
    required: true,
  },
  rentPrice: {
    type: Number,
    required: true,
  },
  amenities: [String],
  description: String,
  status: {
    type: String,
    enum: ['Available', 'Rented', 'Under Maintenance'],
    default: 'Available',
  },
});

module.exports = mongoose.model('Property', propertySchema);
