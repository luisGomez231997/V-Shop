import Imagenes from '../models/imagen';
import fs from 'fs'

const deleteImagOnDisk = (imagenes) => {
    for (var i=0;i<imagenes.length;i++){
        var fileName = imagenes[i].ruta
        console.log(imagenes[i].ruta)
        fs.unlink("public/" + fileName, (err) => {
            if (err) null
        })
    }
    
}

export async function addImagen(req, res) {
    const { id_producto } = req.params;
    let mensaje = []
    for(var i = 0; i<req.files.length;i++){
        mensaje.push({
            id_producto,
            ruta: req.files[i].path.replace('public/', '')
         })
    }        
    console.log(mensaje)
    
    try {
        let imagen = await Imagenes.bulkCreate(
            mensaje
        ,{
            fields: ['id_producto', 'ruta']
        });
        return res.json({
            message: "success adding image",
            data : imagen
        });
    } catch (e) {
        console.log(e);
        res.status(100).json({
            message: "Something goes wrong 100",
            error: true
        });
    }
    
}


export async function getImagen(req, res) {
    try{
        const imagenes = await Imagenes.findAll({
            attributes: ['id_imagen','id_producto','ruta']
        });
        return res.json(imagenes);
    }catch(e){
        console.log(e);
        res.status(101).json({
            message: "Something goes wrong 101",
            data: {}
        });
    }
}

export async function getOneImagen(req, res) {
    const { id_imagen } = req.params;
    try{
        const imagen = await Imagenes.findOne({
            attributes: ['id_imagen','id_producto','ruta'],
            where:{
                id_imagen
            }
        });
        return res.json(imagen);
    }catch(e){
        console.log(e);
        res.status(102).json({
            message: "Something goes wrong 102",
            data: {}
        });
    }
}

export async function updateImagen(req, res) {
    const { id_imagen } = req.params;
    try{
        const {id_producto, ruta } = req.body;
        const imagen = await Imagenes.update({
            id_producto,
            ruta
        },{
            where:{
                id_imagen
            }
        });
        return res.json(imagen);
    }catch(e){
        console.log(e);
        res.status(103).json({
            message: "Something goes wrong 103",
            data: {}
        });
    }
}

export async function deleteOnImagen(req, res) {
    let imagenes = []
    req.body.map(imagen => (
        imagenes.push(imagen.id_imagen)
    ))    
    try{
        const imagen = await Imagenes.destroy({
            where:{
                id_imagen: imagenes
            }
        });
        deleteImagOnDisk(req.body)
        return res.json(imagen);
    }catch(e){
        console.log(e);
        res.status(103).json({
            message: "Something goes wrong 103",
            data: {}
        });
    }
    
}

export async function getImagesByProducto(req, res) {
    const { id_producto } = req.params;
    try{
        const imagenes = await Imagenes.findAll({
            attributes: ['id_imagen','id_producto','ruta'],
            where: {
                id_producto
            }
        });
        return res.json(imagenes);
    }catch(e){
        console.log(e);
        res.status(104).json({
            message: "Something goes wrong 104",
            data: {}
        });
    }
}