import React from "react";
import { createRoot } from "react-dom/client"; // 注意这里是从 'react-dom/client' 导入
import BirthSimulator from "./bs";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BirthSimulator />
  </React.StrictMode>
);
