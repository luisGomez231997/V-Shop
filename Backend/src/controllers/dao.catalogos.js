import Catalogo from '../models/catalogo';
import Usuario from '../models/usuario';

// este es un metodo asincrono ya que toma tiempo para crearse, por ende, en funcion se le indica con "async" y en la constante con await, para esperar a su creacion antes de hacer el send
export async function crear(req, res) {
    const { ciudad, id_gerente, nombre_catalogo } = req.body;
    try {
        let newCatalogo = await Catalogo.create({
            ciudad,
            id_gerente,
            nombre_catalogo,
            estado: 1
        },{
            fields: ['ciudad', 'id_gerente', 'nombre_catalogo', 'estado']
        });
        return res.json({
            message: "catalogo creado con exito",            
        });
    } catch (e) {
        console.log(e);
        res.status(800).json({
            message: "Something goes wrong 800",
            error: true
        });
    }
}

export async function get(req, res) {
    try {
        const consulta = await Catalogo.findAll({
            //attributes: ['id_catalogo','ciudad', 'id_gerente', 'nombre_catalogo'] 
            where:{estado:1}       
        });
        return res.json(consulta);
    } catch (e) {
        console.log(e);
        res.status(801).json({
            message: 'Algo salio mal 801',
            error: true
        });
    }
}

export async function getByUserId(req, res) {
    const {id_usuario} = req.params
    try {
        const consulta = await Catalogo.findAll({
            //attributes: ['id_catalogo','ciudad', 'id_gerente', 'nombre_catalogo']
            include: [{
                model: Usuario,
                where: {id_usuario}
            }],
            where: {estado:1}
            
        });
        return res.json(consulta);
    } catch (e) {
        console.log(e);
        res.status(801).json({
            message: 'Algo salio mal 801',
            error: true
        });
    }
}

export async function getOn(req, res) {
    const { id_catalogo } = req.params;
    try {
        const oneCatalogo = await Catalogo.findOne({
            //attributes: ['id_catalogo','ciudad', 'id_gerente', 'nombre_catalogo'],
            where: {
                id_catalogo
            }
        });
        return res.json(oneCatalogo);
    } catch (e) {
        console.log(e);
        res.status(802).json({
            message: "Algo salio mal 802",
            data: {}
        });
    }
}

export async function deleteOn(req, res) {
    const { id_catalogo } = req.params;
    try {
        const numRowDelete = await Catalogo.update({
            estado: 0,
            id_gerente: 0,            
        },{
            where: {
                id_catalogo
            }
        });
        return res.json({message:"Se inhabilito el catalogo"});
    } catch (e) {
        console.log(e);
        res.status(703).json({
            message: "Algo salio mal 703",
            error: true
        });
    }
}

export async function updateOn(req, res) {
    const { id_catalogo } = req.params;
    try {
        const { ciudad, id_gerente, nombre_catalogo } = req.body;
        const catalogoU = await Catalogo.update({
            ciudad,
            id_gerente,
            nombre_catalogo
        },{
            where: {
                id_catalogo
            }
        });
        return res.json({
            message: "Catalogo actualizado con exito", 
        });
    } catch (e) {
        console.log(e);
        res.status(804).json({
            message: "Algo salio mal 804",
            error: true
        });
    }
}



/*
export async function getOnByProducto(req, res) {
    const { id_producto } = req.params;
    try {
        const comentarios = await Catalogo.findAll({
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
}*/