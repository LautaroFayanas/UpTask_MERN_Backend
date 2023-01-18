import jwt from 'jsonwebtoken';

// De esta forma genero el JWT

const generarJWT = (id) => {
    return jwt.sign({id} , process.env.JTW_SECRET , { 
        expiresIn: '30d',
    })       
}

export default generarJWT;