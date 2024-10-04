import React, { useState, useEffect } from 'react';
import { storage, ref, uploadBytesResumable, getDownloadURL, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './ImageUploader.css';

const ImageUploader = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleUpload = () => {
    if (!imageFile || !user) return;

    const storageRef = ref(storage, `images/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.error('Upload failed:', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setDownloadURL(url);
          console.log('File available at', url);
        });
      }
    );
  };

  return (
    <div>
      <h2><a href="/others">Click to Add Others Data</a></h2>
      <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={!user}>Upload</button>
      <div>Upload Progress: {uploadProgress}%</div>
      {downloadURL && (
        <div>
          <p>File available at:</p>
          <a href={downloadURL} target="_blank" rel="noopener noreferrer">{downloadURL}</a>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;