// models/jobModel.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Job schema
const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  visaSponsorship: {
    type: Boolean,
    required: true,
  },
  applicationLink: {
    type: String,
    required: true,
  },
});

// Create the Job model
const Job = mongoose.model('Job', jobSchema);

// Define the JobModel class
class JobModel {
  /**
   * Find jobs based on a query
   * @param {Object} query - The query object to filter jobs
   * @returns {Promise<Array>} - A promise that resolves to an array of jobs
   */
  static find(query) {
    return Job.find(query).exec();
  }

  /**
   * Find a job by its ID
   * @param {String} id - The ID of the job to find
   * @returns {Promise<Object>} - A promise that resolves to the job object
   */
  static findById(id) {
    return Job.findById(id).exec();
  }

  /**
   * Save a new job to the database
   * @param {Object} job - The job object to save
   * @returns {Promise<Object>} - A promise that resolves to the saved job object
   */
  static save(job) {
    const newJob = new Job(job);
    return newJob.save();
  }
}

module.exports = JobModel;
