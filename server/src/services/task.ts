/**
 * Task service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('plugin::todo.task', ({ strapi }) => ({
  findRelatedTasks: async (relatedId: string, relatedType: string) => {
    const taskIds = await strapi.db.connection('tasks_related_mph')
      .select('task_id')
      .where({
        related_id: relatedId,
        related_type: relatedType,
      });

    return strapi.documents('plugin::todo.task').findMany({
      filters: {
        id: {
          $in: taskIds.map(({ task_id }) => task_id),
        },
      },
    });
  }
}));
