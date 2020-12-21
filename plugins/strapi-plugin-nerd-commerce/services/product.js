'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
    /**
     * Promise to fetch all records
     *
     * @return {Promise}
     */
    find(params, populate) {
        return strapi.query('product', 'strapi-plugin-nerd-commerce').find(params, populate);
    },
    /**
    * Promise to fetch record
    *
    * @return {Promise}
    */

    findOne(params, populate) {
        return strapi.query('product', 'strapi-plugin-nerd-commerce').findOne(params, populate);
    },

    /**
     * Promise to count record
     *
     * @return {Promise}
     */

    count(params) {
        return strapi.query('product', 'strapi-plugin-nerd-commerce').count(params);
    },

    /**
     * Promise to add record
     *
     * @return {Promise}
     */

    async create(data, { files } = {}) {
        const validData = await strapi.entityValidator.validateEntity(strapi.models.product, data);
        const entry = await strapi.query('product', 'strapi-plugin-nerd-commerce').create(validData);

        if (files) {
        // automatically uploads the files based on the entry and the model
        await strapi.entityService.uploadFiles(entry, files, {
            model: 'product',
            // if you are using a plugin's model you will have to add the `source` key (source: 'users-permissions')
        });
        return this.findOne({ id: entry.id });
        }

        return entry;
    },

    /**
     * Promise to edit record
     *
     * @return {Promise}
     */

    async update(params, data, { files } = {}) {
        const validData = await strapi.entityValidator.validateEntityUpdate(
        strapi.models.product,
        data
        );
        const entry = await strapi.query('product', 'strapi-plugin-nerd-commerce').update(params, validData);

        if (files) {
        // automatically uploads the files based on the entry and the model
        await strapi.entityService.uploadFiles(entry, files, {
            model: 'product',
            // if you are using a plugin's model you will have to add the `source` key (source: 'users-permissions')
        });
        return this.findOne({ id: entry.id });
        }

        return entry;
    },

    /**
     * Promise to delete a record
     *
     * @return {Promise}
     */

    delete(params) {
        return strapi.query('product', 'strapi-plugin-nerd-commerce').delete(params);
    }
};
