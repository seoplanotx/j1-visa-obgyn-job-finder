// routes/jobRoutes.js

const express = require('express');
const JobController = require('../controllers/jobController');

class JobRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  /**
   * Initialize job-related routes
   */
  initializeRoutes() {
    this.router.get('/jobs', JobController.getJobs);
    this.router.get('/jobs/:id', JobController.getJobById);
    this.router.get('/search', JobController.searchJobs);
  }
}

module.exports = new JobRoutes().router;
