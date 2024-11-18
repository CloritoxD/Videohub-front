import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importa Link

const Dashboard = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/videos'); // Asegúrate de que la URL sea correcta
        setVideos(response.data);
      } catch (error) {
        console.error("Error al obtener los videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      <h1>Videos Subidos</h1>
      <ul>
        {videos.map((videoName, index) => (
          <li key={index}>
            <video width="320" height="240" controls>
              <source src={`https://videohubmiguel.s3.us-east-2.amazonaws.com/${videoName}`} type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
            <p>{videoName}</p>
          </li>
        ))}
      </ul>
      {/* Botón para ir al perfil */}
      <Link to="/profile">
        <button style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
          Ir al Perfil
        </button>
      </Link>
    </div>
  );
};

export default Dashboard;