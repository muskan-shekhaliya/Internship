import React, { useState } from 'react';
import axios from 'axios';
import './JobForm.css';

const JobForm = () => {
    const [job, setJob] = useState({
        title: '',
        company: '',
        description: '',
        location: '',
        salary: '',
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJob({
            ...job,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            await axios.post('http://localhost:5002/jobs', job);
            setMessage('Job posted successfully');
            setJob({
                title: '',
                company: '',
                description: '',
                location: '',
                salary: '',
            });
        } catch (error) {
            setMessage('Error posting job');
            console.error('Error posting job:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="jobpost-container">
            <h2>Post a New Job</h2>
            <form className="jobpost-form" onSubmit={handleSubmit}>
                <label>
                    Job Title:
                    <input type="text" name="title" value={job.title} onChange={handleChange} required />
                </label>
                <label>
                    Company:
                    <input type="text" name="company" value={job.company} onChange={handleChange} required />
                </label>
                <label>
                    Location:
                    <input type="text" name="location" value={job.location} onChange={handleChange} required />
                </label>
                <label>
                    Description:
                    <textarea name="description" value={job.description} onChange={handleChange} required></textarea>
                </label>
                <label>
                    Salary:
                    <input type="text" name="salary" value={job.salary} onChange={handleChange} required />
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? 'Posting...' : 'Post Job'}
                </button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default JobForm;
