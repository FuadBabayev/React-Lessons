// ! We can write this but it is wrong instead we use useSelector
// import store from "../../store";
// console.log(store.getState().customer);                             // {fullName: '', nationalID: '', createdAt: ''}
// store.dispatch({ type: "customer/createCustomer", payload: {fullName : 'Fuad Babayve', nationalID : "AZE15092439"} })
// console.log(store.getState().customer);                             // {fullName: 'Fuad Babayve', nationalID: 'AZE15092439'}


import { useSelector } from "react-redux";


function Customer() {
  const customer = useSelector((store)=>store.customer);               // ! useSelector store-den deyerleri oxumaq ucundur 
  console.log(customer);                                               // {fullName: '', nationalID: ''}

  
  return <h2>👋 Welcome, {customer.fullName}</h2>;
}

export default Customer;
