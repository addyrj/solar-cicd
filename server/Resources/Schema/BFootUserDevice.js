module.exports = (sequelize, DataTypes) => {
    const BFootUserDevice = sequelize.define("bfootuserdevices", {
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
        UserID: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        AddTime: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        Rights: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
        { tableName: 'bfootuserdevices' }
    );
    return BFootUserDevice;
};
