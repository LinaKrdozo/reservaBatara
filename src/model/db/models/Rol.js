module.exports = (sequelize, DataTypes)=>{
    
    let alias = 'Roles';
    let cols = {
        idRol: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        nombreRol: {
            type: DataTypes.STRING(45),
            allowNull: false,
        }
    };

    let config = {
        tableName: 'rol',
        timestamps: false
    }

    let Rol = sequelize.define(alias, cols, config);

    Rol.associate = (models) =>{
        //relacion entre usuario y rol
        Rol.hasMany(models.Usuarios, {
            as: "RolesPorUsuario", 
            foreignKey: "rol_idRol"
        })
    }

    return Rol;
}