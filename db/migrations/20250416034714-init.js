'use strict';

const { DataTypes, NOW } = require('sequelize');
const { URL_TABLE } = require('../models/url.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(URL_TABLE, {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            originalUrl: {
                allowNull: false,
                type: DataTypes.STRING,
                field: 'original_url',
            },
            shortCode: {
                allowNull: false,
                type: DataTypes.STRING,
                field: 'short_code',
            },
            statistics: {
                allowNull: false,
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            isActive: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                field: 'created_at',
                defaultValue: Sequelize.fn(NOW),
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
                field: 'updated_at',
                defaultValue: Sequelize.fn(NOW),
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable(URL_TABLE);
    },
};
