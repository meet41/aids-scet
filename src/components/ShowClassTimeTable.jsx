import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get, remove } from 'firebase/database';
import MainAcademics from './MainAcademics';
import './ShowClassTimeTable.css';

const ShowClassTimetable = () => {
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const db = getDatabase();
    const timetableRef = ref(db, 'classTimetables');

    get(timetableRef)
      .then((snapshot) => {
        setLoading(false);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const formattedData = Object.keys(data).map((key) => ({ no: key, ...data[key] }));
          setTimetables(formattedData);
        } else {
          setTimetables([]);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError('Error fetching timetables: ' + error.message);
      });
  }, []);

  const handleDelete = (no) => {
    const db = getDatabase();
    const timetableRef = ref(db, `classTimetables/${no}`);
    remove(timetableRef)
      .then(() => {
        setTimetables(timetables.filter((timetable) => timetable.no !== no));
      })
      .catch((error) => {
        setError('Error deleting timetable: ' + error.message);
      });
  };

  return (
    <div className="show-class-timetable">
      <MainAcademics />
      <h2>Class Timetables</h2>
      <div className="link">
        <h5><a href="/addcalender">Click to Add Class Time Table</a></h5>
      </div>
      {loading && <p>Loading timetables...</p>}
      {error && <p className="error-message">{error}</p>}
      {timetables.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Semester</th>
              <th>PDF</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {timetables.map((timetable, index) => (
              <tr key={index}>
                <td>{timetable.no}</td>
                <td>{timetable.semester}</td>
                <td>
                  {timetable.pdfUrl && (
                    <a href={timetable.pdfUrl} target="_blank" rel="noopener noreferrer">
                      View PDF
                    </a>
                  )}
                </td>
                <td>
                  <button onClick={() => handleDelete(timetable.no)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>No timetables found.</p>
      )}
    </div>
  );
};

export default ShowClassTimetable;