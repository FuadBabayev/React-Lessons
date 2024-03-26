# Redux
1. Create **store.js** file and fill it with below as same as useReducer
```bash
const initialState = {};
function reducer(state = initialState, action) {
    switch (action.type) {
        case "":
            return { ...state};
        default:
            return state;
    }
}
```
2. Donwload Redux package for **Redux Store** ```npm i redux``` and import
```bash
import { createStore } from "redux";
const store = createStore(reducer); 
action = { type : "account/update", payload : fullName}
store.dispatch(action);
console.log(store.getState());
```
    


# MAIN PART OF CREATING REDUX
1. Create **src/features** folder and fill it with ROOT REDUCER with combineReducers names folders such as **src/features/accounts || costumers** 
2. Create **src/featues/accounts/slicers** files each of ROOT REDUCER with combineReducers names folders
These slicers files basically corresponds to **initial state, reducer** and **action creater** for appropriate component
3. We must connect **Store** with **React app**: donwload react-redux ```npm i react-redux``` and import **import { Provider } from 'react-redux';**
4. For **read data** from Redux Store ```import { useSelector } from "react-redux";``` then ```const customer = useSelector((store)=>store.customer);```
5. For **call dispatch method** from Redux Store ```import { useDispatch } from "react-redux";``` => ```const dispatch = useDispatch();``` => ```dispatch(function())```

# Thunk (Middleware)
Reducer does not know and accept any Asynchronoues functions and side effects Just required pure functions. **Thunk** allows Redux to wait before dispatching the fetch data into the store. So we use it for especially **ASYNCHRONOUS** fetcing data, timer and etc. For use Middleware there are 3 steps:
1. Install Middleware package ```npm i redux-thunk``` then **connect Store with Thunk** ```import { thunk } from "redux-thunk";```
2. Apply Middleware to store ```const store = createStore(rootReducer, applyMiddleware(thunk));```
3. Use Middleware in our action creator functions
```bash 
export function deposit() {
    return async function (dispatch, getState) {    
        // * .... API Call here
        // * .... Return Action here
    }
};

```

# The Redux DevTools
For use The Redux DevTools there are 3 steps:
1. Install Google Chrome Extension Middleware    ```https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd```
2. Install The Redux DevTools NPM package        ```npm i redux-devtools-extension``` or ```npm install redux-devtools-extension --force```
3. Use The Redux DevTools in our store
```bash
import { composeWithDevTools } from "redux-devtools-extension";
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
```


# Redux Toolkit
1. Download **Redux Toolkit** package ```npm i @reduxjs/toolkit```
2. **configureStore in store** benefits: automatically combine our reducer, add Thunks middleware, set up DevTools. 
```bash
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
    reducer : {}
})
export default store;
```
3. **createSlice in slice.js** benefits: automatically create action creators from reducer, a lot easier to write, we can mutate state inside reducer.
```bash
import { createSlice } from "@reduxjs/toolkit";
const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {                                                         
        actionCreators(state, action) {},
        actionCreators2 : {
            prepare(param1, param2){
                return {
                    payload : {
                        param1,
                        param2,
                    }
                }
            },
            reducer(state, action){
                state.name = action.payload.param1;
            }
        }
    }
});
```



# Donwloaded Packages
1. **npm i redux**                          Redux Store
2. **npm i react-redux**                    Redux Provider
3. **npm i redux-thunk**                    Redux Thunk (Middleware)
4. **npm i redux-devtools-extension**       Redux DevTools
5. **npm i @reduxjs/toolkit**               Redux Toolkit

