module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: {
                args: true,
                msg: "CATHERINE THERE'S A PROBLEM WITH USER ID!!"
            }
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: true
            }
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: true
            }
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                isEmail: true
            },
            unique: {
                args: true,
                msg: "Email address already in use!"
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: true
            },
            unique: {
                args: true,
                msg: "Username already taken!"
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                notContains: User.username,
                notContains: User.firstname,
                notContains: User.lastname
            }
        }
    });

    User.associate = function(models) {
        User.hasMany(models.Observation);
    };
    
    return User;
};