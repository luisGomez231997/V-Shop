import Comentario from '../models/comentario';
import Producto from '../models/producto'
import Usuario from '../models/usuario';

// este es un metodo asincrono ya que toma tiempo para crearse, por ende, en funcion se le indica con "async" y en la constante con await, para esperar a su creacion antes de hacer el send
export async function crear(req, res) {
    const currentDate = new Date().toISOString().split("T")
    const { comentario, calificacion, id_usuario, id_producto } = req.body;
    try {
        let nuevoComentario = await Comentario.create({
            comentario,
            calificacion,
            fecha: currentDate,
            id_producto,
            id_usuario
        },{
            fields: ['comentario', 'calificacion', 'fecha', 'id_producto','id_usuario']
        });
        return res.json({
            message: "comenrario creado con exito",            
        })
    } catch (e) {
        console.log(e);
        res.status(600).json({
            message: "Something goes wrong 600",
            error: true
        });
    }
}

export async function get(req, res) {
    try {
        const comentarios = await Comentario.findAll({
            attributes: ['id_comentario','comentario', 'calificacion', 'fecha', 'id_producto']
        });
        return res.json(comentarios);
    } catch (e) {
        console.log(e);
        res.status(601).json({
            message: 'Algo salio mal 601',
            data: {}
        });
    }
}

export async function getOn(req, res) {
    const { id_comentario } = req.params;
    try {
        const oneProducto = await Comentario.findOne({
            attributes: ['id_comentario','comentario', 'calificacion', 'fecha', 'id_producto'],
            where: {
                id_comentario
            }
        });
        return res.json(oneProducto);
    } catch (e) {
        console.log(e);
        res.status(202).json({
            message: "Algo salio mal 202",
            data: {}
        });
    }
}

export async function deleteOn(req, res) {
    const { id_comentario } = req.params;
    try {
        const numRowDelete = await Comentario.destroy({
            where: {
                id_comentario
            }
        });
        return res.json(numRowDelete);
    } catch (e) {
        console.log(e);
        res.status(603).json({
            message: "Algo salio mal 603",
            error : true
        });
    }
}

export async function updateOn(req, res) {
    const { id_comentario } = req.params;
    try {
        const { comentario, calificacion } = req.body;
        const comentarioU = await Comentario.update({
            comentario,
            calificacion,
        },{
            where: {
                id_comentario
            }
        });
        return res.json(comentarioU);
    } catch (e) {
        console.log(e);
        res.status(604).json({
            message: "Algo salio mal 604",
            error: true
        });
    }
}

export async function getOnByProducto(req, res) {
    const { id_producto } = req.params;
    try {
        const comentarios = await Comentario.findAll({
            attributes: ['id_comentario','comentario', 'calificacion', 'fecha', 'id_producto'],
            where: {
                id_producto
            }
        });
        return res.json(comentarios);
    } catch (e) {
        console.log(e);
        res.status(605).json({
            message: "Algo salio mal 605",
            data: {}
        });
    }
}

export async function getOnByUser(req, res) {
    const { id_usuario } = req.params;
    try {
        const comentarios = await Comentario.findAll({
            where: {
                id_usuario
            },
            include: [{
                model: Producto,
                attributes: ['nombre_producto']
            }]            
        });
        return res.json(comentarios);
    } catch (e) {
        console.log(e);
        res.status(605).json({
            message: "Algo salio mal 605",
            error: true
        });
    }
}