import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from "./store";
// import "./Lesson/store1.js";
// import "./Lesson/store2.js";

// console.log(store.getState());                             // { account: {balance:0,loan:0,loanPurpose:''}, customer: {fullName:'',nationalID:'',createdAt:''} }
// store.dispatch({ type: "account/deposit", payload: 100 })
// console.log(store.getState());                             // { account: {balance:100,loan:0,loanPurpose:''}, customer: {fullName:'',nationalID:'',createdAt:''} }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
