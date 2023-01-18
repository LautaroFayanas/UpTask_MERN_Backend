import Usuario from '../models/Usuario.js';
import generarId from '../helpers/generarId.js';
import generarJWT from '../helpers/generarJWT.js';


const registrar = async(req , res) => {

    //Evitar registros duplicados
    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({ email })   //Quiero que busque el email

    if(existeUsuario){
        const error = new Error('Usuario ya registrado')
        return res.status(400).json({msg: error.message })
    }
     
    try {
        const usuario = new Usuario(req.body);
        usuario.token = generarId();
        const usuarioAlmacenado = await usuario.save();
        
        res.json(usuarioAlmacenado);
    } catch (error) {
        console.log(error);
    }

}

const autenticar = async(req , res) => {

    const { email , password } = req.body;

    // Comprobar si el usuario existe
    const usuario = await Usuario.findOne({email})
    if(!usuario){
        const error = new Error('Usuario no existente');
        return res.status(400).json({msg: error.message})
    }

    // Comprobar si el usuario esta confirmado
    if(!usuario.confirmado){
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(403).json({msg: error.message})
    }

    // Comprobar su password
    if(await usuario.comprobarPassword(password)){
            res.json({
                _id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                token: generarJWT(usuario._id)
            })
    }else {
        const error = new Error('El password es incorrecto');
        return res.status(403).json({msg: error.message })
    }
}

const confirmar = async(req, res) => {
    const {token} = req.params;
    const usuarioAConfirmar = await Usuario.findOne({token})
    if(!usuarioAConfirmar){
        const error = new Error('Token no valido');
        return res.status(400).json({msg: error.message})
    }

    try {
        usuarioAConfirmar.confirmado = true;
        usuarioAConfirmar.token = '';           //Elimino el token porque es de un solo uso
        await usuarioAConfirmar.save();
        res.json({msg: 'Usuario confirmado correctamente'})
    } catch (error) {
        console.log(error);
    }
}

const olvidePassword = async(req , res ) => {
    const { email } = req.body;

    const usuario = await Usuario.findOne({email})
    if(!usuario){
        const error = new Error('Usuario no existente');
        return res.status(400).json({msg: error.message})
    }

    try {
        usuario.token = generarId()
        await usuario.save();
        res.json({msg: 'Enviamos un email con las instrucciones'})
    } catch (error) {
        console.log(error);
    }
}

const comprobarPassword = async(req , res ) =>{
    const { token } = req.params;

    const tokenValido = await Usuario.findOne({ token });
    if(tokenValido){
        res.json({msg: 'Token valido y el usuario existe'})
    }else{
        const error = new Error('Token no Valido');
        return res.status(400).json({msg: error.message})
    }
}

const nuevoPassword = async(req , res ) => {
    const { token } = req.params;
    const { password } = req.body;

    const usuario = await Usuario.findOne({ token });
    if(usuario){
        usuario.password = password;
        usuario.token = '';
        
        try {
            await usuario.save()
            res.json({msg: 'Password modificado correctamente'})
        } catch (error) {
            console.log(error);
        }

    }else{
        const error = new Error('Token no Valido');
        return res.status(400).json({msg: error.message})
    }
}

const perfil = async(req , res) => {
    const { usuario } = req

    res.json(usuario)
}

export {
    registrar,
    autenticar,
    confirmar,
    olvidePassword,
    comprobarPassword,
    nuevoPassword,
    perfil
}