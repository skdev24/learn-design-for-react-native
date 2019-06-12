import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createClient } from 'contentful/dist/contentful.browser.min.js';
import AppNavigator from './navigator/AppNavigator';
import { space, accessToken } from './utils/keys';

const initialState = {
  action: '',
  name: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLOSE_MENU':
      return {
        ...state,
        action: 'closeMenu',
      };
    case 'OPEN_MENU':
      return {
        ...state,
        action: 'openMenu',
      };
    case 'UPDATE_NAME':
      return {
        ...state,
        name: action.name,
      };
    default:
      return state;
  }
};

export const contentfulClient = createClient({
  space: space,
  accessToken: accessToken,
});

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);

export default App;
