import { createStore } from "redux";
// import {  legacy_createStore as createStore } from "redux";

// ! Initial State
const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
};
// ! Reducer Function
function reducer(state = initialState, action) {
    switch (action.type) {
        case "account/deposit":
            return { ...state, balance: state.balance + action.payload };
        case "account/withdraw":
            return { ...state, balance: state.balance - action.payload };
        case "account/requestLoan":
            if (state.loan > 0) return state;
            return { ...state, balance: state.balance + action.payload.amount, loan: action.payload.amount, loanPurpose : action.payload.purpose};
        case "account/payLoan":
            return { ...state, balance: state.balance - state.loan, loan: 0,  loanPurpose : "" };
        case "account/reset":
            return initialState;
        default:
            return state;
    }
}
// * It is totally same as useReducer (except as default: return state)


// ! Store
const store = createStore(reducer);                                         console.log(store.getState());  // {balance: 0, loan: 0, loanPurpose: ''}           
store.dispatch({type : "account/deposit", payload : 500 });                 console.log(store.getState());  // {balance: 500, loan: 0, loanPurpose: ''}    
store.dispatch({type : "account/withdraw", payload : 200 });                console.log(store.getState());  // {balance: 300, loan: 0, loanPurpose: ''}    
store.dispatch({type : "account/requestLoan", payload : {           
    amount : 150, 
    purpose : "Buy a car"
} });                                                                       console.log(store.getState());  // {balance: 450, loan: 150, loanPurpose: 'Buy a car'} 
store.dispatch({type : "account/payLoan"});                                 console.log(store.getState());  // {balance: 300, loan: 0, loanPurpose: ''}    
store.dispatch({type : "account/reset"});                                   console.log(store.getState());  // {balance: 0, loan: 0, loanPurpose: ''}   



// ! Action Creators (instead of Store we create a function and return it from function)
function deposit(amount){ return {type : "account/deposit", payload : amount }};
store.dispatch(deposit(500));                                               console.log(store.getState());  // {balance: 500, loan: 0, loanPurpose: ''}

function withdraw(amount){return {type : "account/withdraw", payload : amount }};
store.dispatch(withdraw(200));                                              console.log(store.getState());  // {balance: 300, loan: 0, loanPurpose: ''} 

function requestLoan(amount, purpose){return {type : "account/requestLoan", payload : {
    amount,
    purpose
}}};
store.dispatch(requestLoan(150, "Buy a car"));                              console.log(store.getState());  // {balance: 450, loan: 150, loanPurpose: 'Buy a car'} 
// ! OR
// function requestLoan(object){return {type : "account/requestLoan", payload : {
//     amount : object.amount,
//     purpose : object.purpose
// }}};
// store.dispatch(requestLoan({amount : 150, purpose : "Buy a car"}));      console.log(store.getState());  // {balance: 450, loan: 150, loanPurpose: 'Buy a car'} 

function payLoan(){return {type : "account/payLoan"}};
store.dispatch(payLoan());                                                  console.log(store.getState());  // {balance: 300, loan: 0, loanPurpose: ''}

function reset(){return {type : "account/reset"}};
store.dispatch(reset());                                                    console.log(store.getState());  // {balance: 0, loan: 0, loanPurpose: ''}
