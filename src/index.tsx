import { StrictMode } from "react";
import {render} from "react-dom";
import App, { Home, Page } from "./App";
import {Router, Link, useLocation} from '@reach/router';

const rootElement = document.getElementById("root");

render(
  <StrictMode>
    <App/>
  </StrictMode>, rootElement
);
