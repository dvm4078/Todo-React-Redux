import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Layout from './components/Layout';
import configureStore from './store';

const store = configureStore({});
const app = document.getElementById('app');

ReactDOM.render(
<Provider store={store}>
  <Layout />
  </Provider>
  , app);