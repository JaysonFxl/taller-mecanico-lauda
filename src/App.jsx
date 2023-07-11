import React from 'react'; //React: es una biblioteca de JavaScript para construir interfaces de usuario.
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';//react-router-dom: se usa para manejar el enrutamiento en tu aplicación React
import { doc, getDoc, setDoc } from "firebase/firestore";//firebase/firestore: se usa para interactuar con una base de datos Firestore de Firebase.
import { db, collection, addDoc, getDocs, query, where, deleteDoc } from './Connection.jsx';
import { useState, useEffect } from 'react';//useState y useEffect: son hooks de React. useState se utiliza para agregar estado local a los componentes de función, y useEffect para ejecutar efectos secundarios en los componentes.
import { useForm } from 'react-hook-form';//react-hook-form: es una biblioteca de formularios para React.
import Swal from 'sweetalert2';//sweetalert2: es una biblioteca para mostrar pop-ups "hermosos, responsivos, personalizables y accesibles".
import { Carousel } from 'react-bootstrap';//react-bootstrap: es una biblioteca de componentes de interfaz de usuario para React.
import { Modal, Button } from 'react-bootstrap';//
import './App.css';//App.css: es un archivo CSS que contiene estilos para la aplicación.
import { motion } from 'framer-motion';//framer-motion: es una biblioteca de animaciones para React.
import { yupResolver } from '@hookform/resolvers/yup';//yup: es una biblioteca para validar datos.
import * as yup from 'yup';//yup: es una biblioteca para validar datos.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

//Inicio: es un componente de función que devuelve el contenido de la página de inicio.
function Inicio() { 
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center text-center py-5 pt-5 mt-5">
      <motion.div //motion.div: es un componente de Framer Motion que permite animar elementos HTML.
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

//Virtudes: es un componente de función que devuelve el contenido de las virtudes.
function Virtudes() { 
  return (
    //div: es un elemento HTML que se usa para agrupar otros elementos HTML.
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

//ReservarCita: es un componente de función que devuelve el contenido de la página de reservar cita.
function ReservarCita() {
  //object: es un método de yup que se usa para validar objetos.
  const schema = yup.object().shape({
    rut: yup //rut: es un campo del objeto que se está validando.
      .string() //string: es un método de yup que se usa para validar cadenas de texto.
      .required("Este campo es requerido") //required: es un método de yup que se usa para validar que el campo no esté vacío.
      .matches(/^\d{7,9}-[\dKk]$/, "El RUT debe tener el formato 12345678-9"), //matches: es un método de yup que se usa para validar que el campo cumpla con una expresión regular.
    nombre: yup
      .string()
      .required("Este campo es requerido"),
    apellido: yup
      .string()
      .required("Este campo es requerido"),
    email: yup
      .string()
      .email("Debe ser un email válido")
      .required("Este campo es requerido"),
      telefono: yup
      .string()
      .required("Este campo es requerido")
      .matches(/^[0-9]{9}$/, "El número de teléfono debe tener exactamente 9 dígitos"),    
    motivo: yup
      .string()
      .required("Este campo es requerido"),
    patente: yup
      .string()
      .required("Este campo es requerido"),
    modelo: yup
      .string()
      .required("Este campo es requerido"),
    detalles: yup
      .string()
      .required("Este campo es requerido"),
    terms: yup
      .boolean() //boolean: es un método de yup que se usa para validar que el campo sea un booleano.
      .oneOf([true], 'Debes aceptar los términos y condiciones') //oneOf: es un método de yup que se usa para validar que el campo tenga un valor específico.
  });
  //register, handleSubmit, reset, formState: { errors, isValid }, getValues: son métodos de react-hook-form que se usan para registrar campos, enviar el formulario, limpiar el formulario, obtener los errores de validación, verificar si el formulario es válido y obtener los valores de los campos.
  const { register, handleSubmit, reset, formState: { errors, isValid }, getValues } = useForm({ 
    //mode: es una propiedad de react-hook-form que se usa para especificar cuándo se debe verificar la validación de los campos.
    mode: 'onChange',
    //resolver: es una propiedad de react-hook-form que se usa para especificar el validador de datos.
    resolver: yupResolver(schema),
  });
  
  const [showModal, setShowModal] = useState(false); //useState: es un hook de React que se usa para agregar estado local a los componentes de función.
  const [showReviewModal, setShowReviewModal] = useState(false); //useState: es un hook de React que se usa para agregar estado local a los componentes de función.
  const [formData, setFormData] = useState(null); //useState: es un hook de React que se usa para agregar estado local a los componentes de función.
  const [currentItem, setCurrentItem] = useState(0); //useState: es un hook de React que se usa para agregar estado local a los componentes de función.

  const handleClose = () => setShowModal(false); //setShowModal: es una función que se usa para cambiar el valor de la variable showModal.
  const handleShow = () => setShowModal(true); //setShowModal: es una función que se usa para cambiar el valor de la variable showModal.

  //onSubmit: es una función que se usa para enviar el formulario.
  const onSubmit = async (data) => { 
    //isValid: es una variable que se usa para verificar si el formulario es válido.
    if (!isValid) { 
      Swal.fire( 
        'Formulario incompleto',
        'Por favor, completa todos los campos requeridos antes de enviar el formulario.',
        'warning'
      );
      return; //return: es una palabra clave que se usa para salir de la función.
    }
    //rut: es una variable que se usa para almacenar el valor del campo rut.
    const { rut } = data; 
  
    // Verificar si ya existe un documento con el mismo RUT
    const docRef = doc(db, 'citas', rut);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      // Si el documento existe, mostrar un SweetAlert al usuario
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El RUT ya está registrado con una cita solicitada',
      });
    } else {
      // Si el documento no existe, guardar el nuevo documento
      await setDoc(docRef, data);
      // manejar respuesta exitosa
      setFormData(data);
      handleShow();
    }
  };

  //handleCheckCita: es una función que se usa para revisar una cita.
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
      allowOutsideClick: () => !Swal.isLoading(),
      background: '#333',
      color: '#FFF',
      customClass: {
        title: 'my-title-class',
        content: 'my-content-class',
        confirmButton: 'my-confirm-button-class',
        cancelButton: 'my-cancel-button-class'
      }
    });

    //deleteCita: es una función que se usa para eliminar una cita.
    async function deleteCita(docId) {
      const citaRef = doc(db, 'citas', docId);
      await deleteDoc(citaRef);
      Swal.fire('Cita cancelada', 'La cita ha sido cancelada con éxito', 'success');
    }     
  
    if (rut) {
      const citaRef = collection(db, 'citas');
      const q = query(citaRef, where("rut", "==", rut));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        Swal.fire('No se encontró ninguna cita con ese RUT');
      } else {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          // Aquí puedes mostrar los datos de la cita al usuario
          Swal.fire({
            title: 'Detalles de la cita',
            html: `
              <div class="info-cita">
                <p><span class="info-cita-label">RUT:</span> <span class="info-cita-value">${doc.data().rut}</span></p>
                <p><span class="info-cita-label">Nombre:</span> <span class="info-cita-value">${doc.data().nombre}</span></p>
                <p><span class="info-cita-label">Apellido:</span> <span class="info-cita-value">${doc.data().apellido}</span></p>
                <p><span class="info-cita-label">Email:</span> <span class="info-cita-value">${doc.data().email}</span></p>
                <p><span class="info-cita-label">Teléfono:</span> <span class="info-cita-value">${doc.data().telefono}</span></p>
                <p><span class="info-cita-label">Motivo:</span> <span class="info-cita-value">${doc.data().motivo}</span></p>
                <p><span class="info-cita-label">Patente:</span> <span class="info-cita-value">${doc.data().patente}</span></p>
                <p><span class="info-cita-label">Modelo:</span> <span class="info-cita-value">${doc.data().modelo}</span></p>
                <p><span class="info-cita-label">Detalles:</span> <span class="info-cita-value">${doc.data().detalles}</span></p>
              </div>
            `,
            showCancelButton: true, // Agrega esta línea
            cancelButtonText: 'Cancelar cita', // Agrega esta línea
            confirmButtonText: 'Cerrar',
            customClass: {
              container: 'my-swal-container',
              popup: 'my-swal-popup',
              title: 'my-swal-title',
              content: 'my-swal-content',
              confirmButton: 'my-swal-confirm-button',
              cancelButton: 'my-swal-cancel-button' // Agrega esta línea
            }
          }).then((result) => {
            // Si el usuario hace clic en "Cancelar cita", eliminar la cita
            if (result.dismiss === Swal.DismissReason.cancel) {
              deleteCita(doc.id);
            }
          });
        });
      }
    }
    };
    
  const deleteCita = async (id) => {
    await deleteDoc(doc(db, 'citas', id));
    Swal.fire('Cita cancelada', 'Tu cita ha sido cancelada con éxito', 'success');
  };
    
  //handleConfirm: es una función que se usa para enviar el formulario.
  const handleConfirm = async () => {
    try {
      await addDoc(collection(db, 'citas'), formData);
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
  
  //handleCancel: es una función que se usa para cancelar el envío del formulario.
  const handleCancel = () => {
    setShowModal(false);
  };

  //handleLimpiar: es una función que se usa para limpiar los campos del formulario.
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

  //handleTermsAndConditions: es una función que se usa para mostrar los términos y condiciones.
  const handleTermsAndConditions = () => {
    Swal.fire({
      title: 'Términos y Condiciones',
      html: `
        <div class="terms-conditions">
          <p>Al enviar este formulario, usted acepta los siguientes términos y condiciones:</p>
          <ol>
            <li>El taller mecánico se reserva el derecho de rechazar cualquier cita por cualquier motivo.</li>
            <li>La cita solo se considera confirmada cuando reciba una confirmación por parte del taller mecánico.</li>
            <li>Debe llegar a tiempo para su cita. Si llega tarde, es posible que su cita deba ser reprogramada.</li>
            <li>Debe proporcionar toda la información requerida en el formulario de cita. Si proporciona información falsa o engañosa, su cita puede ser cancelada.</li>
            <li>El taller mecánico no se hace responsable de los objetos personales dejados en el vehículo. Por favor, retire todos los objetos personales antes de dejar su vehículo en el taller.</li>
            <li>El taller mecánico se reserva el derecho de cambiar estos términos y condiciones en cualquier momento sin previo aviso.</li>
          </ol>
          <p>Al hacer clic en "Enviar", usted confirma que ha leído y comprendido estos términos y condiciones y que acepta cumplir con ellos.</p>
        </div>
      `,
      confirmButtonText: 'Cerrar',
      customClass: {
        container: 'my-swal-container',
        popup: 'my-swal-popup',
        title: 'my-swal-title',
        content: 'my-swal-content',
        confirmButton: 'my-swal-confirm-button'
      }
    });
  };  
   
  //reasons: es una variable que se usa para almacenar las razones.
  const reasons = [
    {
      title: "Experiencia y profesionalismo",
      description: "Contamos con un equipo de mecánicos altamente capacitados y con años de experiencia en el campo. Nuestro personal está comprometido con la excelencia y siempre se esfuerza por proporcionar el mejor servicio posible."
    },
    {
      title: "Servicio personalizado",
      description: "Entendemos que cada vehículo y cada cliente son únicos. Por eso, ofrecemos un servicio personalizado para satisfacer tus necesidades específicas. Nos tomamos el tiempo para entender tus requerimientos y proporcionar soluciones que se ajusten a ellos."
    },
    {
      title: "Tecnología de punta",
      description: "Utilizamos la última tecnología y equipos para diagnosticar y reparar tu vehículo. Esto nos permite proporcionar un servicio eficiente y de alta calidad."
    },
    {
      title: " Precios competitivos",
      description: "Ofrecemos precios justos y competitivos. Nuestro objetivo es proporcionar un servicio de alta calidad a un precio que puedas permitirte."
    },
    {
      title: "Transparencia",
      description: "Creemos en la transparencia total. Te explicaremos claramente qué reparaciones son necesarias y por qué, y siempre te daremos un presupuesto antes de comenzar cualquier trabajo."
    },
    {
      title: "Comodidad",
      description: "Nuestro sistema de reservas en línea hace que sea fácil programar una cita en un momento que te convenga. Además, ofrecemos un servicio de recogida y entrega de vehículos para mayor comodidad."
    },
  ];

  //useEffect: es un hook de React que se usa para ejecutar efectos secundarios en los componentes.
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentItem((prevItem) => (prevItem + 1) % reasons.length);
    }, 10000); // Cambia cada 10 segundos
    return () => clearInterval(timer);
  }, [])

  return (
    <div className="d-flex align-items-center justify-content-center" style={{height: '100vh', marginTop: '50px'}}>
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
            <input {...register("rut", { required: true })} placeholder="RUT (Ej:12345678-9)" className="form-control" />
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
            <input {...register("telefono", { required: true, pattern: /^[0-9]*$/ })} placeholder="Teléfono (Ej:91234567)" className="form-control" />
          </div>
          {errors.telefono && <div className="text-danger">Este campo es requerido y solo debe contener nueve números</div>}
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
        <div className="mb-3">
          <input {...register("terms", { required: true })} type="checkbox" id="terms" className="me-2" />
          <label htmlFor="terms">Acepto los <a href="#" onClick={handleTermsAndConditions}>Términos y condiciones</a></label>
          {errors.terms && <div className="text-danger">Debes aceptar los términos y condiciones</div>}
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
          <div className="p-5" style={{color: 'gold', maxWidth: '600px', margin: '50px auto 0', padding: '0 20px'}}>
            <h2>¿Por qué reservar con nosotros?</h2>
            <h3>{reasons[currentItem].title}</h3>
            <p>{reasons[currentItem].description}</p>
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

///Servicios: es un componente de función que devuelve el contenido de la página de servicios.
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

//Contacto: es un componente de función que devuelve el contenido de la página de contacto.
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
              <p className="card-text">(+56) 985674532</p>
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
              <p className="card-text">123 Calle Principal, Los Ángeles, Bio - Bio, 453000</p>
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

//Navegacion: es un componente de función que devuelve el contenido de la barra de navegación.
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

//App: es un componente de función que devuelve el contenido de la aplicación.
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
