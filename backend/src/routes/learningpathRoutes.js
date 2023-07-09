const express = require("express");
const router = express.Router();
const {
  createLearningPath,
  getLearningPaths,
  getLearningPath,
  updateLearningPath,
  deleteLearningPath,
} = require("../controllers/learningpathcontroller");
const {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/coursecontroller");
const {
  getCourseItems,
  createCourseItem,
  getCourseItem,
  updateCourseItem,
  deleteCourseItem,
} = require("../controllers/courseitemcontroller");
const {
  createCourseItemsofCourse,
  getCourseItemsOfCourse,
} = require("../controllers/coursecourseitem");
const {
  getCoursesofLearningPath,
  createCoursesofLearningPath,
} = require("../controllers/pathcourse");
const {
  isAuthenticatedUser,
} = require("../middleware/auth");

router
  .route("/learning-paths")
  .post(isAuthenticatedUser, createLearningPath)
  .get(getLearningPaths);
router
  .route("/learning-paths/:id")
  .get(getLearningPath)
  .put(isAuthenticatedUser, updateLearningPath)
  .delete(isAuthenticatedUser, deleteLearningPath);
router
  .route("/courses")
  .post(isAuthenticatedUser, createCourse)
  .get(getCourses);
router
  .route("/courses/:id")
  .get(getCourse)
  .put(isAuthenticatedUser, updateCourse)
  .delete(isAuthenticatedUser, deleteCourse);
router
  .route("/course-items")
  .post(isAuthenticatedUser, createCourseItem)
  .get(getCourseItems);
router
  .route("/course-items/:id")
  .get(getCourseItem)
  .put(isAuthenticatedUser, updateCourseItem)
  .delete(isAuthenticatedUser, deleteCourseItem);

router
  .route("/courses/:courseId/course-items")
  .get(getCourseItemsOfCourse)
  .post(isAuthenticatedUser, createCourseItemsofCourse);
router
  .route("/learning-paths/:learningPathId/courses")
  .get(getCoursesofLearningPath)
  .post(isAuthenticatedUser, createCoursesofLearningPath);

module.exports = router;
