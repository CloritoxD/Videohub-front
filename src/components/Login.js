import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import './styles.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      // Replace with production URL when deploying
      //const response = await axios.post('https://proyecto-promociona.vercel.app/api/login', { username, password });

      if (response.data.success) {
        const userId = response.data.user._id; // Get userId from response
        localStorage.setItem('userId', userId); // Store userId in localStorage

        // Redirect based on user type
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