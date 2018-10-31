import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/rootReducer';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import Chart from './components/Charts/Chart';
import Donut from './components/Charts/Donut';

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/donut" exact={true} component={Donut} />
            <Route component={Chart} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
