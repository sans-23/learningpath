const { CourseItem } = require('../models/learningPathModels');

// Course Item APIs

exports.createCourseItem = async (req, res) => {
    try {
        const { itemType, title, url } = req.body;
        const courseItem = await CourseItem.create({ itemType, title, url });
        res.status(201).json(courseItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create a course item.' });
    }
}

exports.getCourseItems = async (req, res) => {
    try {
        const courseItems = await CourseItem.find();
        res.json(courseItems);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve course items.' });
    }
}

exports.getCourseItem = async (req, res) => {
    try {
        const courseItem = await CourseItem.findById(req.params.id);
        if (courseItem) {
        res.json(courseItem);
        } else {
        res.status(404).json({ error: 'Course item not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve the course item.' });
    }
}

exports.updateCourseItem = async (req, res) => {
    try {
        const { itemType, title, url } = req.body;
        const courseItem = await CourseItem.findByIdAndUpdate(
        req.params.id,
        { $set: { itemType, title, url } },
        { new: true }
        );
        if (courseItem) {
        res.json(courseItem);
        } else {
        res.status(404).json({ error: 'Course item not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update the course item.' });
    }
}

exports.deleteCourseItem = async (req, res) => {
    try {
        const courseItem = await CourseItem.findByIdAndDelete(req.params.id);
        if (courseItem) {
        res.json({ message: 'Course item deleted successfully.' });
        } else {
        res.status(404).json({ error: 'Course item not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the course item.' });
    }
}