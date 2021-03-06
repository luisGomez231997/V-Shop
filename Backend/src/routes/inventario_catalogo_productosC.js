import { Router } from 'express';
import { crear, get, getOn, deleteOn, updateOn, getProductosHomePageByCatalogo, getProductoPage, 
    geAvailableProduts } from '../controllers/dao.inventario_catalogo_productos'; //funcion con los controladores para productos
const router = Router();

/*CRUD category*/
//Create category, requires body, return categoty || error
router.post('/create', crear);
//Get all categorys, return categotys || null
router.get('/get', get);
//Get one category, requires parameter id_categoria, return categoty || null
router.get('/get/:id_producto/:id_catalogo', getOn);
//Update category, requires parameter id_categoria, return 1 || 0
router.put('/update/:id_product/:id_catalogo', updateOn);
//Delete category, requires parameter id_categoria, return 1 || 0
router.delete('/delete/:id_producto/:id_catalogo', deleteOn);

/*functions*/
router.get('/get-available', geAvailableProduts);
router.get('/getProductosHomePageByCatalogo/:id_catalogo',getProductosHomePageByCatalogo);
router.get('/getProductoPage/:id_catalogo/:id_producto',getProductoPage);

export default router;