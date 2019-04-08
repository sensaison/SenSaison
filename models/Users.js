module.exports = function(sequelize, DataTypes) {
    let Users = sequelize.define("Users", {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: {
                args: true
            }
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: true
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            },
            unique: {
                args: true
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: true
            },
            unique: {
                args: true
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
    },
    {
        freezeTableName: true
    });

    Users.associate = function(models) {
        Users.hasMany(models.Observations, {
            foreignKey: "userId",
            onDelete: "no action",
            onUpdate: "cascade"
        });
    };

    return Users;
};
