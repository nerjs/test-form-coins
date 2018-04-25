import Root from './comp/root';
import React from 'react';
import store from './data/store';
import {Provider} from 'react-redux';

const App = props => {
  return (
    <Provider store={store}>
      <div id="app">
          <Root />
      </div>
    </Provider>
  );
}

export default App

