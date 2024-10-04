import React, { useState } from 'react';
import { getDatabase, ref, push } from 'firebase/database';
import './studinfo.css'; // Import the CSS file

const StudInfo = () => {
  const [batchType, setBatchType] = useState('');
  const [enrollmentNo, setEnrollmentNo] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [year, setYear] = useState('');
  const [achievement, setAchievement] = useState('');
  const [iep, setIep] = useState(''); // New IEP field
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const db = getDatabase();
    const studInfoRef = ref(db, 'studentInfo');

    const newStudentInfo = {
      batchType,
      enrollmentNo,
      name,
      email,
      year,
      achievement,
      iep, // Include IEP field
    };

    push(studInfoRef, newStudentInfo)
      .then(() => {
        setLoading(false);
        setBatchType('');
        setEnrollmentNo('');
        setName('');
        setEmail('');
        setYear('');
        setAchievement('');
        setIep(''); // Reset IEP field
      })
      .catch((error) => {
        setLoading(false);
        setError('Error adding student info: ' + error.message);
      });
  };

  return (
    <div className="add-student-info">
      <h2>Add Student Info</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Batch Type:</label>
          <input
            type="text"
            value={batchType}
            onChange={(e) => setBatchType(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Enrollment No:</label>
          <input
            type="text"
            value={enrollmentNo}
            onChange={(e) => setEnrollmentNo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Year:</label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Achievement:</label>
          <input
            type="text"
            value={achievement}
            onChange={(e) => setAchievement(e.target.value)}
            required
          />
        </div>
        <div>
          <label>IEP:</label>
          <input
            type="text"
            value={iep}
            onChange={(e) => setIep(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Student Info'}
        </button>
      </form>
    </div>
  );
};

export default StudInfo;