import { HashRouter, Route, Routes } from "react-router-dom";
import { Controller } from "./Controller";
import { Display } from "./Display";

export function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Controller />} index />
        <Route element={<Display />} path="/display" />
      </Routes>
    </HashRouter>
  );
}
