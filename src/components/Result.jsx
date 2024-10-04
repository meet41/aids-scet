import React, { useState, useEffect } from 'react';
import { getDatabase, ref, query, orderByChild, equalTo, get, remove } from 'firebase/database';
import './Result.css';
import './AboutUs.css';

function Result() {
  const [type, setType] = useState('');
  const [resultType, setResultType] = useState('');
  const [resultSubType, setResultSubType] = useState('');
  const [resultData, setResultData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTypeChange = (selectedType) => {
    setType(selectedType);
  };

  const handleResultTypeChange = (e) => {
    setResultType(e.target.value);
  };

  const handleResultSubTypeChange = (e) => {
    setResultSubType(e.target.value);
  };

  const handleDelete = (id) => {
    const db = getDatabase();
    const resultRef = ref(db, `results/${id}`);
    remove(resultRef)
      .then(() => {
        setResultData(resultData.filter((item) => item.id !== id));
      })
      .catch((error) => {
        setError('Error deleting result: ' + error.message);
      });
  };

  useEffect(() => {
    if (type || resultType || resultSubType) {
      setLoading(true);
      setError(null);

      const db = getDatabase();
      const resultsRef = ref(db, 'results');
      let resultsQuery = query(resultsRef);

      if (type) {
        resultsQuery = query(resultsRef, orderByChild('type'), equalTo(type));
      }
      if (resultType) {
        resultsQuery = query(resultsRef, orderByChild('resultType'), equalTo(resultType));
      }
      if (resultSubType) {
        resultsQuery = query(resultsRef, orderByChild('resultSubType'), equalTo(resultSubType));
      }

      get(resultsQuery)
        .then((snapshot) => {
          setLoading(false);
          if (snapshot.exists()) {
            const data = snapshot.val();
            const formattedData = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
            setResultData(formattedData);
          } else {
            setResultData([]);
          }
        })
        .catch((error) => {
          setLoading(false);
          setError('Error fetching result data: ' + error.message);
        });
    }
  }, [type, resultType, resultSubType]);

  return (
    <div className="result-container">
      <marquee behavior="" className="marquee-container" direction="ltr">
        <div className="links">
          <a href="/addanalysis">Add Result Analysis</a>
        </div>
      </marquee>
      <h2 className="result-header">Results</h2>
      <div className="type-buttons">
        <div className="address result-header"><a href="/addresults">Add Results</a></div>
        <div
          className={`type-button ${type === 'Internal' ? 'selected' : ''}`}
          onClick={() => handleTypeChange('Internal')}
        >
          <span>INTERNAL</span>
        </div>
        <div
          className={`type-button ${type === 'External' ? 'selected' : ''}`}
          onClick={() => handleTypeChange('External')}
        >
          <span>EXTERNAL</span>
        </div>
        <div
          className={`type-button ${type === 'Midterm' ? 'selected' : ''}`}
          onClick={() => handleTypeChange('Midterm')}
        >
          <span>MID TERM</span>
        </div>
      </div>

      <div className="filter-select">
        <label>Select Result Type:</label>
        <select value={resultType} onChange={handleResultTypeChange}>
          <option value="">Select</option>
          <option value="Summer">Summer</option>
          <option value="Winter">Winter</option>
        </select>
      </div>

      <div className="filter-select">
        <label>Select Result Sub-Type:</label>
        <select value={resultSubType} onChange={handleResultSubTypeChange}>
          <option value="">Select</option>
          <option value="Regular">Regular</option>
          <option value="Backlog">Backlog</option>
        </select>
      </div>

      {loading && <p className="loading-message">Loading results...</p>}
      {error && <p className="error-message">{error}</p>}

      {resultData.length > 0 ? (
        <table className="result-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Year</th>
              <th>Semester</th>
              <th>Classname</th>
              <th>Schedule PDF</th>
              <th>Seating PDF</th>
              <th>Result PDF</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {resultData.map((item, index) => (
              <tr key={index}>
                <td>{item.type}</td>
                <td>{item.year}</td>
                <td>{item.semester}</td>
                <td>{item.classname}</td>
                <td>
                  <a href={item.schedulePdfUrl} target="_blank" rel="noopener noreferrer">
                    View Schedule
                  </a>
                </td>
                <td>
                  <a href={item.seatingPdfUrl} target="_blank" rel="noopener noreferrer">
                    View Seating
                  </a>
                </td>
                <td>
                  <a href={item.resultPdfUrl} target="_blank" rel="noopener noreferrer">
                    View Result
                  </a>
                </td>
                <td>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : !loading && !error && (
        <p className="no-data-message">No results found for the selected filters.</p>
      )}
    </div>
  );
}

export default Result;