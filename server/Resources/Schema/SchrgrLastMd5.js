module.exports = (sequelize, DataTypes) => {
    const SolarChargerLast = sequelize.define("schrgr_last_md5", {
        ID: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
        },
        UID: {
            type: DataTypes.BIGINT(20),
            allowNull: true,
        },
        MD5: {
            type: DataTypes.TEXT('tiny'),
            allowNull: true,
        },
        IP: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Tstamp: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        }
    },
        { tableName: 'schrgr_last_md5' }
    );
    return SolarChargerLast;
};
