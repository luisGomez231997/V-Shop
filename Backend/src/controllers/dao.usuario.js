import Usuario from '../models/usuario';
import Factura from '../models/factura';
import Detalle_factura from '../models/detalle_factura';
import Producto from '../models/producto';
import Comentario from '../models/comentario';
import Catalogo from '../models/catalogo';

//create user
export async function createUsuario(req, res) {
    const {
        //id_usuario, no se incluye el id_usuario, ya que es un autoincrement
        tipo_documento,
        numero_documento,
        nombres,
        apellidos,
        telefono,
        direccion,
        fecha_de_nacimiento,
        correo,
        estado,
        clave,
        nick,
        tipo_usuario
    } = req.body;
    try {
        const usuario = await Usuario.create({
            tipo_documento,
            numero_documento,
            nombres,
            apellidos,
            telefono,
            direccion,
            fecha_de_nacimiento,
            correo,
            estado,
            clave,
            nick,
            tipo_usuario
        }, {
                fields: ['tipo_documento', 'numero_documento', 
                'nombres', 'apellidos', 'telefono', 'direccion', 
                'fecha_de_nacimiento', 'correo', 'estado', 'clave', 
                'nick', 'tipo_usuario']
            });
        return res.json({
            message: "Usuario creado con exito",
            data: usuario
        });
    } catch (e) {
        console.log(e);
        res.status(502).json({
            message: "Algo salio mal 500",
            error: true
        });
    }
}

//get all users customers
export async function listUserClient(req, res) {
    const usuario = await Usuario.findAll({
        //attributes: ['id_usuario', 'tipo_documento', 'numero_documento', 'nombres', 'apellidos', 'telefono', 'direccion', 'fecha_de_nacimiento', 'correo', 'estado', 'clave', 'nick', 'tipo_usuario'],
        where:{
            tipo_usuario: "Cliente"
        }
        
    });
    res.send(usuario)
}

//get all users managers
export async function listUserManager(req, res) {
    try {
        const usuario = await Usuario.findAll({
            //attributes: ['id_usuario', 'tipo_documento', 'numero_documento', 'nombres', 'apellidos', 'telefono', 'direccion', 'fecha_de_nacimiento', 'correo', 'estado', 'clave', 'nick', 'tipo_usuario'],
            include: [{
                model: Catalogo
            }],
            where:{
                tipo_usuario: "Gerente"
            }            
        });
        res.send(usuario)
    }catch(e){
        res.json({
            message: "Error al cargar gerentes",
            error:true
        })
    }
}

//get all users managers
export async function deactivateUser(req, res) {
    try {
        const { id_usuario, estado } = req.body;
        const updateUsuario = await Usuario.update(
            { estado }, 
            { where: { id_usuario }}         
        );
        res.send(updateUsuario)
    }catch(e){
        res.json({
            message: "Error al cambiar el estado",
            error:true
        })
    }
}

//get on user
export async function getOneUsuario(req, res) {
    const { id_usuario } = req.params;
    try {
        const usuario = await Usuario.findOne({
            attributes: ['tipo_documento',
                'numero_documento',
                'nombres',
                'apellidos',
                'telefono',
                'direccion',
                'fecha_de_nacimiento',
                'correo',
                'nick'
            ],
            where: {
                id_usuario
            }
        });
        return res.json(usuario);
    } catch (e) {
        console.log(e);
        res.status(502).json({
            message: "Algo salio mal 503",
            error:true
        });
    }
}

//update user
export async function updateUsuario(req, res) {
    const { id_usuario } = req.params;
    try {
        const {
            tipo_documento,
            numero_documento,
            nombres,
            apellidos,
            telefono,
            direccion,
            correo,
            clave
        } = req.body;
    
        //creamos una exp regular para validar el formato de correo.
        var cadena_correo = "^[a-z]+@[a-z]+\.[a-z]{2,4}$"; 
        var exp_reg_correo = new RegExp(cadena_correo);
       
        //creamos una exp regular para validar el formato de texto.
        var cadena_text = "[A-Za-z ñ]+"; 
        var exp_reg_text = new RegExp(cadena_text);
      
        if ((numero_documento.length <= 10)&&(numero_documento.length > 5)&&
            (telefono.length < 11)&&(telefono.length > 6))
            { if (correo.match(exp_reg_correo)){
                  if ((nombres.match(exp_reg_text))&&
                      (apellidos.match(exp_reg_text))
                     ){
                    if (direccion){
                        if (clave){
                            const updateUsuario = await Usuario.update({
                                tipo_documento,
                                numero_documento,
                                nombres,
                                apellidos,
                                telefono,
                                direccion,
                                correo,
                                clave
                            }, {
                                    where: { id_usuario }
                                });
                            if (updateUsuario) {
                                res.json({succes: true, message: "Se actualizaron su datos"});
                            }else {
                                res.json({message: 'El usuario no se pudo actualizar Correctamente.'});
                            }
                        }else {res.json({message: 'El usuario no se pudo actualizar Correctamente, el formato de la clave no es valido'});}
                    }else {res.json({message: 'El usuario no se pudo actualizar Correctamente, el formato de la direccion no es valido'});}
                  }else {res.json({message: 'El usuario no se pudo actualizar Correctamente, los nombres y los apillidos no deben contener números ni caracteres especiales'});} 
              }else {res.json({message: 'El usuario no se pudo actualizar Correctamente, el formato del correo no es valido'});}
            }else {
                res.json({message: 'El usuario no se pudo actualizar Correctamente, el telefono y el documento id deben ser números de 10 digitos'});
            }
            
                    
    } catch (e) {
        console.log(e);
        res.status(502).json({
            message: "Algo salio mal 504",
            error: true
        });
    }
}


//delete user: set estate to false
export async function deleteUsuario(req, res) {
    const { id_usuario } = req.params;
    try {
        const estado = "0";
        const updateUsuario = await Usuario.update({
            estado
        }, {
                where: { id_usuario: id_usuario }
            });
        if (updateUsuario) {
            res.json(updateUsuario);
        }
    } catch (e) {
        console.log(e);
        res.status(502).json({
            message: "Algo salio mal 504",
            data: {}
        });
    }
}

//Esta funcion obtiene admin segun clave y nick
export async function logUsuario(req, res) {
    const { nick, clave, tipo_usuario } = req.body;
    console.log(nick, " ", clave)
    try {
        const usuario = await Usuario.findOne({
            attributes: ['id_usuario', 'nick', 'clave'],
            where: {
                nick: nick,
                tipo_usuario,
                estado: 1
                }
        });
        if (usuario) {
            if (usuario.clave == clave){
                return res.json({
                    find: true,
                    pass: true,
                    nick: usuario.nick,
                    id_usuario: usuario.id_usuario
                });   
            }else {
               return res.json({
                   find: true,
                   pass: false,
                   message: 'la contraseña es incorrecta'
               });
            }            
        } else {
            return res.json({ 
                find: false,
                message: 'Usuario no registrado' 
            });
        }
    } catch (e) {
        console.log(e);
        res.json({
            find: false,
            message: 'Error, por favor intentelo mas tarde'
        });
    }
}

export async function checkNick(req, res) {
    const { nick } = req.params;
    try {
        const usuario = await Usuario.findOne({
            where: {
                nick
            }
        });
        if (usuario) {
            return res.send(true);
        } else {
            return res.json(false);
        }
    } catch (e) {
        console.log(e);
        res.json({
            message: "Error 506",
            data: {}
        });
    }
}

export async function getJoinFacturas(req, res) {
    const { id_usuario } = req.params;
    try {
        const usuario = await Usuario.findOne({
            attributes: ['tipo_documento',
                'numero_documento',
                'nombres',
                'apellidos',
                'telefono',
                'direccion',
                'fecha_de_nacimiento',
                'correo',
                'nick'
            ],
            include: [{
                model: Factura,
                attributes: ['id_factura', 'fecha', 'total'],
                include: [{
                    model: Detalle_factura,
                    attributes: ['num_detalle', 'cantidad_comprada', 'descuento', 'precio_actual'],
                    include: [{
                        model: Producto,
                        attributes: ['id_producto', 'nombre_producto']
                    },{
                        model: Catalogo,
                        attributes: ['ciudad']
                    }]
                }]
            }],
            where: {
                id_usuario
            }
        });
        return res.json({
            data: usuario
        });
    } catch (e) {
        console.log(e);
        res.status(502).json({
            message: "Algo salio mal 503",
            error: true
        });
    }
}

export async function getJoinComentario(req, res){
    const {id_usuario} = req.params;
    try{
        const user = await Usuario.findAll({
            where: {id_usuario},
            include: [{
                model:  Comentario,
            }]
        });
        return res.json(user);
    }catch(e){
        console.log(e);
        res.status(408).json({
            message: "error 402 no funca",
            data: {}
        });
    }
}

/*Retorna todos los usuarios con sus catalogos */
export async function getJoinUsersAvalaibles(req, res){
    try{
        const usuario = await Usuario.findAll({
            attributes: ['id_usuario',
                'tipo_documento',
                'numero_documento',
                'nombres',
                'apellidos',
                'telefono',
                'direccion',
                'fecha_de_nacimiento',
                'correo',
                'nick'
            ],  include: [{
                model: Catalogo,
                attributes: ['id_catalogo', 'ciudad', 'nombre_catalogo'] 
            }],
            where: {
                estado: 1,
                tipo_usuario: 'Gerente'
            }
        });
        //fragmento de codigo para elimanar los que tienen catalogo.
        /*
        var nulls = 1;
        for (var i in usuario) {
            if (usuario[i].catalogo !== null){
                nulls++;//a medida que borra uno la cuenta para eliminarl los nulls 
                delete usuario[i];
                usuario.splice(i,nulls);
            }
        }
        */
        const availables = usuario.filter(usuario => usuario.catalogo === null)
        return res.json(availables);
    }catch(e){
        console.log(e);
        res.status(408).json({
            message: "error 408 no funca",
            error: true
        });
    }
}


/*Retorna todos manager y sus catalogos */
export async function getJoinManagerCatalog(req, res){
    try{
        const usuario = await Usuario.findAll({
            attributes: ['id_usuario',
                'numero_documento',
                'nombres',
                'apellidos',
            ],  include: [{
                model: Catalogo,
                required: true,
                attributes: ['id_catalogo', 'ciudad', 'nombre_catalogo'],
            }],
            where: {
                estado: 1,
                tipo_usuario: 'Gerente'
            }
        });
    
        return res.json(usuario);
    }catch(e){
        console.log(e);
        res.status(408).json({
            message: "error 408 no funca",
            error: true        
        });
    }
}
