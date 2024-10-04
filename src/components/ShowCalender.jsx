import React, { useState, useEffect } from 'react';
import { getDatabase, ref, query, orderByChild, equalTo, get, remove } from 'firebase/database';
import './ShowCalender.css';
import MainAcademics from './MainAcademics';

const ShowCalendar = () => {
  const [calendarType, setCalendarType] = useState('');
  const [calendarData, setCalendarData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCalendarTypeChange = (selectedCalendarType) => {
    setCalendarType(selectedCalendarType);
  };

  useEffect(() => {
    if (calendarType) {
      setLoading(true);
      setError(null);

      const db = getDatabase();
      const calendarRef = ref(db, 'calendars');
      const calendarQuery = query(calendarRef, orderByChild('calendarType'), equalTo(calendarType));

      get(calendarQuery)
        .then((snapshot) => {
          setLoading(false);
          if (snapshot.exists()) {
            const data = snapshot.val();
            const formattedData = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
            setCalendarData(formattedData);
          } else {
            setCalendarData([]);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error('Error fetching calendar data:', error);
          setError('Error fetching calendar data: ' + error.message);
        });
    }
  }, [calendarType]);

  const handleDelete = (id) => {
    const db = getDatabase();
    const calendarRef = ref(db, `calendars/${id}`);
    remove(calendarRef)
      .then(() => {
        setCalendarData(calendarData.filter((item) => item.id !== id));
      })
      .catch((error) => {
        setError('Error deleting calendar: ' + error.message);
      });
  };

  return (
    <div className="show-calendar-container">
      <MainAcademics />
      <h2><a href="/addtable">Click here to Add Calender</a></h2>
      <h2 className="calendar-header">Academic Calendars</h2>

      <div className="calendar-type-buttons">
        {['University Academic Calendar', 'College Academic Calendar', 'Department Academic Calendar'].map((type) => (
          <div
            key={type}
            className={`calendar-type-button ${calendarType === type ? 'selected' : ''}`}
            onClick={() => handleCalendarTypeChange(type)}
          >
            <span>{type}</span>
          </div>
        ))}
      </div>

      {loading && <p className="loading-message">Loading calendar data...</p>}
      {error && <p className="error-message">{error}</p>}

      {calendarData.length > 0 ? (
        <ul className="calendar-list">
          {calendarData.map((item, index) => (
            <li key={index} className="calendar-item">
              <h3>{item.calendarType}</h3>
              <p>Academic Year: {item.academicYear}</p>
              <p>Semester: {item.semester}</p>
              {item.pdfUrl && (
                <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer">
                  View PDF
                </a>
              )}
              <button className='btn-delete' onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : !loading && !error && (
        <p className="no-data-message">No calendars found for the selected type.</p>
      )}
    </div>
  );
};

export default ShowCalendar;