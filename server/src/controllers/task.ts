/**
 * Task controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('plugin::todo.task', ({ strapi }) => ({
  async findRelatedTasks(ctx) {
    const { relatedId, relatedType } = ctx.params;

    const tasks = await strapi
      .service('plugin::todo.task')
      .findRelatedTasks(relatedId, relatedType);

    ctx.body = tasks;
  }
}));
