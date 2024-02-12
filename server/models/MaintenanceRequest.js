// server\models\MaintenanceRequest.js

const mongoose = require('mongoose');

const maintenanceRequestSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Property',
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Pending',
  },
});

module.exports = mongoose.model('MaintenanceRequest', maintenanceRequestSchema);
