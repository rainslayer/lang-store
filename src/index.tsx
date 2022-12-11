import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppComponent from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store";
import { ERoutes, IAppProps } from "./const/types";

if (!(Object.values(ERoutes) as string[]).includes(window.location.pathname)) {
  window.location.pathname = ERoutes.Catalogue;
}

export class App {
  root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

  start(props: IAppProps) {
    this.root.render(
      <React.StrictMode>
        <Provider store={store}>
          <AppComponent dealers={props.dealers} />
        </Provider>
      </React.StrictMode>
    );
  }
}

window.App = App;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
