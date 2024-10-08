import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import './RouteSearch.css'; // Asegúrate de que esté el CSS

const RouteSearch = () => {
    const [routes, setRoutes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRoutes, setFilteredRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRoute, setSelectedRoute] = useState(null);

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const response = await fetch('/api/routes');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setRoutes(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRoutes();
    }, []);

    useEffect(() => {
        const filtered = searchTerm
            ? routes.filter(route =>
                route.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
                route.path.toLowerCase().includes(searchTerm.toLowerCase())
            )
            : routes;
        setFilteredRoutes(filtered);
    }, [searchTerm, routes]);

    if (loading) return <div className="loading">Cargando...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="container">
            <h1>Búsqueda de Rutas</h1>
            <div className="search-bar-wrapper">
                <input
                    type="text"
                    placeholder="Buscar ruta..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
            </div>

            <div className="content">
                <div className="route-list">
                    {filteredRoutes.length ? (
                        <ul>
                            {filteredRoutes.map((route, index) => (
                                <li key={index} onClick={() => setSelectedRoute(route)}>
                                    <strong>{route.route}</strong>: {route.path}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div>No se encontraron rutas.</div>
                    )}
                </div>

                <div className="map-container">
                    <LoadScript googleMapsApiKey="http://localhost:3000/api/routes">
                        <GoogleMap
                            mapContainerStyle={{ width: '100%', height: '100%' }}  // Asegúrate de que el mapa ocupe todo el espacio
                            center={selectedRoute ? selectedRoute.positions[0] : { lat: 13.7107, lng: -89.2038 }}
                            zoom={13}
                            options={{
                                fullscreenControl: false,
                                mapTypeControl: false,
                                streetViewControl: false
                            }}
                        >
                            {selectedRoute && (
                                <>
                                    <Polyline
                                        path={selectedRoute.positions}
                                        options={{ strokeColor: '#FF0000', strokeOpacity: 0.8, strokeWeight: 2 }}
                                    />
                                    <Marker position={selectedRoute.positions[0]} />
                                </>
                            )}
                        </GoogleMap>


                    </LoadScript>
                </div>
            </div>
        </div>
    );
};

export default RouteSearch;
