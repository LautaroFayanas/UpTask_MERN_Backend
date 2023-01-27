import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import usuarioRouter from './routes/usuarioRoutes.js'
import proyectoRoutes from './routes/proyectoRoutes.js'
import tareaRoutes from './routes/tareaRoutes.js'
import cors from 'cors'


const app = express();
app.use(express.json());

dotenv.config()

conectarDB()

//configurar CORS
const whiteList = ["http://127.0.0.1:5173"]
const corsOptions = {
    origin: function(origin, callback){
        console.log(origin);    
        if(whiteList.includes(origin)){
            //Puede consultar la api
            callback(null,true)
        }else{
            //No esta permitido
            callback(new Error('Error de Cors'))
        }
    }
}
app.use(cors(corsOptions))
// Routing
app.use('/api/usuarios' , usuarioRouter )
app.use('/api/proyectos' , proyectoRoutes )
app.use('/api/tareas' , tareaRoutes )

const PORT = process.env.PORT || 4000 ;

app.listen(PORT , () => {
    console.log(`Servidor corriendo en el puerto  ${PORT}`);
})
