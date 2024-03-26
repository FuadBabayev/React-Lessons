// * INITIAL STATE
const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false
};


// * REDUCER
export default function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case "account/deposit":
            return {
                ...state,
                balance: state.balance + action.payload,
                isLoading : false
            };
        case "account/withdraw":
            return {
                ...state,
                balance: state.balance - action.payload
            };
        case "account/requestLoan":
            if (state.loan > 0) return state;
            return {
                ...state,
                balance: state.balance + action.payload.amount,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose
            };
        case "account/payLoan":
            return {
                ...state,
                balance: state.balance - state.loan,
                loan: 0,
                loanPurpose: ""
            };
        case "account/convertingCurrency":
            return {
                ...state,
                isLoading: true
            };
        default: return state;
    }
}

// * ACTION CREATORS
export function deposit(amount, currency) {
    if (currency === "USD") return { type: "account/deposit", payload: amount };

    // Todo: If we return function instead of action then Redux knows that is the asynchronous action => THUNK (MiddleWare)
    return async function (dispatch, getState) {                                  // ! Asynchronous functions THUNK
        // * API Call
        dispatch({ type: "account/convertingCurrency" });
        const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
        const data = await response.json();
        // console.log(data);          // {amount: 100, base: 'EUR', date: '2024-03-08', rates: { USD : 109.32}}

        // * Return Action (dispact value into Store and also instead oof return we must write disptach)
        /* return */ dispatch({ type: "account/deposit", payload: data.rates.USD });
    }
};

export function withdraw(amount) {
    return {
        type: "account/withdraw",
        payload: amount
    }
};

export function requestLoan(amount, purpose) {
    return {
        type: "account/requestLoan",
        payload: {
            amount,
            purpose
        }
    }
};

export function payLoan() {
    return {
        type: "account/payLoan"
    }
};