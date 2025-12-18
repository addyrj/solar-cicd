module.exports = (sequelize, DataTypes) => {
    const BFootLoginSchema = sequelize.define("bfootlogin", {
        ID: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
        },
        UserID: {
            type: DataTypes.STRING,
            allowNull: true,
            hidden: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            hidden: true
        },
        password: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        homepage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        active: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        resetToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        resetComplete: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role: {
            type: DataTypes.ENUM('superadmin', 'admin'),
            allowNull: false,
            defaultValue: 'admin'
        },

        IP: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        Time: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        }
    },
        {
            tableName: 'bfootlogin',
            timestamps: false,
        });

    return BFootLoginSchema;
};
