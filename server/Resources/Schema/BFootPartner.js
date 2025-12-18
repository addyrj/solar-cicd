module.exports = (sequelize, DataTypes) => {
    const BFootPartnerSchema = sequelize.define("bfootpartner", {
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
        GPOrganisation: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Contact: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Device: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Login: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Pwd: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        BaselinePlanDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        BaselineCmpltDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        MonitorPlanDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        MonitorCmpltDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        EvalPlanDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        EvalCmpltDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },

    },
        { tableName: 'bfootpartner' }
    );
    return BFootPartnerSchema;
};
