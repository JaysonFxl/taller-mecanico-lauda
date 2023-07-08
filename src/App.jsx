import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './App.css';

function Inicio() {
  return (
    <div className="container">
      <h1 className="my-3">Bienvenido a Niki Lauda Taller Mecánico</h1>
      <p>Aquí va la información del taller...</p>
    </div>
  );
}

function ReservarCita() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <div className="container">
      <h1 className="my-3">Reservar Cita</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <input {...register("nombre", { required: true })} placeholder="Nombre" className="form-control" />
          {errors.nombre && <div className="text-danger">Este campo es requerido</div>}
        </div>
        
        <div className="mb-3">
          <input {...register("email", { required: true })} placeholder="Email" className="form-control" />
          {errors.email && <div className="text-danger">Este campo es requerido</div>}
        </div>
        
        <div className="mb-3">
          <input {...register("fecha", { required: true })} type="date" className="form-control" />
          {errors.fecha && <div className="text-danger">Este campo es requerido</div>}
        </div>
        
        <input type="submit" className="btn btn-primary" />
      </form>
    </div>
  );
}

function Servicios() {
  const servicios = [
    { nombre: 'Cambio de aceite', descripcion: 'Cambio de aceite y filtro.' },
    { nombre: 'Alineación', descripcion: 'Alineación y balanceo de neumáticos.' },
    { nombre: 'Frenos', descripcion: 'Inspección y reparación de frenos.' },
    { nombre: 'Batería', descripcion: 'Prueba y reemplazo de baterías.' },
    { nombre: 'Aire acondicionado', descripcion: 'Servicio y reparación de sistemas de aire acondicionado.' },
    { nombre: 'Diagnóstico del motor', descripcion: 'Diagnóstico y reparación de problemas del motor.' },
    { nombre: 'Inspección pre-compra', descripcion: 'Inspección completa del vehículo antes de la compra.' },
  ];

  return (
    <div className="container">
      <h1 className="my-3">Servicios</h1>
      {servicios.map((servicio, index) => (
        <div key={index} className="card mb-3">
          <div className="card-body">
            <h2 className="card-title">{servicio.nombre}</h2>
            <p className="card-text">{servicio.descripcion}</p>
          </div>
        </div>
      ))}
    </div>
  );
}


function Contacto() {
  return (
    <div className="container">
      <h1 className="my-3">Contacto</h1>
      <p>Número de contacto: (123) 456-7890</p>
      <p>Dirección: 123 Calle Principal, Ciudad, Estado, Código Postal</p>
      <p>Email: taller@nikilauda.com</p>
    </div>
  );
}


function Navegacion() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Niki Lauda Taller Mecánico</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/reservar-cita">Reservar Cita</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/servicios">Servicios</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
          </ul>
        </div>
      </div>
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