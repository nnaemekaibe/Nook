import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import App from "./App";
import {Home, Page} from './App'

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="page" element={<Page />}>
              <Route path=":id" element={<Page />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
  </StrictMode>
);
