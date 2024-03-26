import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getAddress} from "../../services/apiGeocoding";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

const initialState = {
  username: "",
  status: 'idle',
  position : {},
  address : '',
  error : "",
};

// ! We cant call async functions directly inside Redux Reducer (because Redux is by nature completely synchronous). We need Thunk
// ! Thunk is Middleware that sits between the dispatching and reducer. In Redux Toolkit we use createAsyncThunk. 
// ! createAsyncThunk receives 2 parametr (actionName, async function) and dont use get keyword in the name calling. (it is for only useSelector)
// Todo: createAsyncThunk produce 3 action type: Depending promise state, fulfilled, rejected => and we handle(connect) them into our reducer (with extraReducers)
export const fetchAddress = createAsyncThunk('user/fetchAddress', async function(){               // ! Now it is action creator function and later we call in our code
  const positionObj = await getPosition();                // 1) We get the user's geolocation position
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };
  
  const addressObj = await getAddress(position);          // 2) Then we use a reverse geocoding API to get user's address
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;
  
  // * Payload of Fulfilled state                           3) Then we return an object with the data that we are interested in
  return { position, address };
});


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>                                               // ! createAsyncThunk-in reducerleri bura gelir cunki Asynchronous-dur
  builder.addCase(fetchAddress.pending, (state, action) => {                // Todo: Depending promise state
    state.status = "loading";
  })
  .addCase(fetchAddress.fulfilled, (state, action) => {                     // Todo: fulfilled
    state.status = "idle";
    state.position = action.payload.position;
    state.address = action.payload.address;
  })
  .addCase(fetchAddress.rejected, (state, action) => {                      // Todo: rejected
    state.status = 'error';
    state.error = "There was a problem getting your address"; /* // ! OR action.error.message */;
  })
});

export const { updateName } = userSlice.actions;
export default userSlice.reducer;