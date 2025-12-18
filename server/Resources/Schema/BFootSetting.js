module.exports = (sequelize, DataTypes) => {
    const BFootSettingSchema = sequelize.define("bfootsettings", {
        ID: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
        },
        UID: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Dummy1: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        MaxPanelPower: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        MinPanelVolt: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        MaxPanelVolt: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        MinBatVolt: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        MaxBatVolt: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        MinLoadVolt: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        MaxLoadVolt: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        MinPanelCurrent: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        MaxPanelCurrent: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        MinBatCurrent: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        MaxBatCurrent: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        MinLoadCurrent: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        MaxLoadCurrent: {
            type: DataTypes.FLOAT,
            allowNull: true,
        }
    },
        { tableName: 'bfootsettings' }
    );
    return BFootSettingSchema;
};
