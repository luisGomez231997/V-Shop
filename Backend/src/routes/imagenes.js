import { Router } from 'express';
import { addImagen, getImagen, getOneImagen, updateImagen, deleteOnImagen, getImagesByProducto } from '../controllers/dao.imagenes'; //funcion con los controladores para imagenes
import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/product-images')
    },
    filename: (req, file, cb) => {
        //Math.floor(Math.random() * 1000) + 100  
      cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ storage })

const router = Router();

/*CRUD imagenes*/
//Create category, requires body, return categoty || error
router.post('/add/:id_producto', upload.array('images', 6), addImagen);
//Get all categorys, return categotys || null
router.get('/get', getImagen);
//Get one category, requires parameter id_categoria, return categoty || null
router.get('/get/:id_imagen', getOneImagen);
//Update category, requires parameter id_categoria, return 1 || 0
router.put('/update/:id_imagen', updateImagen);
//Delete category, requires parameter id_categoria, return 1 || 0
router.post('/delete', deleteOnImagen);

/*functions*/
router.get('/get/by-producto/:id_producto',getImagesByProducto);

export default router;