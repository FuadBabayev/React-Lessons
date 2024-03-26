import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "./costumerSlice";

function Customer() {  
  const [fullName, setFullName] = useState("Fuad");
  const [nationalId, setNationalId] = useState("AZE15092439");

  const dispatch = useDispatch();                         // ! useDispatch store-deki actionlara deyerleri gondermek ucundur 
  function handleClick() {
    if(!fullName || !nationalId) return;
    dispatch(createCustomer(fullName, nationalId));
  }

  return (
    <div>
      <h2>Create new customer</h2>
      <div className="inputs">
        <div><label>Customer full name</label><input value={fullName} onChange={(e) => setFullName(e.target.value)} /></div>
        <div><label>National ID</label><input value={nationalId} onChange={(e) => setNationalId(e.target.value)} /></div>
        <button onClick={handleClick}>Create new customer</button>
      </div>
    </div>
  );
}

export default Customer;
