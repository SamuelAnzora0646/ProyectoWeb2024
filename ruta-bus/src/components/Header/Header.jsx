import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Header.css'; // Importar el archivo CSS

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false); // Estado para controlar el menú
  const [busquedaAbierta, setBusquedaAbierta] = useState(false); // Estado para mostrar/ocultar el input de búsqueda
  const [consultaBusqueda, setConsultaBusqueda] = useState(''); // Estado para guardar el valor de búsqueda

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto); // Cambiar el estado del menú
  };

  const handleBusquedaClick = () => {
    setBusquedaAbierta(true); // Mostrar el input de búsqueda
  };

  const handleBusquedaChange = (e) => {
    setConsultaBusqueda(e.target.value); // Guardar el valor del input
  };

  const handleBusquedaSubmit = (e) => {
    e.preventDefault(); // Evitar que el formulario recargue la página
    if (consultaBusqueda.trim()) {
      // Aquí puedes agregar tu lógica de búsqueda
      // Por ejemplo: filtrar elementos en tu página, redirigir, etc.
      setConsultaBusqueda(''); // Limpiar el input de búsqueda
    }
    setBusquedaAbierta(false); // Ocultar el input de búsqueda después de la búsqueda
  };

  const handleMouseLeave = () => {
    if (consultaBusqueda === '') {
      setBusquedaAbierta(false); // Ocultar el input si no hay texto
    }
  };

  return (
    <header className={`header ${menuAbierto ? 'header-2' : ''}`}>
      <a href="/" className="logo">
        <span>logo</span>
      </a>
      <nav className="navbar">
        <a href="/">Inicio</a>
        <a href="/">Detalles</a>
        <a href="/">Acerca de</a>
        <a href="/">Opiniones</a>
        <a href="/">Precios</a>
        <a href="/">Contacto</a>
        {/* Icono de búsqueda que al presionar muestra el input */}
        {!busquedaAbierta && (
          <a href="#" onClick={handleBusquedaClick}>
            <FontAwesomeIcon icon={faSearch} />
          </a>
        )}
        {/* Si busquedaAbierta es true, mostramos el input de búsqueda */}
        {busquedaAbierta && (
          <form onSubmit={handleBusquedaSubmit} className="search-form" onMouseLeave={handleMouseLeave}>
            <input
              type="text"
              value={consultaBusqueda}
              onChange={handleBusquedaChange}
              placeholder="Buscar..."
              className="search-input"
            />
            <button type="submit" className="search-button">Buscar</button>
          </form>
        )}
      </nav>
      <div className="bars-menu" id="menu" onClick={toggleMenu}>
        <span className="line1"></span>
        <span className="line2"></span>
        <span className="line3"></span>
      </div>
    </header>
  );
};

export default Header;
