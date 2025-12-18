module.exports = (sequelize, DataTypes) => {
    const SolarCharger = sequelize.define("solarcharger", {
        ID: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
        },
        Location: {
            type: DataTypes.TEXT('tiny'),
            allowNull: true,
        },
        UID: {
            type: DataTypes.TEXT('tiny'),
            allowNull: false,
        },
        BatVoltage: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        BatCurrent: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        PvVolt: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        PvCur: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        LoadVoltage: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        LoadCurrent: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        BatKWh: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        PVKWh: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        Temperature: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        Time: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        RecordTime: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        IP: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        tableName: 'solarcharger',
        timestamps: false,
    });
    return SolarCharger;
};