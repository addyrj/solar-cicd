module.exports = (sequelize, DataTypes) => {
    const MobileDevice = sequelize.define("mobiledevices", {
        ID: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
        },
        Device: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
        {
            tableName: 'mobiledevices',
            timestamps: false,
        }
    );
    return MobileDevice;
};
