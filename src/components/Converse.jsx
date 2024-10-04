import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get, remove } from 'firebase/database';
import "./converse.css";
import MainEvent from './MainEvent';

const Converse = () => {
  const [converses, setConverses] = useState([]);

  const fetchConverseData = async () => {
    const db = getDatabase();
    const converseRef = ref(db, 'converses/');
    try {
      const snapshot = await get(converseRef);
      if (snapshot.exists()) {
        setConverses(Object.entries(snapshot.val()));
      } else {
        console.log('No data available');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteConverse = async (id) => {
    const db = getDatabase();
    const converseRef = ref(db, `converses/${id}`);
    try {
      await remove(converseRef);
      setConverses(converses.filter(([key]) => key !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  useEffect(() => {
    fetchConverseData();
  }, []);

  return (
    <div className='converse-container'>
      <MainEvent />
      <h1>Converse Events</h1>
      <a href="/addconverse">Add Converse</a>
      {converses.length > 0 ? (
        <table className='converse-table'>
          <thead>
            <tr>
              <th>Year</th>
              <th>Event Date</th>
              <th>Faculty Coordinator</th>
              <th>Student Coordinator</th>
              <th>Report</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {converses.map(([id, converse]) => (
              <tr key={id}>
                <td>{converse.year}</td>
                <td>{converse.eventDate}</td>
                <td>{converse.facultyCo}</td>
                <td>{converse.studentCo}</td>
                <td>
                  {converse.reportUrl ? (
                    <a href={converse.reportUrl} target="_blank" rel="noopener noreferrer">
                      View Report
                    </a>
                  ) : (
                    'No Report'
                  )}
                </td>
                <td>
                  <button onClick={() => deleteConverse(id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading Data...</p>
      )}
    </div>
  );
};

export default Converse;