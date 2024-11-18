import React, { useState } from 'react';
import axios from 'axios';
import './Profile.css'; // Asegúrate de tener tus estilos

function Profile() {
    const [videoFile, setVideoFile] = useState(null);
    const [videoUrl, setVideoUrl] = useState("/videos/default.mp4"); // URL predeterminada para el video
    const [uploadMessage, setUploadMessage] = useState('');

    const controlCambioVideo = (event) => {
        const archivoSubido = event.target.files[0]; // video

        if (archivoSubido) {
            const fileName = archivoSubido.name.toLowerCase();
            // Solamente archivos mp4
            if (fileName.endsWith('.mp4')) {
                setVideoFile(archivoSubido); // si es mp4, entonces guardamos en videoFile.
            } else {
                alert("Por favor, sube un archivo .mp4");
            }
        }
    };

    const controlSubida = async (event) => {
        event.preventDefault();

        if (!videoFile) {
            alert("Por favor, sube un archivo");
        } else {
            const formData = new FormData();
            formData.append('video', videoFile);

            // Enviar el video al servidor
            try {
                axios.post('https://videohub-backed.vercel.app/subida', formData)
  .then((response) => {  // Asegúrate de que 'response' esté definido aquí
    console.log('Video subido:', response.data);
  })
  .catch((error) => {
    console.error('Error al subir el video:', error);
  });
            } catch (error) {
                console.error("Error al subir el video:", error);
                setUploadMessage("Error al subir el video. Inténtalo de nuevo.");
            }
        }
    };

    const controlEliminar = async () => {
        try {
            const response = axios.post('https://videohub-backed.vercel.app/eliminar', { videoName: 'your_video_name.mp4' })
            if (response.status === 200) {
                setVideoUrl("/videos/default.mp4"); // URL predeterminada para el video
                setUploadMessage("Video eliminado correctamente.");
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
            <video className='videoPlayer my-5' controls src={videoUrl} width="600" />
            <form>
                <div className="mb-3">
                    <input className="form-control" accept=".mp4" type="file" id="formFile" onChange={controlCambioVideo} />
                </div>
                <button type="submit" className="btn btn-primary w-100" onClick={controlSubida}>Subir video</button>
                <button type="button" className="btn btn-danger w-100 mt-3" onClick={controlEliminar}>Eliminar video</button>
            </form>
            {uploadMessage && <p>{uploadMessage}</p>} {/* Mostrar mensaje de estado */}
        </div>
    );
}

export default Profile;