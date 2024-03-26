1. npm i @reduxjs/toolkit react-redux
a. **userSlice.js** daxilinde state ve reducer&actionCreator yarat ve ```export const { actionCreator } = userSlice.actions;    export default userSlice.reducer;```
b. **store.js** daxilinde butun sliceleri birlesdir                   ```const store = configureStore({reducer: {user: userReducer}}); export default store;```
c. **main.jsx** daxilinde storeni butun componentler ucun elcatan et  ```<Provider store={store}><App /></Provider>```
d. Istelinen component daxilinde
i. Storedeki stateleri **read** etmek ucun                            ```const user = useSelector((state) => state.user); ```
ii. Storedeki stateleri **update** etmek ucun                         ```const dispatch = useDispatch(); dispatch(actionCreator(params))```