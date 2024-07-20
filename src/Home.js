import React from 'react';

const Home = () => {
    return (
        <div className="container">
            <h2>Welcome to the Job Board</h2>
            <img src={`${process.env.PUBLIC_URL}/job.png`} alt="Job Board Logo" className="logo" />
            <p>Your one-stop solution for finding and posting jobs.</p>
        </div>
    );
};

export default Home;
