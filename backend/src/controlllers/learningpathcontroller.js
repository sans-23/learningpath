const { LearningPath, Course, CourseItem } = require('../models/learningPathModels');

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

async function getOrderedCourses(learningPathId) {
  const orderedCourses = [];
  let x = await LearningPath.findById(learningPathId).select('firstCourse').lean().exec();
  currentCourseId = x.firstCourse;
  while (currentCourseId) {
    const course = await Course.findById(currentCourseId).populate('firstItem').lean().exec();
    orderedCourses.push(course);
    currentCourseId = course.nextCourse;
  }
  return orderedCourses;
}

async function populateCourseItems(course) {
  let currentItemId = course.firstItem;
  course.courseItems = [];
  while (currentItemId) {
    const courseItem = await CourseItem.findById(currentItemId).lean().exec();
    course.courseItems.push(courseItem);
    currentItemId = courseItem.nextItem;
  }

  delete course.firstItem;
  delete course.nextCourse;
  return course;
}

exports.getLearningPath = async (req, res) => {
  try {
    const learningPathId = req.params.id;
    const learningPath = await LearningPath.findById(learningPathId).lean().exec();
    if (!learningPath) {
      return res.status(404).json({ message: 'Learning path not found.' });
    }
    const orderedCourses = await getOrderedCourses(learningPathId);
    learningPath.courses = await Promise.all(orderedCourses.map(populateCourseItems));

    res.json(learningPath);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};


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