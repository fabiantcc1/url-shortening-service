import { Model, DataTypes, Sequelize, NOW } from 'sequelize';

export const URL_TABLE = 'urls';

export const UrlSchema = {
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
        unique: true,
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
};

export class Url extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: URL_TABLE,
            modelName: 'Url',
            timestamps: false,
        };
    }
}
