import React from 'react';
import Body from './containers/Body';

const homeRoutes = [
  {
    path: '/',
    auth: true,
    exact: true,
    component: <Body />,
  },
];

export default homeRoutes;
