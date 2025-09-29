import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://toolstr.onrender.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Server error');
      }
      const data = await response.json();
      setResponseMessage(data.message);
        alert('Data saved successfully!');
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
      console.error('Fetch error:', error);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light p-4">
      <div className="bg-white shadow rounded p-4 w-100" style={{ maxWidth: '400px' }}>
        <h1 className="h4 mb-4 text-center">Submit Name and Email</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
        {responseMessage && (
          <p className="mt-3 text-center text-success fw-medium">{responseMessage}</p>
        )}
      </div>
    </div>
  );
};

export default App;
