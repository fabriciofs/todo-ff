import { boot } from 'quasar/wrappers';

import TodoHttpGateway from '../gateways/TodoHttpGateway';
import AxiosAdapter from '../infra/AxiosAdapter';

export default boot(({ app }) => {
  const httpClient = new AxiosAdapter();
  const todoGateway = new TodoHttpGateway(httpClient, 'http://localhost:3000');
  app.provide('todoGateway', todoGateway);
});

export { boot };