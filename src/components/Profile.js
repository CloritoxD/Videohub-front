import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css'; // Asegúrate de tener tus estilos

function Profile() {
    const [videoFile, setVideoFile] = useState(null);
    const [videos, setVideos] = useState([]); // Lista de videos subidos por el usuario
    const [uploadMessage, setUploadMessage] = useState('');
    const userEmail = localStorage.getItem('correo'); // Obtener el correo del usuario desde localStorage

    // Cargar los videos del usuario al cargar el componente
    useEffect(() => {
        const fetchVideos = async () => {
            if (!userEmail) {
                setUploadMessage("No se pudo obtener el correo del usuario.");
                return;
            }

            try {
                const response = await axios.get(`https://videohub-backed.vercel.app/videos/${userEmail}`);
                setVideos(response.data); // Guardar la lista de videos en el estado
            } catch (error) {
                console.error("Error al obtener los videos del usuario:", error);
                setUploadMessage("Error al cargar los videos. Inténtalo de nuevo.");
            }
        };

        fetchVideos();
    }, [userEmail]); // Ejecutar cuando cambie el correo del usuario

    const controlCambioVideo = (event) => {
        const archivoSubido = event.target.files[0];

        if (archivoSubido) {
            const fileName = archivoSubido.name.toLowerCase();
            if (fileName.endsWith('.mp4')) {
                setVideoFile(archivoSubido); // Si es un archivo válido, guardarlo
            } else {
                alert("Por favor, sube un archivo .mp4");
            }
        }
    };

    const controlSubida = async (event) => {
        event.preventDefault();

        if (!videoFile) {
            alert("Por favor, selecciona un archivo para subir.");
            return;
        }

        if (!userEmail) {
            alert("No se pudo obtener el correo del usuario.");
            return;
        }

        const formData = new FormData();
        formData.append('video', videoFile);
        formData.append('correo', userEmail); // Incluir el correo del usuario

        try {
            const response = await axios.post('https://videohub-backed.vercel.app/subida', formData);
            setUploadMessage("Video subido correctamente.");
            setVideos((prevVideos) => [...prevVideos, response.data]); // Agregar el nuevo video a la lista
        } catch (error) {
            console.error("Error al subir el video:", error);
            setUploadMessage("Error al subir el video. Inténtalo de nuevo.");
        }
    };

    const controlEliminar = async (videoName) => {
        try {
            const response = await axios.post('https://videohub-backed.vercel.app/eliminar', { videoName });
            if (response.status === 200) {
                setUploadMessage("Video eliminado correctamente.");
                setVideos((prevVideos) => prevVideos.filter(video => !video.url.includes(videoName))); // Quitar el video eliminado
            } else {
                setUploadMessage("Error al eliminar el video.");
            }
        } catch (error) {
            console.error("Error al eliminar el video:", error);
            setUploadMessage("Error al eliminar el video. Inténtalo de nuevo.");
        }
    };

    return (
        <div className="profile-container">
            <h1>Perfil de Usuario</h1>
            <form>
                <div className="mb-3">
                    <input
                        className="form-control"
                        accept=".mp4"
                        type="file"
                        id="formFile"
                        onChange={controlCambioVideo}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100" onClick={controlSubida}>
                    Subir video
                </button>
           {/* Botón para ir al menu */}
           <Link to="/Dashboard">
            <button style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
            Al menu principal
            </button>
            </Link>
            </form>

            {uploadMessage && <p>{uploadMessage}</p>}

            <div className="video-list">
                {videos.length > 0 ? (
                    videos.map((video) => (
                        <div key={video.url} className="video-item">
                            <video controls src={video.url} width="400" />
                            <button
                                className="btn btn-danger mt-2"
                                onClick={() => controlEliminar(video.url.split('/').pop())}
                            >
                                Eliminar
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No has subido videos todavía.</p>
                )}
            </div>
        </div>
    );
}

export default Profile;
