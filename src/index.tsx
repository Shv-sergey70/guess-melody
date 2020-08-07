import * as React from 'react';
import * as ReactDom from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {compose} from 'recompose';
import {Router} from 'react-router-dom';
import history from './history';
import reducer from './reducer';
import {Operations} from './reducer/data/data';
import App from './components/app/app';
import createAPI from './api';
import Route from './routes';
import {attempts} from './init-data';

declare const __REDUX_DEVTOOLS_EXTENSION__: ({trace: boolean}) => any;

const init = () => {
  const api = createAPI(() => {
    history.push(Route.AUTH);
  });

  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          __REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__({trace: true})
      )
  );

  store.dispatch(Operations.checkLogin());
  store.dispatch(Operations.loadQuestions());

  ReactDom.render(
      <Provider store={store}>
        <Router history={history}>
          <App
            attempts={attempts} />
        </Router>
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
