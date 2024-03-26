import { combineReducers, createStore } from "redux";

const initialStateAccount = { balance: 0, loan: 0, loanPurpose: "",};
const initialStateCustomer = { fullName: "", nationalID: "", createdAt: ""};

// ! HERE WE CREATE ONE ROOT REDUCER with combineReducers
const rootReducer = combineReducers({
    account : accountReducer,
    customer : customerReducer 
});
const store = createStore(rootReducer);

// Todo: For initialStateAccount
function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case "account/deposit": return { ...state, balance: state.balance + action.payload };
        case "account/withdraw": return { ...state, balance: state.balance - action.payload };
        case "account/requestLoan": if (state.loan > 0) return state; return { ...state, balance: state.balance + action.payload.amount, loan: action.payload.amount, loanPurpose : action.payload.purpose};
        case "account/payLoan": return { ...state, balance: state.balance - state.loan, loan: 0,  loanPurpose : "" };
        default: return state;
    }
}
function deposit(amount){ return {type : "account/deposit", payload : amount }};
function withdraw(amount){return {type : "account/withdraw", payload : amount }};
function requestLoan(amount, purpose){return {type : "account/requestLoan", payload : {    amount,    purpose}}};
function payLoan(){return {type : "account/payLoan"}};
// ! WE CANT CREATE STORE SECOND TIME INSTEAD WE WILL CREATE ONE ROOT REDUCER
// const store = createStore(accountReducer);           console.log(store.getState());
store.dispatch(deposit(500));                           console.log(store.getState());
store.dispatch(withdraw(200));                          console.log(store.getState());
store.dispatch(requestLoan(150, "Buy a car"));          console.log(store.getState().account);
store.dispatch(payLoan());                              console.log(store.getState().account); 



// Todo: For initialStatecustomer
function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
        case "customer/createCustomer": return { ...state, fullName: action.payload.fullName, nationalID : action.payload.nationalID, createdAt : action.payload.createdAt};
        case "customer/updateName": return { ...state, fullName: action.payload};
        default: return state;
    }
}
function createCustomer(fullName, nationalID){return {type : "customer/createCustomer", payload : {fullName, nationalID, createdAt : new Date().toUTCString()} }};
function updateName(fullName){return {type : "customer/updateName", payload : fullName}};
// ! WE CANT CREATE STORE SECOND TIME INSTEAD WE WILL CREATE ONE ROOT REDUCER
// const store = createStore(customerReducer);                   console.log(store.getState());
store.dispatch(createCustomer('Murad Babayev', "AA777777"));     console.log(store.getState());
store.dispatch(updateName('Fuad Babayev'));                      console.log(store.getState().customer);