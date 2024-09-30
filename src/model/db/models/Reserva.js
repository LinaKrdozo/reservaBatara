module.exports = (sequelize, DataTypes)=>{
    
    let alias = 'Reservas';
    let cols = {
        idReserva: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        fecha_reserva: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        fecha_evento: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        
        tipo_evento: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        
        disponibilidad: {
            type: DataTypes.STRING(45),
            allowNull: false,
        }
        
    };

    let config = {
        tableName: 'reserva',
        timestamps: false
    }

    let Reserva = sequelize.define(alias, cols, config);

    Reserva.associate = (models) =>{
        //relacion muchos a muchos entre usuarios y reservas
        Reserva.belongsToMany( models.Usuarios, {
            as: 'reserva',
            through: 'detalle_reserva',
            timestamps: false,
            foreignKey: 'reserva_idReserva',
            otherKey: 'usuarios_idUsuarios'
        }),

        //relacion uno a muchos con la tabla intermedia
        Reserva.hasMany(models.DetalleReservas, {
            as: 'reservaDetalleReserva',
            foreignKey: 'reserva_idReserva'
        })
    }

    return Reserva;
}