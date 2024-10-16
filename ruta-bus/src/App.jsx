// src/App.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import RouteSearch from './components/RouteSeacrh/RouteSearch';
import Navbar from './components/Header/Header';
import './App.css';

const App = () => {
    return (
        <div>
            <div className="contenedor-1">
            <Navbar className="nav"></Navbar>
            </div>

            <div className="contenedor-3">
                <RouteSearch />
            </div>
        </div>
    );
};

export default App;
