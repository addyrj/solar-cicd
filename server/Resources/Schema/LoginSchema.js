module.exports = (sequelize, DataTypes) => {
    const LoginSchema = sequelize.define("login", {
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
            tableName: 'login',
            timestamps: false,
        }
    );
    return LoginSchema;
};
