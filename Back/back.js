
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());
let tasks = [
    {
        id: 1,
        title: "front end",
        description: "build front end",
        status: "done"
    },
    {
        id: 2,
        title: "back end",
        description: "build back end",
        status: "done"
    },
];

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post('/tasks', (req, res) => {
  const { title, description, status } = req.body;
  const newTask = { id: tasks.length + 1, title, description, status };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update a task by ID
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    console.log("hello", req.body)
    const { description, status } = req.body;
    const index = tasks.findIndex(task => task.id === parseInt(id));
    if (index !== -1) {
        tasks[index] = { ...tasks[index], description, status };
        res.json(tasks[index]);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(task => task.id === parseInt(id));
  if (index !== -1) {
    tasks.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
