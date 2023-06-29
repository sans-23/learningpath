const { LearningPath, Course } = require('../models/learningPathModels');

// Learning Path - Course Relationship APIs

exports.createCoursesofLearningPath = async (req, res) => {
    try {
        const { title, description } = req.body;
        const learningPath = await LearningPath.findById(req.params.learningPathId);
        if (learningPath) {
        const course = await Course.create({ title, description });
        if (!learningPath.firstCourse) {
            learningPath.firstCourse = course._id;
            await learningPath.save();
        } else {
            let currentCourse = await Course.findById(learningPath.firstCourse);
            while (currentCourse.nextCourse) {
            currentCourse = await Course.findById(currentCourse.nextCourse);
            }
            currentCourse.nextCourse = course._id;
            await currentCourse.save();
        }
        res.status(201).json(course);
        } else {
        res.status(404).json({ error: 'Learning path not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to create a course.' });
    }
}

exports.getCoursesofLearningPath = async (req, res) => {
    try {
        const learningPath = await LearningPath.findById(req.params.learningPathId);
        if (learningPath) {
        const courses = [];
        let currentCourseId = learningPath.firstCourse;
        while (currentCourseId) {
            const currentCourse = await Course.findById(currentCourseId);
            if (currentCourse) {
            courses.push(currentCourse);
            currentCourseId = currentCourse.nextCourse;
            } else {
            break;
            }
        }
        res.json(courses);
        } else {
        res.status(404).json({ error: 'Learning path not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve courses.' });
    }
}