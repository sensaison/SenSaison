/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
    let Observations = sequelize.define("Observations", {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: {
                args: true,
                msg: "CATHERINE THERE'S A PROBLEM WITH PRIMARY KEY!!"
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pictureId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dateObs: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        timeObs: {
            type: DataTypes.TIME,
            allowNull: false
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        longitude: {
            type: DataTypes.FLOAT,
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
        speciesSciName: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isAlpha: true,
                msg: "Are you sure you spelled that right?"
            }
        },
        speciesConfidence: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        firstConfidence: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        briefDescription: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        extendedDescription: {
            type: DataTypes.TEXT,
            allowNull: true
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

    Observations.associate = function(models) {
        Observations.belongsTo(models.Users, {
            foreignKey: "userId",
            targetKey: "userId",
            onDelete: "no action",
            onUpdate: "cascade"
        });
    };
    return Observations;
};
