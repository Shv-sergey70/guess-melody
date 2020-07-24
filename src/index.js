import React from 'react';
import ReactDom from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {compose} from 'recompose';
import reducer from './reducer';
import {Operations} from './reducer/data/data';
import App from './components/app/app';
import createAPI from './api';

const init = () => {
  // Function passes into createAPI, because store depends on API, and API depends on store
  const api = createAPI((...args) => store.dispatch(...args));
  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
  );

  store.dispatch(Operations.checkLogin());
  store.dispatch(Operations.loadQuestions());

  ReactDom.render(
      <Provider store={store}>
        <App
          attempts={3} />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
