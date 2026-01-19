const { sequelize } = require('../utils/db')
const { Model, DataTypes } = require("sequelize")

class Board extends Model {}

Board.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE
    }
},{
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'board'
})

module.exports = Board