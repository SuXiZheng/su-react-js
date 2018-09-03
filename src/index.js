import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Route, Router } from 'react-router';
import { createBrowserHistory } from 'history';

const browserHistory = createBrowserHistory();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
