const express = require('express');
const Project = require('../models/Project');

const router = express.Router();

// Middleware to simulate authentication check
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token !== 'Bearer yourhardcodedtoken123') {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

router.use(authenticate);

// POST: Add a new project
router.post('/', async (req, res) => {
  try {
    const { name, client, deadline } = req.body;
    const newProject = new Project({ name, client, deadline });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET: List all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT: Update a project
router.put('/:id', async (req, res) => {
  try {
    const { name, client, deadline } = req.body;
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { name, client, deadline },
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Delete a project
router.delete('/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Project deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
