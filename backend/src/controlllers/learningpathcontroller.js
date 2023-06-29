const { LearningPath } = require('../models/learningPathModels');

// Learning Path APIs

exports.createLearningPath = async (req, res) => {
    try {
      const { title, description, creator } = req.body;
      const learningPath = await LearningPath.create({ title, description, creator });
      res.status(201).json(learningPath);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create a learning path.' });
    }
}

exports.getLearningPaths = async (req, res) => {
    try {
      const learningPaths = await LearningPath.find();
      res.json(learningPaths);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve learning paths.' });
    }
}

exports.getLearningPath = async (req, res) => {
    try {
      const learningPath = await LearningPath.findById(req.params.id);
      if (learningPath) {
        res.json(learningPath);
      } else {
        res.status(404).json({ error: 'Learning path not found.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve the learning path.' });
    }
}

exports.updateLearningPath = async (req, res) => {
    try {
      const { title, description } = req.body;
      const learningPath = await LearningPath.findByIdAndUpdate(
        req.params.id,
        { $set: { title, description } },
        { new: true }
      );
      if (learningPath) {
        res.json(learningPath);
      } else {
        res.status(404).json({ error: 'Learning path not found.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update the learning path.' });
    }
}

exports.deleteLearningPath = async (req, res) => {
    try {
      const learningPath = await LearningPath.findByIdAndDelete(req.params.id);
      if (learningPath) {
        res.json({ message: 'Learning path deleted successfully.' });
      } else {
        res.status(404).json({ error: 'Learning path not found.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete the learning path.' });
    }
}