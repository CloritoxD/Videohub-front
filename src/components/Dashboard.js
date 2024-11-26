import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para la barra de búsqueda
  const [filteredVideos, setFilteredVideos] = useState([]); // Videos filtrados

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('https://videohub-backed.vercel.app/videos');
        setVideos(response.data);
        setFilteredVideos(response.data); // Inicializar videos filtrados
      } catch (error) {
        console.error("Error al obtener los videos:", error);
      }
    };

    fetchVideos();
  }, []);

  // Filtrar los videos en función del término de búsqueda
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = videos.filter((video) =>
      video.nombre.toLowerCase().includes(term) // Filtra por el nombre del video
    );
    setFilteredVideos(filtered);
  };

  return (
    <div>
      <h1>Videos Subidos</h1>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar por nombre de video..."
        value={searchTerm}
        onChange={handleSearch}
        style={{
          padding: '10px',
          width: '300px',
          marginBottom: '20px',
          fontSize: '16px',
        }}
      />

      <ul>
        {filteredVideos.map((video, index) => (
          <li key={index}>
            <video width="320" height="240" controls>
              <source src={video.url} type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
            <p>{video.nombre}</p>
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
