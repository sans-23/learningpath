const { Course } = require('../models/learningPathModels');

// Course APIs

exports.createCourse = async (req, res) => {
    try {
        const { title, description } = req.body;
        const course = await Course.create({ title, description });
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create a course.' });
    }
}

exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve courses.' });
    }
}

exports.getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (course) {
        res.json(course);
        } else {
        res.status(404).json({ error: 'Course not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve the course.' });
    }
}

exports.updateCourse = async (req, res) => {
    try {
        const { title, description } = req.body;
        const course = await Course.findByIdAndUpdate(
        req.params.id,
        { $set: { title, description } },
        { new: true }
        );
        if (course) {
        res.json(course);
        } else {
        res.status(404).json({ error: 'Course not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update the course.' });
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (course) {
        res.json({ message: 'Course deleted successfully.' });
        } else {
        res.status(404).json({ error: 'Course not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the course.' });
    }
}