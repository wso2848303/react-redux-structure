import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
import App from "./containers/App";
import * as serviceWorker from './serviceWorker';
import { mock } from './redux/mockConfig';
import './axiosConfigs';
const store = configureStore();
window.mock = mock;
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
serviceWorker.register();