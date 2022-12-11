/// <reference types="react-scripts" />

import { App } from "src";

declare global {
  interface Window {
    App: typeof App;
  }
}
