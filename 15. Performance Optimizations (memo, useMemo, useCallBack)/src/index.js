import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
// import App from "./App";
// import App2 from "./App2";
// import AppMemo from "./App-memo";
import AppUseMemo from "./App-useMemo";
// import Memo from "./Performance/memo";
// import UseMemo from "./Performance/useMemo";
// import UseCallBack from "./Performance/useCallBack";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <App2 /> */}
    {/* <AppMemo /> */}
    <AppUseMemo />
    {/* <Memo /> */}
    {/* <UseMemo /> */}
    {/* <UseCallBack /> */}
  </React.StrictMode>
);
