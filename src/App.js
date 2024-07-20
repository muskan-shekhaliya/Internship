import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobForm from './JobForm';
import JobList from './JobList';
import JobSearch from './JobSearch';

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    title: '',
    company: '',
    description: '',
    location: '',
    salary: '',
  });

  useEffect(() => {
    axios.get('http://localhost:5000/jobs')
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/jobs', form)
      .then((response) => {
        setJobs([...jobs, response.data]);
        setForm({
          title: '',
          company: '',
          description: '',
          location: '',
          salary: '',
        });
      })
      .catch((error) => {
        console.error('Error posting job:', error);
      });
  };

  return (
    <div>
      <h1>Job Board</h1>
      <nav>
        <a href="#post-job">Post a Job</a>
        <a href="#search-jobs">Search Jobs</a>
        <a href="#job-list">Job Listings</a>
      </nav>
      <main>
        <section id="post-job">
          <h2>Post a New Job</h2>
          <JobForm
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </section>
        <section id="search-jobs">
          <JobSearch />
        </section>
        <section id="job-list">
          <h2>Job Listings</h2>
          <JobList jobs={jobs} />
        </section>
      </main>
    </div>
  );
};

export default App;

// import React, { useState } from 'react';
// import Home from './Home';
// import ContactUs from './ContactUs';
// import JobForm from './JobForm';
// import JobList from './JobList';
// import JobSearch from './JobSearch';
// import Login from './Login';
// import './styles.css';
// import './ContactUs.css';


// const App = () => {
//     const [currentSection, setCurrentSection] = useState('home');
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [username, setUsername] = useState('');
//     const handleLogin = (username) => {
//       setIsLoggedIn(true);
//       setUsername(username);
//       setCurrentSection('home');
//   };

//   const handleLogout = () => {
//       setIsLoggedIn(false);
//       setUsername('');
//       setCurrentSection('home');
//   };
//     const renderSection = () => {
//       if (!isLoggedIn) {
//         return <Login onLogin={handleLogin} />;
//       }
//         switch (currentSection) {
//           case 'home':
//               return <Home />;
//             case 'contact-us':
//               return <ContactUs />;
//             case 'post-job':
//                 return <JobForm />;
//             case 'search-jobs':
//                 return <JobSearch />;
//             case 'job-list':
//                 return <JobList />;
//             default:
//                 return <Home />;
//         }
//     };
//     return (
//         <div className="App">
//             <header>
//                 <img src={`${process.env.PUBLIC_URL}/job.png`} alt="Job Board Logo" className="logo" />
//                 <h1>Job Board</h1>
//                 <nav>
//                 {isLoggedIn ? (
//                         <>
//                   <button onClick={() => setCurrentSection('home')}>Home</button>
//                   <button onClick={() => setCurrentSection('contact-us')}>Contact Us</button>
                    
//                     <button onClick={() => setCurrentSection('post-job')}>Post a Job</button>
//                     <button onClick={() => setCurrentSection('search-jobs')}>Search Jobs</button>
//                     <button onClick={() => setCurrentSection('job-list')}>Job Listings</button>
//                     <button onClick={handleLogout}>Logout</button>
//                             <span>Welcome, {username}!</span>
//                         </>
//                          ) : (
//                           <button onClick={() => setCurrentSection('login')}>Login</button>
//                       )}
//                 </nav>
//             </header>
//             <main>
//                 {renderSection()}
//             </main>
//         </div>
//     );
// };

// export default App;
