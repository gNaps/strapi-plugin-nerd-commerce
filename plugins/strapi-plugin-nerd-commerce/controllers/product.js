'use strict';

const { sanitizeEntity } = require('strapi-utils');


/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this controllers
 */

module.exports = {

    /**
     * Retrieve records.
     *
     * @return {Array}
     */

    async find(ctx) {
        let entities;
        if (ctx.query._q) {
        entities = await strapi.services.product.search(ctx.query);
        } else {
        entities = await strapi.plugins['strapi-plugin-nerd-commerce'].services.product.find(ctx.query);
        }

        return entities.map(entity => sanitizeEntity(entity, { model: strapi.plugins['strapi-plugin-nerd-commerce'].models.product }));
    },
    /**
     * Retrieve a record.
     *
     * @return {Object}
     */

    async findOne(ctx) {
        const { id } = ctx.params;

        const entity = await strapi.plugins['strapi-plugin-nerd-commerce'].services.product.findOne({ id });
        return sanitizeEntity(entity, { model: strapi.plugins['strapi-plugin-nerd-commerce'].models.product });
    },
    /**
     * Count records.
     *
     * @return {Number}
     */

    count(ctx) {
        if (ctx.query._q) {
        return strapi.plugins['strapi-plugin-nerd-commerce'].services.product.countSearch(ctx.query);
        }
        return strapi.plugins['strapi-plugin-nerd-commerce'].services.product.count(ctx.query);
    },
    /**
     * Create a record.
     *
     * @return {Object}
     */

    async create(ctx) {
        let entity;
        entity = await strapi.plugins['strapi-plugin-nerd-commerce'].services.product.create(ctx.request.body);

        return sanitizeEntity(entity, { model: strapi.plugins['strapi-plugin-nerd-commerce'].models.product });
    },
    /**
     * Update a record.
     *
     * @return {Object}
     */

    async update(ctx) {
        const { id } = ctx.params;

        let entity;
        entity = await strapi.plugins['strapi-plugin-nerd-commerce'].services.product.update({ id }, ctx.request.body);

        return sanitizeEntity(entity, { model: strapi.plugins['strapi-plugin-nerd-commerce'].models.product });
    },
    /**
     * Delete a record.
     *
     * @return {Object}
     */
    async delete(ctx) {
        const { id } = ctx.params;
    
        const entity = await strapi.plugins['strapi-plugin-nerd-commerce'].services.product.delete({ id });
        return sanitizeEntity(entity, { model: strapi.plugins['strapi-plugin-nerd-commerce'].models.product });
    }
};
