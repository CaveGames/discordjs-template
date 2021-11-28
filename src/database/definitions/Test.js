const DataTypes = require('sequelize');

module.exports = {
	name: 'Test',
	table: {
		message: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		test: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	associations: [
		{
			type: 'belongsTo',
			table: 'Test',
			options: {
				as: 'parent',
				foreignKey: 'test',
				onDelete: 'CASCADE',
			},
		},
		{
			type: 'hasMany',
			table: 'Test',
			options: {
				as: 'childs',
				foreignKey: 'test',
				onDelete: 'CASCADE',
			},
		},
	],
};
