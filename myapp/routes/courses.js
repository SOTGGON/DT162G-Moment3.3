const express = require('express');
const Course = require('../models/course');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).send('Error fetching courses');
    }
});

router.get('/:searchId', async (req, res) => {
    try {
        const { searchId } = req.params;
        const course = await Course.findOne({ searchId });
        if (!course) {
            // Om det inte finns, returnera ett tomt objekt för att indikera att ID:t inte används
            return res.json({});
        }
        res.json(course);
    } catch (err) {
        res.status(500).send('Error fetching course');
    }
});


router.delete('/:searchId', async (req, res) => {
    try {
        const { searchId } = req.params;
        const deletedCourse = await Course.findOneAndDelete({ searchId });
        if (!deletedCourse) {
            return res.status(404).send('Course not found');
        }
        res.send('Course deleted');
    } catch (err) {
        res.status(500).send('Error deleting course');
    }
});

router.post('/', async (req, res) => {
    try {
        const { courseId, courseName, coursePeriod, searchId } = req.body;
        const newCourse = new Course({ courseId, courseName, coursePeriod, searchId });
        await newCourse.save();
        res.json({ message: 'Course added' });
    } catch (err) {
        res.status(500).send('Error adding course');
    }
});

module.exports = router;
