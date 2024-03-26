import { useState } from "react";

const Form = function ({onAddItems}) {                          //! Prosp olaraq handleAddItem funksiyasini aldiq
  const [description, setDescription] = useState(""); 
  const [quantity, setQuantity] = useState(1);
  // const [item, setItem] = useState([]);                      //! We cant pass it to packingList.jsx as props because it is not child Component of form Component
  // ! If we want to pass this state to Sibling or Parent component as PROPS we need to LIFT UP the STATE 
  // Todo: Yeni ana komponente vermek lazimdirki butun child componentlere el catan olsun (Ona gorede item statesini burdan goturub App componente qoyaq)

  // const handleAddItem = function(data){                      //* Gonderilmis Store Paremetrini data olaraq qebul eledik
  // setItem((item) => [...item, data]);                        //! React Stateni Mutate etmemelidir ona gore de her zaman COPY etmek lazimdir (...item)
  // }                                                          //* Evvelki melumatlari copy etdikden sonra yeni melumatlari daxil edirik (Array icinde olmalidir)

  const handleSubmit = (e) => {
    e.preventDefault();                                         //* Submit olunanda Refresh getmesin
    if (!description) return;                                   //* Inputun icin bos olsa islemesin
    const newItem = {                                           //* Yeni store yaradiriqki melumatlari icine daxil edek
      description: description,
      quantity,
      packed: false,
      id: Date.now(),
    };
    // handleAddItem(newItem);                                  //* Yaratdiqimiz Storeni Paremert kimi gonderdik
    onAddItems(newItem);                                        // ! handleAddItem funksiyasina newItem-i parametr kimi oturduk
    setDescription("");                                         //* Submit edildikden sonra Inputun deyeri sifirlansin
    setQuantity(1);                                             //* Submit edildikden sonra Selectin deyeri sifirlansin
  };

  return (
    <>
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for your 🎉 Trip?</h3>
        <select onChange={(e) => setQuantity(Number(e.target.value))} value={quantity}>
          {Array.from({ length: 20 }, (_, i) => i + 1).map((number, index) => (<option value={number} key={index}>{number}</option>))}
        </select>
        <input type="text" placeholder="Pieces you want..." onChange={(e) => setDescription(e.target.value)} value={description} />
        <button>Add</button>
      </form>
    </>
  );
};

export default Form;