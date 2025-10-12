/**
 * Application methods
 */
import bootstrap from './bootstrap';
import destroy from './destroy';
import register from './register';

/**
 * Plugin server methods
 */
import config from './config';
import controllers from './controllers';
import routes from './routes';
import services from './services';
import contentTypes from './content-types';

export default {
  register,
  bootstrap,
  destroy,
  config,
  controllers,
  routes,
  services,
  contentTypes,
};
