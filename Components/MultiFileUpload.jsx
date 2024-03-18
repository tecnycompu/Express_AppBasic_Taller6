// MultiFileUpload.jsx
import React, { useState } from 'react';
import axios from 'axios';


const MultiFileUpload = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    setFiles(selectedFiles);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
      await axios.post('http://localhost:3000/multiupload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Archivos subidos correctamente');
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleSubmit}>Subir archivos</button>
      {files.length > 0 && (
        <div>
          <h2>Archivos seleccionados:</h2>
          <ul>
            {Array.from(files).map((file, index) => (
              <li key={index}>
                {file.name} - {file.type}
              </li>
            ))}
          </ul>
        </div>
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default MultiFileUpload;
