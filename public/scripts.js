// public/scripts.js

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('searchForm');
  const jobList = document.getElementById('jobList');

  // Event listener for the search form submission
  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const keyword = document.getElementById('keyword').value;
    const location = document.getElementById('location').value;
    await searchJobs(keyword, location);
  });

  /**
   * Fetch jobs based on search criteria
   * @param {string} keyword - The keyword to search for
   * @param {string} location - The location to search for
   */
  async function searchJobs(keyword, location) {
    try {
      const response = await fetch(`/api/search?keyword=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jobs = await response.json();
      displayJobs(jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  }

  /**
   * Display jobs in the job list
   * @param {Array} jobs - The array of job objects to display
   */
  function displayJobs(jobs) {
    jobList.innerHTML = ''; // Clear any existing job listings
    if (jobs.length === 0) {
      jobList.innerHTML = '<p>No jobs found.</p>';
      return;
    }

    jobs.forEach((job) => {
      const jobCard = document.createElement('div');
      jobCard.className = 'job-card';

      const jobTitle = document.createElement('h2');
      jobTitle.textContent = job.title;
      jobCard.appendChild(jobTitle);

      const jobLocation = document.createElement('p');
      jobLocation.textContent = `Location: ${job.location}`;
      jobCard.appendChild(jobLocation);

      const jobDescription = document.createElement('p');
      jobDescription.textContent = job.description;
      jobCard.appendChild(jobDescription);

      const jobSalary = document.createElement('p');
      jobSalary.className = 'salary';
      jobSalary.textContent = `Salary: ${job.salary}`;
      jobCard.appendChild(jobSalary);

      const jobVisaSponsorship = document.createElement('p');
      jobVisaSponsorship.className = 'visa-sponsorship';
      jobVisaSponsorship.textContent = job.visaSponsorship ? 'Visa Sponsorship Available' : 'No Visa Sponsorship';
      jobCard.appendChild(jobVisaSponsorship);

      const applicationLink = document.createElement('p');
      applicationLink.className = 'application-link';
      const link = document.createElement('a');
      link.href = job.applicationLink;
      link.textContent = 'Apply Now';
      applicationLink.appendChild(link);
      jobCard.appendChild(applicationLink);

      jobList.appendChild(jobCard);
    });
  }
});
