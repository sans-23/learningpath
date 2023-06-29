const express = require("express");
const { createLearningPath, getLearningPaths, getLearningPath, updateLearningPath, deleteLearningPath } = require("../controlllers/learningpathcontroller");
const { createCourse, getCourses, getCourse, updateCourse, deleteCourse } = require("../controlllers/coursecontroller");
const { getCourseItems, createCourseItem, getCourseItem, updateCourseItem, deleteCourseItem } = require("../controlllers/courseitemcontroller");
const { createCourseItemsofCourse, getCourseItemsOfCourse } = require("../controlllers/coursecourseitem");
const { getCoursesofLearningPath, createCoursesofLearningPath } = require("../controlllers/pathcourse");
const router = express.Router();

router.route('/learning-paths').post(createLearningPath).get(getLearningPaths);
router.route('/learning-paths/:id').get(getLearningPath).put(updateLearningPath).delete(deleteLearningPath);
router.route('/courses').post(createCourse).get(getCourses);
router.route('/courses/:id').get(getCourse).put(updateCourse).delete(deleteCourse);
router.route('/course-items').post(createCourseItem).get(getCourseItems);
router.route('/course-items/:id').get(getCourseItem).put(updateCourseItem).delete(deleteCourseItem);

router.route('/courses/:courseId/course-items').get(getCourseItemsOfCourse).post(createCourseItemsofCourse);
router.route('/learning-paths/:learningPathId/courses').get(getCoursesofLearningPath).post(createCoursesofLearningPath);

module.exports = router