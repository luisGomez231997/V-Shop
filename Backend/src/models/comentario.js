import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Comentario = sequelize.define('comentario',{
    id_comentario:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    comentario:{
        type: Sequelize.STRING(50)
    },
    calificacion:{
        type: Sequelize.INTEGER
    },
    fecha:{
        type: Sequelize.DATE
    },
    id_producto:{
        type: Sequelize.INTEGER
    },
    id_usuario:{
        type: Sequelize.INTEGER,
        references: 'usuario',
        referencesKey: 'id_usuario'
    }
},{
    underscored: false,
    timestamps: false,
    freezeTableName: true
});

export default Comentario;