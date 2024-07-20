import React, { useState } from 'react';
import axios from 'axios';
import './JobSearch.css';

const JobSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:5001/jobs');
            const filteredJobs = response.data.filter(job => 
                job.title.toLowerCase().includes(query.toLowerCase()) ||
                job.company.toLowerCase().includes(query.toLowerCase()) ||
                job.location.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filteredJobs);
        } catch (error) {
            console.error('Error searching jobs:', error);
        }
    };

    return (
        <div className="jobsearch-container">
            <h2>Search for Jobs</h2>
            <form className="jobsearch-form" onSubmit={handleSearch}>
                <input 
                    type="text" 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                    placeholder="Search by title, company name, or location" required
                />
                <button type="submit">Search</button>
            </form>
            <ul className="job-results">
            {results.length > 0 ? (
                    results.map((job) => (
                        <li key={job._id} className="job-item">
                            <h3><strong>Title:</strong> {job.title}</h3>
                            <p><strong>Company:</strong> {job.company}</p>
                            <p><strong>Description:</strong> {job.description}</p>
                            <p><strong>Location:</strong> {job.location}</p>
                            <p><strong>Salary:</strong> ${job.salary}</p>
                        </li>
                    ))
                ) : (
                    <p>No jobs found.</p>
                )}
            </ul>
        </div>
    );
};

export default JobSearch;
