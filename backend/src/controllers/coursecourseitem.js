const { Course, CourseItem } = require('../models/learningPathModels');

// Course - Course Item Relationship APIs

exports.createCourseItemsofCourse = async (req, res) => {
    try {
        const { itemType, title, url } = req.body;
        const course = await Course.findById(req.params.courseId);
        if (course) {
        const courseItem = await CourseItem.create({ itemType, title, url });
        if (!course.firstItem) {
            course.firstItem = courseItem._id;
            await course.save();
        } else {
            let currentItem = await CourseItem.findById(course.firstItem);
            while (currentItem.nextItem) {
            currentItem = await CourseItem.findById(currentItem.nextItem);
            }
            currentItem.nextItem = courseItem._id;
            await currentItem.save();
        }
        res.status(201).json(courseItem);
        } else {
        res.status(404).json({ error: 'Course not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to create a course item.' });
    }
}

exports.getCourseItemsOfCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if (course) {
        const courseItems = [];
        let currentItem = await CourseItem.findById(course.firstItem);
        while (currentItem) {
            courseItems.push(currentItem);
            currentItem = await CourseItem.findById(currentItem.nextItem);
        }
        res.json(courseItems);
        } else {
        res.status(404).json({ error: 'Course not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve course items.' });
    }
}