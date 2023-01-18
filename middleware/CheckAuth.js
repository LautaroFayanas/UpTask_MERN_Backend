import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js';

//Le paso next para que salte a la funcion de perfil... ejemplio de routes
const CheckAuth = async(req, res, next) =>{

    let token;

    if(req.headers.authorization && 
       req.headers.authorization.startsWith('Bearer') )
       {
        
        try {
            
            token = req.headers.authorization.split(' ')[1]
            
            //Verify es una funcion de JWT para verificar el token 
            const decoded = jwt.verify(token, process.env.JTW_SECRET)

            req.usuario = await Usuario.findById(decoded.id).select('-password -confirmado -token -createdAt -updatedAt -__v')

            return next();

        } catch (error) {
            return res.status(401).json({msg: 'Hubo un error'})
        }
        
    }

    if(!token){
        const error = new Error('Token no valido')
        return res.status(401).json({msg: error.message})
    }

    next()
}

export default CheckAuth