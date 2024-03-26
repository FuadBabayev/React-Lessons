import React, { useState } from "react";
import Logo from "./components/logo";
import Form from "./components/form";
import PackingList from "./components/packingList";
import Stats from "./components/stats";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Jackets", quantity: 7, packed: true }
];

function App() {
  const [item, setItem] = useState([...initialItems]); 
  const handleAddItem = function(data){
    setItem((item) => [...item, data]);  
  }                                    
  const handleDeleteItem = function(id){
    setItem((item) => item.filter(deletedOne => deletedOne.id !== id));  
  }     
  const handleToggleeItem = (id) => {
    setItem(item => item.map(data => data.id === id ? {...data, packed: !data.packed} : data));
  }   
  function handleClearList(){
    let confirmed = window.confirm('Do You really want to delete All Datas');
    if(confirmed) setItem([]);
  }                        
  return (
    <>
      <div className="app">
        <Logo />
        <Form onAddItems={handleAddItem} /> 
        <PackingList /* datas={initialItems} */ datas={item} onDelete={handleDeleteItem}  
        onToggle={handleToggleeItem} onClear={handleClearList}/>      {/* //* Burada artiq gonderilen PROPS deyisdirildi */}
        <Stats allDatas={item} />
      </div>
      <img src="assets/Local&Global State.png" style={{ width: "80%", display : "flex", justifyContent : "center", margin : "0 auto", border: "10px solid black" }} alt="Local Global State" /> <br />
      <img src="assets/State Management.png" style={{ width: "80%", display : "flex", justifyContent : "center", margin : "0 auto", border: "10px solid black" }} alt="State Management" /> <br />
    </>
  );
}

export default App;