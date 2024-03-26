import { useState } from "react";

function DateCounter() {
  const [steps, setSteps] = useState(1);
  const [count, setCount] = useState(0);
  const time = new Date().toDateString();

  const date = new Date("23 october 2024"); 
  date.setDate(date.getDate() + count);

//   const handelsome = () => {                     // ! Totally same with inline JavaScript
//     setCount((count) => count + 1);
//   };
  return (
    <>
      <button onClick={() => setSteps((num) => num - 1)}>-</button> &nbsp; &nbsp;
      <span>Steps : {steps}</span>&nbsp; &nbsp;
      <button onClick={() => setSteps((num) => num + 1)}>+</button> <br />


      <button onClick={() => setCount((num) => num - steps)}>-</button> &nbsp; &nbsp;
      <span>Count : {count}</span>&nbsp; &nbsp;
      <button onClick={() => setCount((num) => num + steps)}>+</button>
      <p>{count === 0 ? "Today is" : count > 0 ? `${count} days from today is` : `${Math.abs(count)} days ago was`} {date.toDateString()}</p>
    </>
  );
}

export default DateCounter;
