module.exports = (sequelize, DataTypes) => {
    const UidipSchema = sequelize.define("uidip", {
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
        IP: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Time: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        }
    },
        { tableName: 'uidip' }
    );
    return UidipSchema;
};
