import task from './task';
export default () => ({
  type: 'content-api',
  // @ts-expect-error
  routes: [...task.routes],
});