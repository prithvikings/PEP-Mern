import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

const students = [];

app.get('/', (req, res) => {
  res.send('Welcome to the Student Record Management System');
});

app.post('/students', (req, res) => {
  const { id, name, email, age, course } = req.body;

  const student = { id, name, email, age, course };
  students.push(student);

  res.status(201).send('Student record created');
});

app.get('/students', (req, res) => {
  res.json(students);
});

app.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).send('Student not found Please check the ID');
  }

  res.json(student);
});

app.put('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).send('Student not found');
  }

  const { name, email, age, course } = req.body;
  student.name = name;
  student.email = email;
  student.age = age;
  student.course = course;

  res.send('Student updated');
});

app.delete('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).send('Student not found');
  }

  students.splice(index, 1);
  res.send('Student deleted');
});

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
