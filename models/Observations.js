/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
    let Observations = sequelize.define("Observations", {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: {
                args: true
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pictureId: {
            type: DataTypes.STRING,
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
            allowNull: true
        },
        speciesSciName: {
            type: DataTypes.STRING,
            allowNull: true
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
            allowNull: false
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
