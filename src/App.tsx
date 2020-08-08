import React from 'react';
import { hot } from 'react-hot-loader';

import Dashboard from './scenes/Dashboard';

import './styles/index.scss';

const App = () => <Dashboard />;

export default hot(module)(App);
