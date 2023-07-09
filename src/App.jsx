import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Carousel } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import './App.css'; // Asegúrate de importar tu archivo CSS

function Inicio() {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center text-center py-5 pt-5 mt-5">
      <Fade top>
        <h1 className="display-4 mb-4 text-white">Bienvenido a Niki Lauda Taller Mecánico</h1>
        <p className="lead text-white mb-5">En Niki Lauda Taller Mecánico, nos enorgullece ofrecer servicios de reparación y mantenimiento de automóviles de alta calidad. Nuestros técnicos expertos están aquí para atender todas tus necesidades automotrices.</p>
      </Fade>
      <Zoom>
        <div className="custom-carousel-container mb-5">
        <Carousel className="custom-carousel">
          <Carousel.Item>
            <img
              className="custom-carousel__image"
              src={'https://images6.alphacoders.com/859/859598.jpg'}
              alt="Primera imagen"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="custom-carousel__image"
              src={'https://w0.peakpx.com/wallpaper/378/478/HD-wallpaper-audi-audi-r8-v10.jpg'}
              alt="Segunda imagen"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="custom-carousel__image"
              src={'https://p4.wallpaperbetter.com/wallpaper/1010/246/378/dodge-challenger-srt-demon-download-hd-for-pc-wallpaper-preview.jpg'}
              alt="Tercera imagen"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="custom-carousel__image"
              src={'https://cdn.motor1.com/images/mgl/e23WP/s1/lanzamiento-ford-ranger-2019.webp'}
              alt="Cuarta imagen"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="custom-carousel__image"
              src={'https://dercocenter-api.s3.us-east-1.amazonaws.com/images/carcontent/2021-09-21-WEB_EXTERIOR-SWIFT_DESKTOP-1200x700-extra2.jpg'}
              alt="Cuarta imagen"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="custom-carousel__image"
              src={'DESKTOP-1200x700-extra2.jpg'}
              alt="Cuarta imagen"
            />
          </Carousel.Item>
        </Carousel>
        </div>
      </Zoom>
      <Fade bottom cascade>
        <div className="row mt-5 text-white">
          <div className="col-md-4">
            <h2>Calidad</h2>
            <p>Ofrecemos servicios de alta calidad gracias a nuestros técnicos expertos y nuestras herramientas de última generación.</p>
          </div>
          <div className="col-md-4">
            <h2>Confiabilidad</h2>
            <p>Nos esforzamos por ganar la confianza de nuestros clientes a través de nuestro trabajo honesto y transparente.</p>
          </div>
          <div className="col-md-4">
            <h2>Experiencia</h2>
            <p>Con años de experiencia en el campo, puedes confiar en que tu vehículo está en buenas manos.</p>
          </div>
        </div>
      </Fade>
    </div>
  );
}

function ReservarCita() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <div className="container py-5">
      <h1 className="display-4 mb-4 text-center">Reservar Cita</h1>
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
        
        <input type="submit" className="btn btn-warning" />
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
    <div className="container py-5 mt-5">
      <h1 className="display-4 mb-4 text-center">Servicios</h1>
      <div className="row">
        {servicios.map((servicio, index) => (
          <Fade bottom cascade>
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 bg-dark text-warning">
                <div className="card-body">
                  <h2 className="card-title">{servicio.nombre}</h2>
                  <p className="card-text">{servicio.descripcion}</p>
                </div>
              </div>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
}

function Contacto() {
  return (
    <div className="container text-center py-5">
      <h1 className="display-4 mb-4">Contacto</h1>
      <p className="lead">Número de contacto: (123) 456-7890</p>
      <p className="lead">Dirección: 123 Calle Principal, Ciudad, Estado, Código Postal</p>
      <p className="lead">Email: taller@nikilauda.com</p>
    </div>
  );
}

function Navegacion() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/" style={{ fontSize: '2rem' }}>Niki Lauda Taller Mecánico</Link>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link custom-nav-link" to="/">Inicio</Link></li>
            <li className="nav-item"><Link className="nav-link custom-nav-link" to="/servicios">Servicios</Link></li>
            <li className="nav-item"><Link className="nav-link custom-nav-link" to="/contacto">Contacto</Link></li>
            <li className="nav-item"><Link className="nav-link custom-nav-link" to="/reservar-cita">Reservar Cita</Link></li>
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
