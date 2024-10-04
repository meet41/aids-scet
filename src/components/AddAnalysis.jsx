import React, { useState } from 'react';
import { getDatabase, ref, update } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

function AddAnalysis() {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [resultPdf, setResultPdf] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setResultPdf(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getDatabase();
    const storage = getStorage();

    const uploadFile = async (file) => {
      if (file) {
        const fileRef = storageRef(storage, `analysis/${year}/${semester}-${file.name}`);
        await uploadBytes(fileRef, file);
        return getDownloadURL(fileRef);
      }
      return null;
    };

    const resultPdfUrl = await uploadFile(resultPdf);

    if (resultPdfUrl) {
      const updates = {};
      updates[`analysis/${year}/semesters/${semester}`] = resultPdfUrl;

      await update(ref(db), updates);

      // Reset the form
      setYear('');
      setSemester('');
      setResultPdf(null);
      navigate('/showanalysis');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Year:</label>
        <input type="text" value={year} onChange={(e) => setYear(e.target.value)} required />
      </div>
      <div>
        <label>Semester:</label>
        <input type="text" value={semester} onChange={(e) => setSemester(e.target.value)} required />
      </div>
      <div>
        <label>Result PDF:</label>
        <input type="file" onChange={handleFileChange} required />
      </div>
      <button type="submit">Add Result</button>
    </form>
  );
}

export default AddAnalysis;
