const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true }],
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  duration: { type: Number, required: true },
  type: { type: String, enum: ['one-on-one', 'group'], required: true },
  attendees: [{ name: String, email: String }],
  status: { type: String, default: 'scheduled' },
});

module.exports = mongoose.model('Session', sessionSchema);
