import ReactRouterSSR from 'react-router-ssr';

ReactRouterSSR.Run({
  childRoutes: [
    require('TodoApp/client'),
    require('AdminApp/client')
  ]
});
