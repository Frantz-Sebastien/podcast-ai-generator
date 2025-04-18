import React, { useState } from 'react';

const AudioInput = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('audioFile', file);

    try {
      const response = await fetch('http://localhost:4000/upload-audio', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      setMessage(result.message || 'File uploaded successfully');
    } catch (error) {
      setMessage('Error uploading file.');
    }
  };

  return (
    <div>
      <h2>Upload Audio</h2>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AudioInput;
