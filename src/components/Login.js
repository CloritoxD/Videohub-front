import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import './styles.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Enviar solicitud al backend
      const response = await axios.post('https://videohub-backed.vercel.app/api/login', { username, password });

      if (response.data.success) {
        // Guardar userId y correo en localStorage
        const userId = response.data.user._id;
        const correo = response.data.user.correo; // Obtener correo desde la respuesta
        localStorage.setItem('userId', userId);
        localStorage.setItem('correo', correo); // Guardar el correo en localStorage

        // Redirigir según el tipo de usuario
        window.location.href = response.data.userType === 'user' ? '/dashboard' : '/admin-dashboard';
      } else {
        alert('Login incorrecto');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-header">
          <img src="/Imagen_de_WhatsApp_2024-11-18_a_las_16.29.15_ae2981f7-removebg-preview.png" alt="Coca Cola Logo" className="brand-logo" />
          <h2>¡Bienvenido de vuelta!</h2>
        </div>
        
        <input
          type="text"
          placeholder="Correo"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Entrar</button>
        
        <div className="login-footer">
          <p>¿Aún no tienes cuenta?</p>
          <button 
            className="register-link"
            onClick={() => window.location.href = '/register'}
          >
            Regístrate aquí
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
