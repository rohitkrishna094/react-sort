import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./store/reducers/rootReducer";

import Chart from "./components/Charts/Chart";

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Chart />
      </Provider>
    );
  }
}

export default App;
