import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import './styles.css';
function Register() {
  const [userData, setUserData] = useState({
    nombre: '',
    fechaNacimiento: '',
    correo: '',
    password: '',
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      //const response = await axios.post('http://localhost:5000/api/register', userData);
      const response = await axios.post('https://videohub-backed.vercel.app/api/register', userData);
      if (response.data.success) {
        alert('Usuario registrado correctamente');
        window.location.href = '/';
      } else {
        alert('Usuario registrado correctamente');
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error response:', error.response); // Log the error response
      alert('Error al registrar');
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <div className="register-header">
          <img src="/Imagen_de_WhatsApp_2024-11-18_a_las_16.29.15_ae2981f7-removebg-preview.png" alt="Coca Cola Logo" className="brand-logo" />
          <h2>¡Únete a nuestra promoción!</h2>
          <p className="register-subtitle">Regístrate y participa por increíbles premios</p>
        </div>

        <div className="register-form">
          <input type="text" name="nombre" placeholder="Nombre completo" onChange={handleChange} />
          <input type="date" name="fechaNacimiento" placeholder="Fecha de Nacimiento" onChange={handleChange} />
          <input type="email" name="correo" placeholder="Correo electrónico" onChange={handleChange} />
          <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} />
        </div>

        <button onClick={handleRegister} className="register-button">
          ¡Registrarme ahora!
        </button>

        <div className="register-footer">
          <p>¿Ya tienes una cuenta?</p>
          <button 
            className="login-link"
            onClick={() => window.location.href = '/'}
          >
            Inicia sesión aquí
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;