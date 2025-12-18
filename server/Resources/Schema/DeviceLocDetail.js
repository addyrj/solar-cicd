module.exports = (sequelize, DataTypes) => {
    const DeviceLocationDetail = sequelize.define("devlocdetails", {
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
        Country: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Province: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        District: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Village: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        DonorID: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        PartnerID: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        InstallDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        Coordinates: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        SolarMamas: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Comments: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        UID_TXT: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
        { tableName: 'devlocdetails' }
    );
    return DeviceLocationDetail;
};
