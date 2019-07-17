module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("Users", {
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true
		},
		openId: {
			type: DataTypes.STRING,
			unique: {
				args: true
			}
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: true
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: true
		},
		displayName: {
			type: DataTypes.STRING,
			allowNull: true
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
		issuer: {
			type: DataTypes.STRING,
			allowNull: false
		},
		username: {
			type: DataTypes.STRING,
			allowNull: true,
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
