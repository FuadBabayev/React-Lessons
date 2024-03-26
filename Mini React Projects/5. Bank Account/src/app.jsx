import { useReducer } from "react";

const accBalance = 500;
const accDeposit = 150;
const accWithdraw = 50;
const accLoan = 5000;

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};
function reducer(state, action){
    if(!state.isActive && action.type !== 'openAccount') return state;
    switch (action.type){
        case 'openAccount' :
            return {...state, balance : accBalance, isActive : true}
        case 'deposit' :
            return {...state, balance : state.balance + action.payload }
        case 'withdraw' :
            return {...state, balance : state.balance < accWithdraw ? state.balance : state.balance - action.payload }
        case 'requestLoan' :
            if(state.loan > 0) return state;
            return {...state, balance : state.balance + action.payload, loan: action.payload}
        case 'payLoan' :
            if(state.loan <= 0) return state;
            return {...state, balance : state.balance > state.loan ? state.balance - action.payload : state.balance, loan : state.loan - action.payload}
        case 'closeAccount' :
            if(state.loan === 0 && state.balance === 0) return initialState;
            return state;
    default :
        throw new Error("Uncknow action");
    }
}
export default function App() {
    const [{balance, loan, isActive}, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="App">   
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p><button onClick={() => dispatch({ type : 'openAccount'})} disabled={isActive} >Open account</button></p>
      <p><button onClick={() =>dispatch({ type : 'deposit', payload : accDeposit})} disabled={!isActive}>Deposit 150</button></p>
      <p><button onClick={() =>dispatch({ type : 'withdraw', payload : accWithdraw})} disabled={!isActive} >Withdraw 50</button></p>
      <p><button onClick={() =>dispatch({ type : 'requestLoan', payload : accLoan})} disabled={!isActive} >Request a loan of 5000</button></p>
      <p><button onClick={() =>dispatch({ type : 'payLoan', payload : accLoan})} disabled={!isActive} >Pay loan</button></p>
      <p><button onClick={() =>dispatch({ type : 'closeAccount'})} disabled={!isActive} >Close account</button></p>
    </div>
  );
}
