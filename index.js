import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import usuarioRouter from './routes/usuarioRoutes.js'
import proyectoRoutes from './routes/proyectoRoutes.js'
import tareaRoutes from './routes/tareaRoutes.js'


const app = express();
app.use(express.json());

dotenv.config()

conectarDB()

// Routing
app.use('/api/usuarios' , usuarioRouter )
app.use('/api/proyectos' , proyectoRoutes )
app.use('/api/tareas' , tareaRoutes )

const PORT = process.env.PORT || 4000 ;

app.listen(PORT , () => {
    console.log(`Servidor corriendo en el puerto  ${PORT}`);
})
