import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/costumers/costumerSlice";

const store = configureStore({
    reducer : {
        account : accountReducer,
        customer : customerReducer
    }
})

export default store;
// Todo: configureStore does a lot of things: automatically connect our reducer, add Thunks middleware, set up DevTools. That's why we dont need belows





// ! This one belongs to React Redux (previos section)
// import { applyMiddleware, combineReducers, createStore } from "redux";
// import accountReducer from "./features/accounts/accountSlice";
// import customerReducer from "./features/costumers/costumerSlice";
// import { composeWithDevTools } from "redux-devtools-extension";
// import { thunk } from "redux-thunk";

// const rootReducer = combineReducers({
//     account: accountReducer,
//     customer: customerReducer
// });

// const store = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(thunk))
// );

// export default store;