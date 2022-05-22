import { createRoot } from "react-dom/client";
import App from "./App";
import "./assets/css/app.css";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import reducers from "../redux/reducer";
import thunk from "redux-thunk";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const container = document.getElementById("root");

const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App/>
  </Provider>
);
