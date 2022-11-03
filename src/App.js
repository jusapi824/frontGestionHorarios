import { useState, useEffect } from "react";
import Select from 'react-select';

export default function App() {
  const [instructores, setInstructores] = useState([]);
  const [cargar, setCargar] = useState(false);

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [profesion, setProfesion] = useState("");
  const [genero, setGenero] = useState("");
  const [areaOrientar, setAreaOrientar] = useState("");
  const [rol, setRol] = useState("");
  const baseUrl = "https://jsonplaceholder.typicode.com";

  const optionsSelect = [
      {value: 0, label: "Seleccionar Rol"},
      {value: 1, label: 'Coordinator'},
      {value: 2, label: 'Instructor'}
  ];

  // Obtener datos con fetch API
  useEffect(() => {
    const cargarInstructor = async () => {
      const response = await fetch(`${baseUrl}/instructores`);
      const data = await response.json();
      console.log(data);
      //setInstructores(data);
    };
    if (cargar) {
      cargarInstructor();
      setCargar(false);
    }

  }, [cargar]);
  

  // Borrar datos con fetch API
  const borrarInstructor = async (id) => {
    let response = await fetch(
      `${baseUrl}/instructores/${id}`,
      {
        method: "DELETE"
      }
    );
    if (response.status === 200) {
      setInstructores(
        instructores.filter((instructor) => {
          return instructor.id !== id;
        })
      );
    } else {
      return;
    }
  };

  // Publicar datos con fetch API
  const agregarInstructor = async (_nombre, _email, _telefono, _profesion, _genero, _areaOrientar, _rol) => {
    console.log(rol);
    let response = await fetch(`${baseUrl}/instructores`, {
      method: "POST",
      body: JSON.stringify({
        nombre: nombre,
        email: email,
        telefono: telefono,
        profesion: profesion,
        genero: genero,
        areaOrientar: areaOrientar,
        rol:_rol,
        //userId: Math.random().toString(36).slice(2)
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    let data = await response.json();
    setInstructores((instructores) => [data, ...instructores]);
    setNombre("");
    setEmail("");
    setTelefono("");
    setProfesion("");
    setGenero("");
    setAreaOrientar("");
  };

  // Controlador que maneja el envio del formulario
  const controladorDelEnvio = (e) => {
    e.preventDefault();
    agregarInstructor(nombre, email, telefono, profesion, genero, areaOrientar, rol);
  };

  return (
    <div>
        <nav className="navbar navbar-expand-sm menu-bar shadow">
            <div className="container-fluid">
                <a className="navbar-brand" href="https://google.com">
                    <img src="./img/calendar.png"
                        alt="Software Gestión Horarios" height="50"/>
                </a>
                <div className="navbar-collapse collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <a className="nav-link" href="https://google.com">Inicio</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" aria-current="page" href="https://google.com">Horarios</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="https://google.com">Usuarios</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="https://google.com">Fichas</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="https://google.com">Programas de Formación</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="https://google.com">Ambientes</a>
                    </li>
                  </ul>
                  <div className="d-flex">
                    <img src="./img/Logo-de-SENA-png-verde-300x300.png"
                    alt="SENA" height="50"></img>
                  </div>
                  
                </div>
            </div>
        </nav>
      <div className="container">
          <div className="row mt-4 text-center">
            <h1>Software de Gestión de Horarios SENA</h1>
          </div>
          <div className="row p-2 mt-3">
            <hr></hr>
          </div>
          <div className="row justify-content-center">
            <div className="card mt-3 p-3 w-50  ">
              <h2>Ingreso de Instructores</h2>
              <form onSubmit={controladorDelEnvio}>
                <input
                  className="form-control mt-3"
                  placeholder="Nombre Instructor"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                <input
                  className="form-control mt-3"
                  placeholder="Email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="form-control mt-3"
                  placeholder="Teléfono"
                  type="text"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
                <input
                  className="form-control mt-3"
                  placeholder="Profesión"
                  type="text"
                  value={profesion}
                  onChange={(e) => setProfesion(e.target.value)}
                />
                <input
                  className="form-control mt-3"
                  placeholder="Género"
                  type="text"
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                />
                <input
                  className="form-control mt-3"
                  placeholder="Area a Orientar"
                  type="text"
                  value={areaOrientar}
                  onChange={(e) => setAreaOrientar(e.target.value)}
                />

                <Select
                  className="form-control mt-3"
                  value={optionsSelect.value}
                  options={optionsSelect}
                  defaultValue={optionsSelect[0]}
                  onChange={(e) => setRol(e.value)}
                  //options= {{value: 1, label: 'Coordinator'}}//, value: 2, label: 'Instructor'}}
                  //defaultValue={{ label: "Seleccionar Rol", value: 0 }}
                />

                <button className="btn btn-success mt-3" type="submit">
                  Agregar Instructor
                </button>
              </form>
            </div>
          </div>
          <div className="mt-5 mb-5">

          <div className="card mt-3 p-3">
                  <h2 className="card-title">Julian Salazar</h2>
                  <p className="card-text">julian@gmail.com</p>
                  <div className="d-grid d-sm-flex justify-content-sm-end">
                    <button
                      type="button"
                      className="btn btn-outline-danger" >
                      Borrar Instructor
                    </button>
                  </div>
                </div>


            {instructores.map((instructor) => {
              return (
                <div className="card mt-3 p-3" key={instructor.id}>
                  <h2 className="card-title">{instructor.nombre}</h2>
                  <p className="card-text">{instructor.email}</p>
                  <div className="d-grid d-sm-flex justify-content-sm-end">
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => borrarInstructor(instructor.id)}
                    >
                      Borrar Instructor
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
      </div>
    </div>
  );
}