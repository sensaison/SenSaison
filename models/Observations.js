/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
    var Observations = sequelize.define("Observations", {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: {
                args: true,
                msg: "CATHERINE THERE'S A PROBLEM WITH PRIMARY KEY!!"
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        picture_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        time_stamp: {
            type: DataTypes.DATE,
            allowNull: false
        },
        date_time_obs: {
            type: DataTypes.DATE,
            allowNull: false
        },
        lat_lon: {
            type: DataTypes.GEOMETRY,
            allowNull: true
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        species: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isAlpha: true,
                msg: "Are you sure you spelled that right?"
            }
        },
        species_sci_name: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isAlpha: true,
                msg: "Are you sure you spelled that right?"
            }
        },
        species_confidence: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        weather: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isAlpha: true,
                msg: "Are you sure you spelled that right?"
            }
        },
        land_water: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isAlpha: true,
                msg: "Are you sure you spelled that right?"
            }
        },
        first_confidence: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    Observations.associate = function(models) {
        Observations.belongsTo(models.Users, {
            foreignkey: {
                allowNull: false
            }
        });
    };
    return Observations;
};
