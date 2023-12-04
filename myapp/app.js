const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // Lägg till den statiska mapp där HTML-fil finns

const courses = require('./data/courses.json');

// Visa alla kurser
app.get('/courses', (req, res) => {
    res.json(courses); // Returnera alla kurser som JSON
});

// Visa en enskild kurs baserat på ID
app.get('/courses/:id', (req, res) => {
  const id = req.params.id;
  const course = courses.find(course => course.id === parseInt(id));
  if (!course) {
    return res.status(404).send('Kursen hittades inte.');
  }
  res.json(course);
});    

// Radera en kurs baserat på ID
app.delete('/courses/:id', (req, res) => {
  const id = req.params.id;
  const courseIndex = courses.findIndex(course => course.id === parseInt(id));
  if (courseIndex === -1) {
    return res.status(404).send('Kursen hittades inte.');
  }
  courses.splice(courseIndex, 1);
  res.send('Kursen har raderats.');
});


app.listen(3000, function () {
  console.log("Express server listening on port 3000");
});

module.exports = app;
