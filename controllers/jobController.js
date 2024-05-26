// controllers/jobController.js

const JobModel = require('../models/jobModel');

class JobController {
  /**
   * Get all jobs
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   */
  static async getJobs(req, res) {
    try {
      const jobs = await JobModel.find({});
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching jobs.' });
    }
  }

  /**
   * Get a job by its ID
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   */
  static async getJobById(req, res) {
    try {
      const jobId = req.params.id;
      const job = await JobModel.findById(jobId);
      if (job) {
        res.status(200).json(job);
      } else {
        res.status(404).json({ error: 'Job not found.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the job.' });
    }
  }

  /**
   * Search for jobs based on query parameters
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   */
  static async searchJobs(req, res) {
    try {
      const { keyword, location } = req.query;
      const query = {};

      if (keyword) {
        query.title = { $regex: keyword, $options: 'i' };
      }

      if (location) {
        query.location = { $regex: location, $options: 'i' };
      }

      const jobs = await JobModel.find(query);
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while searching for jobs.' });
    }
  }
}

module.exports = JobController;
