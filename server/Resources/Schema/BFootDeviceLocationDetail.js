module.exports = (sequelize, DataTypes) => {
    const BFootDeviceLocationDetail = sequelize.define("bfootdevlocdetails", {
        ID: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
        },
        UID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                name: 'uid_unique',
                msg: 'UID must be unique'
            },
            validate: {
                notEmpty: {
                    msg: 'UID cannot be empty'
                },
                notNull: {
                    msg: 'UID is required'
                }
            }
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
    }, {
        tableName: 'bfootdevlocdetails',
        timestamps: false,
    });

    return BFootDeviceLocationDetail;
};
