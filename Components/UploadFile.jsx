import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Archivo subido correctamente');
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Subir archivo</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default FileUpload;