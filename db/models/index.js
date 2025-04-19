import { Url, UrlSchema } from './url.model.js';

export function setupModels(sequelize) {
    Url.init(UrlSchema, Url.config(sequelize));
}
