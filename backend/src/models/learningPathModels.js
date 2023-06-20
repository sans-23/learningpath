const mongoose = require('mongoose');

const CourseItemSchema = new mongoose.Schema({
  itemType: {
    type: String,
    enum: ['video', 'practice', 'resource'],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  nextItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CourseItem',
    default: null,
  },
});

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  firstItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CourseItem',
    default: null,
  },
  practiceQuestions: [{
    question: String,
    options: [String],
    correctAnswer: String,
  }],
});

const LearningPathSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  firstCourse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    default: null,
  },
  sharedLink: {
    type: String,
    unique: true,
  },
});

const CourseItem = mongoose.model('CourseItem', CourseItemSchema);
const Course = mongoose.model('Course', CourseSchema);
const LearningPath = mongoose.model('LearningPath', LearningPathSchema);

module.exports = { CourseItem, Course, LearningPath };
