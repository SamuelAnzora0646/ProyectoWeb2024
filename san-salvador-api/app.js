const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Datos de rutas y recorridos
const routes = [
    { route: 'A SS Bus', path: 'Colonia 10 de Octubre - San Marcos - 15 Calle Poniente y viceversa' },
    { route: 'B SS Bus', path: 'Calle San Sebastián y 5 Avenida Sur - Ciudad Delgado - Metrocentro - UES y viceversa' },
    { route: '1 SS Bus', path: 'San Pedro - Ayutuxtepeque - Zacamil - Centro - Colonia América y viceversa' },
    { route: '2-A SS Micro', path: 'Colonia Los Conacastes (Mnos) - Alameda Juan Pablo II y Diagonal Universitaria (San Salvador) y viceversa' },
    { route: '2-B 2 SS Bus', path: 'Mejicanos - San Jacinto - Colonia Costa Rica y viceversa' },
    { route: '2-B 1 SS Bus', path: 'Mejicanos - Modelo - Colonia Costa Rica y viceversa' },
    { route: '2-C SS Bus', path: 'Mejicanos - Metrocentro - Centro - Reloj de Flores y viceversa' },
    { route: '2-A 1 SS Bus', path: 'Colonia Buena Vista (Mejicanos) - 3ª Calle Oriente - 2ª Avenida Norte (San Salvador) y viceversa' },
    { route: '2-A 2 SS Bus', path: 'Colonia Buena Vista (Mejicanos) - 3ª Calle Poniente - 2ª Avenida Norte (San Salvador) y viceversa' },
    { route: '3 SS Micro', path: 'Colonia Sierra Morena (Soyapango) - 1ª Calle Poniente - 23ª Avenida Norte (San Salvador) y viceversa' },
    { route: '3-A SS Bus', path: 'Colonia Sierra Morena - Colonia Las Brisas - Soyapango - Centro - Colonia Atlacatl (San Salvador).' },
    { route: '3 SS Bus', path: 'Colonia Sierra Morena - Soyapango - Centro - Colonia Atlacatl y viceversa' },
    { route: '4 SS Micro', path: 'Colonia Las Colinas (Ciudad Delgado) - Terminal de Occidente (San Salvador) y viceversa' },
    { route: '4-T SS Micro', path: 'Colonia Guardado (Ciudad Delgado) - Terminal de Occidente (San Salvador) y viceversa' },
    { route: '4-A SS Micro', path: 'Colonia Santa Alegría (Ciudad Delgado) - 25 Avenida Norte (San Salvador) y viceversa' },
    { route: '4 SS Bus', path: 'Ciudad Delgado - Centro - Hospital - Terminal de Occidente y viceversa' },
    { route: '5 1 SS Micro', path: 'Colonia Montecristo - 8ª Avenida Sur A Nivel de Parqueo de Iglesia El Rosario Acceso Oriente (San Salvador) y viceversa' },
    { route: '5 SS Micro', path: 'Colonia La Cima - 8 Avenida Sur A Nivel Del Parqueo de La Iglesia Del Rosario Acceso Oriente (San Salvador) y viceversa' },
    { route: '5 SS Bus', path: 'Urbanización La Cima I, II, III, IV - Terminal de Oriente (San Salvador) y viceversa' },
    { route: '6-V H0 SS Micro', path: 'Colonia Vista Hermosa (Cuscatancingo) - Alda Juan Pablo II y Diagonal Universitaria (San Salvador) y viceversa' },
    { route: '6-C F0 SS Micro', path: 'Ciudad Futura (Cuscatancingo) - Alda Juan Pablo II y Diagonal Universitaria (San Salvador) y viceversa' },
    { route: '6-A SS Micro', path: 'Monte Carmelo (Cuscatancingo) - Parque Candelaria (San Salvador) - Lirios Del Norte (Cuscatancingo) - Parque Candelaria (San Salvador) y viceversa' },
    { route: '6 2 SS Bus', path: 'Vía Mariona - Mejicanos - Parque Infantil y viceversa' },
    { route: '6 3 SS Bus', path: 'Vía Mariona - Mejicanos - Parque Infantil y viceversa' },
    { route: '6 1 SS Bus', path: 'Vía Mariona (Cuscatancingo) - Mejicanos - Avenida España - 9ª Calle Oriente (San Salvador) y viceversa' },
    { route: '7-A SS Micro', path: 'Reparto Los Santos III (Soyapango) - 33ª Avenida Norte - Alameda Juan Pablo II (San Salvador) y viceversa' },
    { route: '7-D SS Bus', path: 'Colonia Los Conacastes - Centro - Metrocentro - Galerías Escalón y viceversa' },
    { route: '7 SS Bus', path: 'Colonia Guadalupe (Soyapango) - Plaza Las Américas - Galerías y viceversa' },
    { route: '7-C SS Bus', path: 'Bosques de Prusia - Los Santos 1 - Terminal de Occidente y viceversa' },
    { route: '8-A SS Bus', path: 'Colonia Jardines (San Marcos) - Colonia Roma (San Salvador) y viceversa' },
    { route: '8 SS Bus', path: 'Colonia Dolores - Terminal de Oriente - Colonia La Chacra y viceversa' },
    { route: '9 SS Micro', path: 'Colonia Santísima Trinidad (Ayutuxtepeque) - 11ª Avenida Sur - 4ª Calle Pte (San Salvador) y viceversa' },
    { route: '9-A SS Micro', path: 'Calle Credisa - Amatepec (Soyapango) - 13ª Avenida Norte - 3ª Calle Oriente (San Salvador) y viceversa' },
    { route: '9 SS Bus', path: 'Ciudad Credisa - Amatepec - Zacamil - Santísima Trinidad y viceversa' },
    { route: '10 SS Bus', path: 'Urbanización Colinas Del Norte - Centro - Colonia Vista Hermosa - Monserrat y viceversa' },
    { route: '11 SS Micro', path: 'Colonia 10 de Octubre (San Marcos) - 33 Avenida Norte y Bulevar Tutunichapa y viceversa' },
    { route: '11-K SS Micro', path: 'Colonia La Paz (Cuscatancingo) - 39A Avenida Sur (San Salvador) y viceversa' },
    { route: '11-C SS Micro', path: 'Colonia Escalante (San Marcos) - Metrocentro - Avenida Los Andes (San Salvador) y viceversa' },
    { route: '11-B SS Micro', path: 'Colonia 10 Octubre Km 12.5 Autopista Comalapa (San Marcos) - Alameda Juan Pablo II y viceversa' },
    { route: '11 SS Bus', path: 'Colonia Gálvez - Santa Fe - San Marcos - Hospitales - Res. San Luis y viceversa' },
    { route: '12 3 SS Micro', path: '6 Calle Poniente (San Salvador) - Cantón El Guayabo (San Salvador) y viceversa' },
    { route: '12 2 SS Micro', path: '6 Calle Poniente (San Salvador) - Cantón Los Palones (Panchimalco) y viceversa' },
    { route: '12 1 SS Micro', path: '6 Calle Poniente (San Salvador) - Mil Cumbres (Panchimalco) y viceversa' },
    { route: '12 SS Micro', path: '6 Calle Poniente (San Salvador) - Planes de Renderos (San Salvador) y viceversa' },
    { route: '12 SS Bus', path: 'Caserío Mil Cumbres - Planes de Renderos - Mercado Central y viceversa' },
    { route: '13 SS Bus', path: 'Colonia Santa Lucia - Soyapango - Parque Infantil y viceversa' },
    { route: '14 SS Bus', path: 'San Martín - Soyapango - Alcaldía de San Salvador y viceversa' },
    { route: '14-A SS Bus', path: 'Pto. Sta. Teresa - San Martín - 12 Avenida Sur - 2 Calle Oriente y Avenida Cervantes (San Salvador) y viceversa' },
    { route: '15 SS Bus', path: 'Turicentro Apulo - Ilopango - Ave. España y 9A Calle Oriente - San Salvador y viceversa' },
    { route: '16 SS Micro', path: 'Urbanización Melara San Antonio Abad (S. S) - 3A Calle Poniente y 9A Avenida Norte (San Salvador) y viceversa' },
    { route: '16 SS Bus', path: 'San Antonio Abad - Plaza Las Américas - 9 Avenida Norte - Juan Pablo II y viceversa' },
    { route: '17 SS Micro', path: 'Rosario de Mora - 8A Calle Oriente (San Salvador) y viceversa' },
    { route: '17-B SS Micro', path: 'Panchimalco - Planes de Renderos - San Salvador y viceversa' },
    { route: '17-A 1 SS Micro', path: 'Cantón Los Troncones - Panchimalco y viceversa' },
    { route: '17-A SS Micro', path: 'Cantón Azacualpa - Panchimalco y viceversa' },
    { route: '17-B 1 SS Bus', path: 'Cantón La Barrosa - Rosario de Mora - Mercado Central (San Salvador)' },
    { route: '18 SS Bus', path: 'Cantón Lomas de Candelaria - Calle Antigua A Huizúcar - Bulevar Los Próceres - Mdo. Central y viceversa' },
    { route: '19 SS Micro', path: 'Colonia El Charcón - Ciudad Delgado - Alameda Juan Pablo II y Diagonal Universitaria y viceversa' },
    { route: '19 SS Bus', path: 'Cantón San José Cortez - Cantón Plan Del Pino - Soyapango y viceversa' },
    { route: '20 SS Micro', path: 'Colonia Santa Rosa (Cuscatancingo) - 5º Avenida Norte (San Salvador) y viceversa' },
    { route: '20 SS Bus', path: 'Cuscatancingo - 20 Avenida Norte - Avenida España - Parque Infantil y viceversa' },
    { route: '21 SS Micro', path: 'Santiago Texacuangos - Santo Tomás - 8 Calle Oriente Vía Autopista y viceversa' },
    { route: '21-A SS Bus', path: 'Sgo. Texacuangos - Calle A San Marcos - 4 Calle Oriente - Avenida Cuscatlán y viceversa' },
    { route: '21-B SS Bus', path: 'Santiago Texacuango - Mercado Central (San Salvador) - Vía Autopista y viceversa' },
    { route: '22 SS Bus', path: 'Reparto Santa Clara - Juzgado de Instrucción y viceversa' }
];


// Middleware para habilitar CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// Ruta para la raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de rutas de buses. Usa /api/routes para obtener las rutas.');
});

// Ruta para obtener todas las rutas
app.get('/api/routes', (req, res) => {
    res.json(routes);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});







