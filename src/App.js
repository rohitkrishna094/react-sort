import React, { Component } from 'react';
import VerticalBar from './components/VerticalBar/VerticalBar';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/rootReducer';

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <VerticalBar />
      </Provider>
    );
  }
}

export default App;
