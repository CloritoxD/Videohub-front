import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Profile() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoName, setVideoName] = useState('');
  const [correo, setCorreo] = useState(''); // Suponiendo que el correo del usuario está disponible
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "video/mp4") {
      setVideoFile(file);
    } else {
      alert("Por favor, sube un archivo .mp4 válido.");
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!videoFile || !videoName.trim() || !correo.trim()) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('videoName', videoName);
    formData.append('correo', correo);

    try {
      const response = await axios.post('https://videohub-backed.vercel.app/subida', formData);
      setUploadMessage("Video subido correctamente.");
    } catch (error) {
      console.error("Error al subir el video:", error);
      setUploadMessage("Error al subir el video. Inténtalo de nuevo.");
    }
  };

  return (
    <div>
      <h1>Subir Video</h1>
      <form onSubmit={handleUpload}>
        <div>
          <input
            type="text"
            placeholder="Nombre del video"
            value={videoName}
            onChange={(e) => setVideoName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Tu correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>
        <div>
          <input type="file" accept="video/mp4" onChange={handleFileChange} />
        </div>
        <button type="submit">Subir Video</button>
        {/* Botón para ir al menu */}
        <Link to="/Dashboard">
            <button style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
            Al menu principal
            </button>
            </Link>
      </form>
      {uploadMessage && <p>{uploadMessage}</p>}
    </div>
  );
}

export default Profile;
