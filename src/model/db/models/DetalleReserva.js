module.exports = (sequelize, DataTypes)=>{
    
    let alias = 'DetalleReservas';
    let cols = {
        idDetalle_reserva: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        descripcion: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        foto_pago: DataTypes.STRING(45),
            
        hora_entrega: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        asistentes: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        
        usuarios_idUsuarios: DataTypes.INTEGER,
        reserva_idReserva: DataTypes.INTEGER,
    };

    let config = {
        tableName: 'detalle_reserva',
        timestamps: false
    }

    let DetalleReserva = sequelize.define(alias, cols, config);

    // Relación uno a muchos con la tabla intermedia
    DetalleReserva.associate = (models) => {
        DetalleReserva.belongsTo(models.Reservas, {
            as: 'reservasDetalle',
            foreignKey: 'reserva_idReserva'
        });
        DetalleReserva.belongsTo(models.Usuarios, {
            as: 'usuariosDetalle',
            foreignKey: 'usuarios_idUsuarios'
        }); 
    };

    return DetalleReserva;
}