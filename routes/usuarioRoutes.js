import express from 'express';
import { registrar , autenticar , confirmar , olvidePassword , comprobarPassword , nuevoPassword , perfil } from '../controllers/usuarioController.js'
import CheckAuth from '../middleware/CheckAuth.js';

const router = express.Router();

// Autenticacion , registro y confirmacion de usuarios

router.post("/", registrar );                               //Crea un nuevo usuario
router.post("/login" , autenticar)
router.get('/confirmar/:token' , confirmar )
router.post('/olvide-password', olvidePassword)
router.get('/olvide-password/:token', comprobarPassword)
router.post('/olvide-password/:token', nuevoPassword)

//Entra al endpoint , ejecuta check auth y despues ejecuta perfil 
// La forma en que se va al siguiente middleware ( el paso de checkAuth a perfil ) es pasarle por parametros la funcion next. ej en checkAuth
router.get('/perfil' , CheckAuth , perfil)

export default router;
