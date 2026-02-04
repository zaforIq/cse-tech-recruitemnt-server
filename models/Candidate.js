const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
  section: { type: String },
  email: { type: String, required: true },
  currentSemester: { type: String },
  appliesFor: { type: String },
  technicalSkills: { type: String },
  githubProfile: { type: String },
  resumeUrl: { type: String },
  portfolioUrl: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Candidate', candidateSchema);
