module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define("Users", {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        openId: {
            type: DataTypes.STRING,
            unique: {
                args: true
            }
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
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
        }
    },
    {
        freezeTableName: true
    });

    User.associate = models => {
        User.hasMany(models.Observations, {
            foreignKey: "openId",
            sourceKey: "openId",
            onDelete: "no action",
            onUpdate: "cascade"
        });
    };

    return User;
};
