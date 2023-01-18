import express from 'express';
import {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstadoTarea
} from '../controllers/tareaController.js';

import CheckAuth from '../middleware/CheckAuth.js';

const router = express.Router();

router.post('/' , CheckAuth , agregarTarea);

router
.route('/:id')
.get(CheckAuth, obtenerTarea)
.put(CheckAuth, actualizarTarea)
.delete(CheckAuth, eliminarTarea);

router.post('/estado/:id',CheckAuth , cambiarEstadoTarea);



export default router