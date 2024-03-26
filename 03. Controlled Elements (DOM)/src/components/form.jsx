import { useState } from "react";

const interval1 = Array.from({ length: 5 }, (a, i) => "Hello " + (i + 1));
// console.log(interval1); // ! (5) ['Hello 1', 'Hello 2', 'Hello 3', 'Hello 4', 'Hello 5']
const interval2 = Array.from({ length: 5 }, (_, i) => i + 1);
// console.log(interval2); // ! (5) [1, 2, 3, 4, 5]

const Form = function () {

  const handleSubmit2 = (event) => {
    event.preventDefault();
    // ! There are diffrent ways to Control (keep track) the following element
    // Todo: 1. DOM (It is not reccommended)
    console.log(event);                             // SyntheticBaseEvent {_reactName: 'onSubmit', type: 'submit', target: form.add-form, …}
    console.log(event.target);                      // <form class="add-form"><h3>What do...</h3></form>
    console.log(event.target[1].value);             // Input value
  };
  
  // Todo: 2. React useState (Recommmended) and value of input
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
//   const [obj, setObj] = useState({
//     quantity,
//     description,
//     packed : 'false',
//     id : Date.now()        
//     })

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(quantity);
    console.log(description);

    // setObj({
    //     quantity,
    //     description,
    //     packed : 'false',
    //     id : Date.now() 
    // })
    // console.log(obj);
    // ! Yuxaridaki usul elverissiz usuldur cunki 1 addim geride isleyir

    // ! Esasen istifade oluna usul asagidakidir 
    if(!description) return;                    // * Eger description valuesi bos olsa asagilar islemeyecek
    const newItem = {
        description : description, 
        quantity, 
        packed : "false", 
        id : Date.now()
    }
    console.log(newItem);
    setDescription("");
    setQuantity(1);
  } 

  return (
    <>
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for your 🎉 Trip?</h3>
        <select onChange={(e) => setQuantity(Number(e.target.value))} value={quantity}>
          {Array.from({ length: 20 }, (_, i) => i + 1).map((number, index) => (
            <option value={number} key={index}>
              {number}
            </option>
          ))}

          {/* <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
          <option value={11}>11</option>
          <option value={12}>12</option>
          <option value={13}>13</option>
          <option value={14}>14</option>
          <option value={15}>15</option>
          <option value={16}>16</option>
          <option value={17}>17</option>
          <option value={18}>18</option>
          <option value={19}>19</option>
          <option value={20}>20</option> */}
        </select>
        <input type="text" placeholder="Which Trip you want ..." onChange={(e) => setDescription(e.target.value)} value={description}/>
        <button>Add</button>
      </form>
    </>
  );
};

export default Form;
