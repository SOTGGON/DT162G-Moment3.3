const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseId: String,
  courseName: String,
  coursePeriod: Number,
  searchId: Number
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
