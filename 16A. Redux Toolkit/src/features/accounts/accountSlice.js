import { createSlice } from "@reduxjs/toolkit";

// * INITIAL STATE
const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false
};

// * REDUCER and ACTION CREATORS all together
const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {                                                         // ! We can write MUTATING logic in Toolkit but not in Redux or useReducer
        deposit(state, action) {                                        // ! Burada deposit sadece olaraq reducerdir ama digerlerinde ise hem reducer hemde action creator
            state.balance = state.balance + action.payload;             // ! NOT "balance = state.balance + action.payload" because we must MUTATE state
            state.isLoading = false;
        },
        withdraw(state, action) {
            state.balance -= action.payload;
        },
        requestLoan : {
            prepare(amount, purpose){                        // ! Eger 1den cox argument alsa hansinin hansina aid olmasini bildirmek ucun Prepare-den istifade olunur
                return{                                      // ! Yoxsa action.payload.amount bunun hansi deyer olduqunu tanimiyacaq
                    payload : {
                        amount : amount,
                        purpose : purpose,
                    }
                }
            },
            reducer(state, action) {
                if (state.loan > 0) return /* state */;                     // ! There is no need return entire state because we mutate it (It is not Object)
                state.balance = state.balance + action.payload.amount;
                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
            },
        },
        payLoan(state, action) {
            state.balance = state.balance - state.loan;        // ! PAY ATTENTION ORDER OF CODE (eger loan balanceden evvel yazilsaydi 0 olduqu ucun balanceden 0 cixacaqdi)
            state.loan = 0;
            state.loanPurpose = "";
        },
        convertingCurrency(state, action){
            state.isLoading = true;
        }
    }
});

// Todo: createAsyncThunk is totally same as in Redux and we must write it out of createSlice           IT IS NOT A TOOLKIT WAY
export function deposit(amount, currency) {
    if (currency === "USD") return { type: "account/deposit", payload: amount };

    return async function (dispatch, getState) {
        dispatch({ type: "account/convertingCurrency" });
        const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
        const data = await response.json();        
        dispatch({ type: "account/deposit", payload: data.rates.USD });
    }
};

console.log(accountSlice);          // {name: 'account', reducer: ƒ reducer(state, action), actions: {deposit: ƒ, withdraw: ƒ, requestLoan: ƒ, payLoan: ƒ} …}
console.log(accountSlice.actions.requestLoan(1000, "Buy Car"));     // ! {type: 'account/requestLoan', payload: 1000}                                ilk one bele idi
console.log(accountSlice.actions.requestLoan(1000, "Buy Car"));     // ! {type: 'account/requestLoan', payload: {amount: 1000, purpose: 'Buy Car'}}  PREPARE-den sonra


export const {/* deposit, */ withdraw, requestLoan, payLoan } = accountSlice.actions;      // ! There is no need to export deposit here because already exported
export default accountSlice.reducer;                            // * initialStateni export etmirik cunki avtomitik olaraq accountSlice-nin icinden export olunur
// Todo: createSlice gives 3 big benefits: automatically create action creators from reducer, makes writing reducers a lot easier, we can mutate state inside reducer.




// ! This one belongs to React Redux (previos section)
// // * INITIAL STATE
// const initialStateAccount = {
//     balance: 0,
//     loan: 0,
//     loanPurpose: "",
//     isLoading: false
// };

// // * REDUCER
// export default function accountReducer(state = initialStateAccount, action) {
//     switch (action.type) {
//         case "account/deposit":
//             return {
//                 ...state,
//                 balance: state.balance + action.payload,
//                 isLoading : false
//             };
//         case "account/withdraw":
//             return {
//                 ...state,
//                 balance: state.balance - action.payload
//             };
//         case "account/requestLoan":
//             if (state.loan > 0) return state;
//             return {
//                 ...state,
//                 balance: state.balance + action.payload.amount,
//                 loan: action.payload.amount,
//                 loanPurpose: action.payload.purpose
//             };
//         case "account/payLoan":
//             return {
//                 ...state,
//                 balance: state.balance - state.loan,
//                 loan: 0,
//                 loanPurpose: ""
//             };
//         case "account/convertingCurrency":
//             return {
//                 ...state,
//                 isLoading: true
//             };
//         default: return state;
//     }
// }

// // * ACTION CREATORS
// export function deposit(amount, currency) {
//     if (currency === "USD") return { type: "account/deposit", payload: amount };

//     // Todo: If we return function instead of action then Redux knows that is the asynchronous action => THUNK (MiddleWare)
//     return async function (dispatch, getState) {                                  // ! Asynchronous functions THUNK
//         // * API Call
//         dispatch({ type: "account/convertingCurrency" });
//         const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
//         const data = await response.json();
//         // console.log(data);          // {amount: 100, base: 'EUR', date: '2024-03-08', rates: { USD : 109.32}}

//         // * Return Action (dispact value into Store and also instead oof return we must write disptach)
//         /* return */ dispatch({ type: "account/deposit", payload: data.rates.USD });
//     }
// };

// export function withdraw(amount) {
//     return {
//         type: "account/withdraw",
//         payload: amount
//     }
// };

// export function requestLoan(amount, purpose) {
//     return {
//         type: "account/requestLoan",
//         payload: {
//             amount,
//             purpose
//         }
//     }
// };

// export function payLoan() {
//     return {
//         type: "account/payLoan"
//     }
// };