import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import MainAcademics from './MainAcademics';

function ShowAnalysis() {
  const [data, setData] = useState({});
  const [semesters, setSemesters] = useState([]);
  const [years, setYears] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const resultsRef = ref(db, 'analysis');

    onValue(resultsRef, (snapshot) => {
      const results = snapshot.val();
      
      if (results) {
        setData(results);

        // Extract unique semesters and years for headers
        const uniqueSemesters = Array.from(
          new Set(
            Object.values(results)
              .flatMap(item => item.semesters ? Object.keys(item.semesters) : [])
          )
        );
        const uniqueYears = Object.keys(results);

        setSemesters(uniqueSemesters);
        setYears(uniqueYears);
      }
    });
  }, []);

  const handleDelete = (year, semester) => {
    const db = getDatabase();
    const resultRef = ref(db, `analysis/${year}/semesters/${semester}`);
    remove(resultRef)
      .then(() => {
        setData(prevData => {
          const updatedData = { ...prevData };
          delete updatedData[year].semesters[semester];
          if (Object.keys(updatedData[year].semesters).length === 0) {
            delete updatedData[year];
          }
          return updatedData;
        });
      })
      .catch((error) => {
        setError('Error deleting analysis: ' + error.message);
      });
  };

  return (
    <div className="analysis-container">
      <MainAcademics/>
      <h1>Result Analysis</h1>
      {error && <p className="error-message">{error}</p>}
      <table className="result-table">
        <thead>
          <tr>
            <th>Admission Year</th>
            {semesters.map(semester => (
              <th key={semester}>{semester}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {years.map(year => (
            <tr key={year}>
              <td>{year}</td>
              {semesters.map(semester => (
                <td key={`${year}-${semester}`}>
                  {data[year]?.semesters?.[semester] ? (
                    <a 
                      href={data[year].semesters[semester]} 
                      target="_blank" 
                      rel="noopener noreferrer">
                        View PDF
                    </a>
                  ) : (
                    <span> - </span>
                  )}
                </td>
              ))}
              <td>
                {semesters.map(semester => (
                  data[year]?.semesters?.[semester] && (
                    <button 
                      key={`${year}-${semester}-delete`} 
                      onClick={() => handleDelete(year, semester)}>
                      Delete
                    </button>
                  )
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowAnalysis;