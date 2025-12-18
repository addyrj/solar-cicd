module.exports = (sequelize, DataTypes) => {
    const DonorSchema = sequelize.define("donor", {
        ID: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
        },
        Country: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        DonarOrganisation: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true, // Add unique constraint
        },
        Mobile: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Website: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true, // Add unique constraint
        },
    },
    {
        tableName: 'donor',
        timestamps: false,
    });
    return DonorSchema;
};