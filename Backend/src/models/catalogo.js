import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Inventario_catalogo_productos from './inventario_catalogo_productos';
import Detalle_factura from './detalle_factura';

const Catalogo = sequelize.define('catalogo',{
    id_catalogo:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    ciudad:{
        type: Sequelize.STRING(30)
    },
    id_gerente:{
        type: Sequelize.INTEGER
    },
    nombre_catalogo:{
        type: Sequelize.STRING(30)
    },
    estado:{
        type: Sequelize.INTEGER
    }
},{
    timestamps: false,
    freezeTableName: true
});

Catalogo.hasMany(Inventario_catalogo_productos,{foreignKey: 'id_catalogo', sourcekey:'id_catalogo'});
Inventario_catalogo_productos.belongsTo(Catalogo,{foreignKey: 'id_catalogo', sourcekey:'id_catalogo'});

Catalogo.hasMany(Detalle_factura,{as:'detalle_factura',foreignKey: 'id_catalogo', sourcekey:'id_catalogo'});
Detalle_factura.belongsTo(Catalogo,{foreignKey: 'id_catalogo', sourcekey:'id_catalogo'});

export default Catalogo;