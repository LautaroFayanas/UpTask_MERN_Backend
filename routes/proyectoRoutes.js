import express from 'express';
import {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyectos,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
 } from '../controllers/proyectoController.js';

 import CheckAuth from '../middleware/CheckAuth.js';

 const router = express.Router();

 router
 .route('/')
 .get(CheckAuth, obtenerProyectos)
 .post(CheckAuth, nuevoProyecto)

 router
 .route('/:id')
 .get(CheckAuth,obtenerProyecto)
 .put(CheckAuth, editarProyectos)
 .delete(CheckAuth,eliminarProyecto)

 router.post('/agregar-colaboradores/:id', CheckAuth, agregarColaborador)
 router.post('/eliminar-colaboradores/:id', CheckAuth, eliminarColaborador)


 export default router;
