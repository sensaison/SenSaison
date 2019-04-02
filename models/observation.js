/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
  var Observation = sequelize.define("Observation", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user: {
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
      allowNull: true
    },
    species_sci_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    species_confidence: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    weather: {
      type: DataTypes.STRING,
      allowNull: true
    },
    land_water: {
      type: DataTypes.STRING,
      allowNull: true
    },
    first_confidence: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  Observation.associate = function(models) {
    Observation.belongsTo(models.User, {
      foreignkey: {
        allowNull: false
      }
    });
  };

  return Observation;
};
