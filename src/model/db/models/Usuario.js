module.exports = (sequelize, DataTypes) => {
    const alias = 'Usuarios'; // Nombre del modelo en singular

    const cols = {
        idUsuarios: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        nombre_completo: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        correo: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        telefono: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        foto: {
            type:DataTypes.STRING(45),
            allowNull: false
        },

        tipo_residente: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        apartamento: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        rol_idRol: DataTypes.INTEGER
    };

    const config = {
        tableName: 'usuarios', 
        timestamps: false 
    };

    const Usuario = sequelize.define(alias, cols, config);

    Usuario.associate = (models) =>{
        //relacion entre usuario y rol
        Usuario.belongsTo(models.Roles, {
            as: "usuarioPorRol",
            foreignKey: "rol_idRol"
        }), 
        //relacion muchos a muchos entre usuarios y reservas
        Usuario.belongsToMany( models.Reservas, {
            as: 'usuarios',
            through: 'detalle_reserva',
            timestamps: false,
            foreignKey: 'usuarios_idUsuarios',
            otherKey: 'reserva_idReserva'
        }),

        //relacion uno a muchos con la tabla intermedia
        Usuario.hasMany(models.DetalleReservas, {
            as: 'usuarioDetalleReserva',
            foreignKey: 'usuarios_idUsuarios'
        })

    }
    return Usuario;
};
