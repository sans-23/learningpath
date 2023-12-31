const mongoose = require('mongoose');

const CourseItemSchema = new mongoose.Schema({
  itemType: {
    type: String,
    enum: ['video', 'resource'],
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
  nextCourse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CourseItem',
    default: null,
  },
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
});

const UserCourseItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  courseItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CourseItem',
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const UserCourseItem = mongoose.model('UserCourseItem', UserCourseItemSchema);
const CourseItem = mongoose.model('CourseItem', CourseItemSchema);
const Course = mongoose.model('Course', CourseSchema);
const LearningPath = mongoose.model('LearningPath', LearningPathSchema);

module.exports = { CourseItem, Course, LearningPath, UserCourseItem };
