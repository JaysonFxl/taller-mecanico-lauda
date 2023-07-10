import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { firestore, collection, addDoc, getDocs, query, where } from './Connection.jsx';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Carousel } from 'react-bootstrap';
import { Modal, Button } from 'react-bootstrap';
import './App.css';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

function Inicio() {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center text-center py-5 pt-5 mt-5">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="display-4 mb-4 text-white">Bienvenido a Niki Lauda Taller Mecánico</h1>
        <p className="lead text-white mb-5">En Niki Lauda Taller Mecánico, nos enorgullece ofrecer servicios de reparación y mantenimiento de automóviles de alta calidad. Nuestros técnicos expertos están aquí para atender todas tus necesidades automotrices.</p>
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="d-flex flex-row justify-content-center align-items-stretch mb-5">
          <div className="custom-carousel-container">
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
              alt="Quinta imagen"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="custom-carousel__image"
              src={'https://cdn.motor1.com/images/mgl/2Pn7g/s1/lanzamiento-toyota-rav4-2021.webp'}
              alt="Sextaimagen"
            />
          </Carousel.Item>
            </Carousel>
          </div>
          <div className="virtudes-container ml-5" style={{ marginLeft: '50px', width: '300px' }}>
            <Virtudes />
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="row mt-5 text-white">
          {/* Row items */}
        </div>
      </motion.div>
    </div>
  );
}

function Virtudes() {
  return (
    <div>
      <h2 className="text-white">Calidad</h2>
      <p className="text-white">Ofrecemos servicios de alta calidad gracias a nuestros técnicos expertos y nuestras herramientas de última generación.</p>

      <h2 className="text-white">Confiabilidad</h2>
      <p className="text-white">Nos esforzamos por ganar la confianza de nuestros clientes a través de nuestro trabajo honesto y transparente.</p>

      <h2 className="text-white">Experiencia</h2>
      <p className="text-white">Con años de experiencia en el campo, puedes confiar en que tu vehículo está en buenas manos.</p>
    </div>
  );
}

function ReservarCita() {
  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({ mode: 'onChange' });
  const [showModal, setShowModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false); // Agrega esta línea
  const [formData, setFormData] = useState(null);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const onSubmit = (data) => {
    if (!isValid) {
      Swal.fire(
        'Formulario incompleto',
        'Por favor, completa todos los campos requeridos antes de enviar el formulario.',
        'warning'
      );
      return;
    }

    setFormData(data);
    setShowModal(true);
  };

  const handleCheckCita = async () => {
    const { value: rut } = await Swal.fire({
      title: 'Revisar mi cita',
      input: 'text',
      inputLabel: 'Por favor, ingresa tu RUT',
      inputPlaceholder: 'Ejemplo: 12345678-9',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Revisar',
      showLoaderOnConfirm: true,
      preConfirm: (rut) => {
        if (!rut) {
          Swal.showValidationMessage('Por favor, ingresa tu RUT')
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    });
  
    if (rut) {
      const citaRef = collection(firestore, 'citas');
      const q = query(citaRef, where("rut", "==", rut));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        Swal.fire('No se encontró ninguna cita con ese RUT');
      } else {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          // Aquí puedes mostrar los datos de la cita al usuario
        });
      }
    }
  }; 

  const handleConfirm = async () => {
    try {
      await addDoc(collection(firestore, 'citas'), formData);
      console.log("Documento escrito con éxito");
      Swal.fire(
        'Formulario enviado',
        'Tu formulario ha sido enviado con éxito',
        'success'
      );
      reset();
      setShowModal(false);
    } catch (e) {
      console.error("Error al agregar el documento: ", e);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleLimpiar = () => {
    const formValues = getValues();
    const isEmpty = Object.values(formValues).every(x => (x === null || x === ''));
    if (isEmpty) {
      Swal.fire(
        'Formulario ya está limpio',
        'No hay datos para limpiar en el formulario',
        'info'
      );
    } else {
      reset(); // Limpia los campos del formulario
      Swal.fire(
        'Formulario limpiado',
        'Todos los campos del formulario han sido limpiados',
        'success'
      );
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{height: '100vh'}}>
      <div className="row">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="col-md-6"
        >
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
                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                  <button type="button" className="btn btn-info" onClick={handleCheckCita}>Revisar mi cita</button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="col-md-6"
        >
          <div className="p-5" style={{color: 'gold'}}>
            <h2>¿Por qué reservar con nosotros?</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non lorem pellentesque, lacinia dui sed, ultrices eros. Maecenas non diam cursus, imperdiet massa eget, pellentesque ex. Cras efficitur lacus sem, at dignissim metus dapibus ac.</p>
            <h4>Servicio de calidad: <FontAwesomeIcon icon={faThumbsUp} /></h4>
            <h4>Buen trato al cliente: <FontAwesomeIcon icon={faThumbsUp} /></h4>
            <h4>Respuesta rápida: <FontAwesomeIcon icon={faThumbsUp} /></h4>
            <h4>Precios competitivos: <FontAwesomeIcon icon={faThumbsUp} /></h4>
          </div>
        </motion.div>
      </div>

      <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Revisar mi cita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Aquí puedes agregar el código para mostrar la información de la cita del usuario.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReviewModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Revisión de Datos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="review-data-container">
            <div className="review-data-header">Por favor revisa tus datos antes de enviar:</div>
            {formData && Object.entries(formData).map(([key, value]) => (
              <div className="review-data-item" key={key}>
                <span className="review-data-label">{key}:</span>
                <span className="review-data-value">{value}</span>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Modificar
          </Button>
          <Button className="btn-custom" onClick={handleConfirm}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
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
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: index * 0.1 }}
            className="col-md-6 col-lg-4 mb-4"
          >
            <div className="card h-100 bg-dark text-warning">
              <div className="card-body">
                <h2 className="card-title">{servicio.nombre}</h2>
                <p className="card-text">{servicio.descripcion}</p>
              </div>
            </div>
          </motion.div>
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
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="col-md-6 col-lg-4 mb-4"
        >
          <div className="card bg-dark text-warning h-100">
            <div className="card-body text-center">
              <i className="fas fa-phone fa-3x mb-3"></i>
              <h5 className="card-title">Número de contacto</h5>
              <p className="card-text">(123) 456-7890</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="col-md-6 col-lg-4 mb-4"
        >
          <div className="card bg-dark text-warning h-100">
            <div className="card-body text-center">
              <i className="fas fa-map-marker-alt fa-3x mb-3"></i>
              <h5 className="card-title">Dirección</h5>
              <p className="card-text">123 Calle Principal, Ciudad, Estado, Código Postal</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="col-md-6 col-lg-4 mb-4"
        >
          <div className="card bg-dark text-warning h-100">
            <div className="card-body text-center">
              <i className="fas fa-envelope fa-3x mb-3"></i>
              <h5 className="card-title">Email</h5>
              <p className="card-text">taller@nikilauda.com</p>
            </div>
          </div>
        </motion.div>
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
