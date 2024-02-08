import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Curr from "./Curr";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Curr />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
