import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import './showind.css';

const ShowInds = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const db = getDatabase();
    const indRef = ref(db, 'industrialVisits');

    get(indRef)
      .then((snapshot) => {
        setLoading(false);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const formattedData = Object.keys(data).map((key) => data[key]);
          setVisits(formattedData);
        } else {
          setVisits([]);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError('Error fetching visits: ' + error.message);
      });
  }, []);

  return (
    <div className="show-industrial-visits">
      <h2>Industrial Visits</h2>
      <a href="/addind">Add Industry</a>
      {loading && <p>Loading visits...</p>}
      {error && <p className="error-message">{error}</p>}
      {visits.length > 0 ? (
        <table className="visits-table">
          <thead>
            <tr>
              <th>Visit Date</th>
              <th>Place of Visit</th>
              <th>Faculty</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {visits.map((visit, index) => (
              <tr key={index}>
                <td>{visit.visitDate}</td>
                <td>{visit.placeOfVisit}</td>
                <td>{visit.faculty}</td>
                <td>
                  {visit.reportUrl && (
                    <a href={visit.reportUrl} target="_blank" rel="noopener noreferrer">
                      View Report
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>No visits found.</p>
      )}
    </div>
  );
};

export default ShowInds;