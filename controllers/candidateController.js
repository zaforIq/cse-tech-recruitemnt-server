const xlsx = require('xlsx');
const path = require('path');
const Candidate = require('../models/Candidate');

const updateCandidates = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', 'public', 'assets', 'CSE-TECH-Skill-Hunt.xlsx');
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    const candidates = data.map(item => ({
      name: item['Name'],
      studentId: item['Student ID'],
      section: item['Section'],
      email: item['Email Address'],
      currentSemester: item['Current Semester'],
      appliesFor: item['Applies For'],
      technicalSkills: item['Technical Skills'],
      githubProfile: item['GitHub Profile Link'],
      resumeUrl: item['Resume URL (Public access)'],
      portfolioUrl: item['Portfolio/LinkedIn Profile Link']
    }));

    // Using bulkWrite for efficiency and to handle upserts based on Student ID
    const operations = candidates.map(candidate => ({
      updateOne: {
        filter: { studentId: candidate.studentId },
        update: { $set: candidate },
        upsert: true
      }
    }));

    if (operations.length > 0) {
        await Candidate.bulkWrite(operations);
    }

    res.status(200).json({ message: 'Candidates updated successfully', count: candidates.length });
  } catch (error) {
    console.error('Error updating candidates:', error);
    res.status(500).json({ message: 'Error updating candidates', error: error.message });
  }
};

const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ message: 'Error fetching candidates', error: error.message });
  }
};

const getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.status(200).json(candidate);
  } catch (error) {
    console.error('Error fetching candidate:', error);
    res.status(500).json({ message: 'Error fetching candidate', error: error.message });
  }
};

module.exports = { updateCandidates, getCandidates, getCandidateById };
