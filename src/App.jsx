import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Inicio() {
  return (
    <div>
      <h1>Bienvenido a Niki Lauda Taller Mecánico</h1>
      <p>Aquí va la información del taller...</p>
    </div>
  );
}

function ReservarCita() {
  return (
    <div>
      <h1>Reservar Cita</h1>
      <p>Aquí va el formulario para reservar una cita...</p>
    </div>
  );
}

function Servicios() {
  return (
    <div>
      <h1>Servicios</h1>
      <p>Aquí va la información sobre los servicios que ofrece el taller...</p>
    </div>
  );
}

function Contacto() {
  return (
    <div>
      <h1>Contacto</h1>
      <p>Aquí va la información de contacto del taller...</p>
    </div>
  );
}

function Navegacion() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/reservar-cita">Reservar Cita</Link></li>
        <li><Link to="/servicios">Servicios</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Navegacion />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/reservar-cita" element={<ReservarCita />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
