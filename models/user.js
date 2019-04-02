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
                isAlpha: true,
                msg: "Are you sure you spelled that right?"
            }
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: true,
                msg: "Are you sure you spelled that right?"
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
                msg: "Are you sure you spelled that right?"
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
                isAlphanumeric: true,
                msg: "Only letters and numbers allowed!"
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
                len: [10, 20],
                notEmpty: true,
                notContains: this.username,
                notContains: this.firstname,
                notContains: this.lastname,
                msg: "Your password cannot contain your name or username, and must be between 10 and 20 characters in length"
            }
        }
    });

    User.associate = function(models) {
        User.hasMany(models.Observation);
    };
<<<<<<< HEAD
=======

>>>>>>> 213cd5eba2a5c881d21827951dbcf62b6b1a8e44
    return User;
};
