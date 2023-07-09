import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
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
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log(data);
    Swal.fire(
      'Formulario enviado',
      'Tu formulario ha sido enviado con éxito',
      'success'
    );
  };
  const handleLimpiar = () => {
    reset(); // Limpia los campos del formulario
    Swal.fire(
      'Formulario limpiado',
      'Todos los campos del formulario han sido limpiados',
      'success'
    );
  };

  return (
    <div className="container py-5 mt-5">
      <Fade bottom>
        <div className="card">
          <div className="card-body">
            <h1 className="display-4 mb-4 text-center">Reservar Cita</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
          <div className="col-md-6 mb-3">
            <input {...register("rut", { required: true })} placeholder="RUT" className="form-control" />
            {errors.rut && <div className="text-danger">Este campo es requerido</div>}
          </div>
          <div className="col-md-6 mb-3">
            <input {...register("nombre", { required: true })} placeholder="Nombre" className="form-control" />
            {errors.nombre && <div className="text-danger">Este campo es requerido</div>}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <input {...register("apellido", { required: true })} placeholder="Apellido" className="form-control" />
            {errors.apellido && <div className="text-danger">Este campo es requerido</div>}
          </div>
          <div className="col-md-6 mb-3">
            <input {...register("email", { required: true })} placeholder="Email" className="form-control" />
            {errors.email && <div className="text-danger">Este campo es requerido</div>}
          </div>
        </div>
        <div className="row">
        <div className="col-md-6 mb-3">
          <div className="input-group">
            <span className="input-group-text" id="basic-addon1">+56</span>
            <input {...register("telefono", { required: true, pattern: /^[0-9]*$/ })} placeholder="Teléfono" className="form-control" />
          </div>
          {errors.telefono && <div className="text-danger">Este campo es requerido y solo debe contener números</div>}
        </div>
          <div className="col-md-6 mb-3">
            <select {...register("motivo", { required: true })} className="form-control">
              <option value="">-- Seleccione un motivo --</option>
              <option value="reparacion">Reparación</option>
              <option value="mantenimiento">Mantenimiento</option>
            </select>
            {errors.motivo && <div className="text-danger">Este campo es requerido</div>}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <input {...register("patente", { required: true })} placeholder="Patente del vehículo" className="form-control" />
            {errors.patente && <div className="text-danger">Este campo es requerido</div>}
          </div>
          <div className="col-md-6 mb-3">
            <input {...register("modelo", { required: true })} placeholder="Modelo del vehículo" className="form-control" />
            {errors.modelo && <div className="text-danger">Este campo es requerido</div>}
          </div>
        </div>
        <div className="mb-3">
          <textarea {...register("detalles", { required: true })} placeholder="Detalles de la consulta" className="form-control" rows="3"></textarea>
          {errors.detalles && <div className="text-danger">Este campo es requerido</div>}
        </div>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <input type="submit" className="btn btn-warning" value="Enviar" />
                <button type="button" className="btn btn-danger" onClick={handleLimpiar}>Limpiar</button>
              </div>
            </form>
          </div>
        </div>
      </Fade>
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
    <div className="container py-5 mt-5">
      <h1 className="display-4 mb-4 text-center">Contacto</h1>
      <div className="row justify-content-center">
        <Fade left>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card bg-dark text-warning h-100">
              <div className="card-body text-center">
                <i className="fas fa-phone fa-3x mb-3"></i>
                <h5 className="card-title">Número de contacto</h5>
                <p className="card-text">(123) 456-7890</p>
              </div>
            </div>
          </div>
        </Fade>
        <Fade bottom>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card bg-dark text-warning h-100">
              <div className="card-body text-center">
                <i className="fas fa-map-marker-alt fa-3x mb-3"></i>
                <h5 className="card-title">Dirección</h5>
                <p className="card-text">123 Calle Principal, Ciudad, Estado, Código Postal</p>
              </div>
            </div>
          </div>
        </Fade>
        <Fade right>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card bg-dark text-warning h-100">
              <div className="card-body text-center">
                <i className="fas fa-envelope fa-3x mb-3"></i>
                <h5 className="card-title">Email</h5>
                <p className="card-text">taller@nikilauda.com</p>
              </div>
            </div>
          </div>
        </Fade>
      </div>
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
