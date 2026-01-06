import task from './task';
export default () => ({
  type: 'admin',
  routes: [
    // @ts-expect-error
    ...task.routes,
    {
      method: 'GET',
      path: '/tasks/related/:relatedType/:relatedId',
      handler: 'task.findRelatedTasks',
    },
  ],
});