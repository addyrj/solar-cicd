module.exports = (sequelize, DataTypes) => {
    const NewDeviceLocationDetail = sequelize.define("newdevicelocationdetails", {
        ID: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        UID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // UID must always be unique
        },
        Country: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        State: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        District: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Block: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        VillageName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
      
        DonarName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        InstallationDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        PanchayatSamiti: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        NameOfBeneficiary: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        BeneficiaryPno: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Location: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        SolarEngineerName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        SolarEngineerPno: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        GCName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        GCPhoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        tableName: 'newdevicelocationdetails',
        timestamps: true, // this adds createdAt and updatedAt automatically
    });

    return NewDeviceLocationDetail;
};
