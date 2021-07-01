import React, { Component } from "react";
import { createStore } from "redux";
import movieApp from "./reducers/reducers";
import { Provider } from "react-redux";
import MainView from "./components/main-view/main-view";

function App() {
  const filmopediaStore = createStore(movieApp);

  return (
    <Provider store={filmopediaStore}>
      <MainView />
    </Provider>
  );
}

export default App;
