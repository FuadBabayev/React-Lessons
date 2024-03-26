import { createSlice } from "@reduxjs/toolkit";

// * INITIAL STATE
const initialState = {
    fullName: "",
    nationalID: "",
    createdAt: ""
};
 
// * REDUCER and ACTION CREATORS all together
const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        createCustomer: {
            prepare: function(fullName, nationalID) {        // ! Preparede funksiyaya gondeirlecek deyerler yazilir createdAt gondermirik cunki avtomatik yaranir
                return {
                    payload: {                                  // ! Payloadda ise reducerde gosterilecek butun deyeler yazilir
                        fullName,
                        nationalID,
                        createdAt : new Date().toUTCString(),       // ! we cant write side effect in reducer but can write in prepare
                    }
                }
            },
            reducer(state, action) {
                state.fullName = action.payload.fullName;
                state.nationalID = action.payload.nationalID;
                state.createdAt = action.payload.createdAt;
            },
        },
        updateName(state, action) {
            state.fullName = action.payload;
        },
    }
});
console.log(customerSlice);
export const { createCustomer, updateName } = customerSlice.actions;
export default customerSlice.reducer;

// // * INITIAL STATE
// const initialStateCustomer = {
//     fullName: "",
//     nationalID: "",
//     // createdAt: ""
// };


// // * REDUCER
// export default function customerReducer(state = initialStateCustomer, action) {
//     switch (action.type) {
//         case "customer/createCustomer":
//             return {
//                 ...state,
//                 fullName: action.payload.fullName,
//                 nationalID: action.payload.nationalID,
//                 // createdAt: action.payLoad.createdAt
//             };
//         case "customer/updateName":
//             return {
//                 ...state,
//                 fullName: action.payload
//             };
//         default: return state;
//     }
// }


// // * ACTION CREATORS
// export function createCustomer(fullName, nationalID) {
//     return {
//         type: "customer/createCustomer",
//         payload: {
//             fullName,
//             nationalID,
//             // createdAt: new Date().toISOString()
//         }
//     }
// };

// export function updateName(fullName) {
//     return {
//         type: "customer/updateName",
//         payload: fullName
//     }
// };

