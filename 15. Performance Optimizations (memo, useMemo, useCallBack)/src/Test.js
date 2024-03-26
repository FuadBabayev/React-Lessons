import { useState } from "react";

function SlowComponent() {
  // If this is too slow on your maching, reduce the `length`
  const words = Array.from({ length: 100_000 }, () => "WORD");
  return (
    <ul>
      {words.map((word, i) => (
        <li key={i}>
          {i}: {word}
        </li>
      ))}
    </ul>
  );
}

function Counter({children}){
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Slow counter?!?</h1>
      <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
      {children}
    </div>
  );
}

export default function Test() {
  // const [count, setCount] = useState(0);
  // return (
  //   <div>
  //     <h1>Slow counter?!?</h1>
  //     <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
  //      {/* // ! Bu halda buttona click olunanda cox gec artacaq cunki state deyisir ve child <SlowComponent /> re-render olunur 100000 defe ona gore gecikdirir 
  //          // ! Qarsisini almaq ucun bir birinden asili olmuyan component yaratmaq lazimdri children le*/}
  //     <SlowComponent />
  //   </div>
  // );
  return (
    <>
    <Counter>
      <SlowComponent /> 
      {/* // ! Bu sekilde children propsla yazsaq eger bir birinden asili olmadilqlari ucun her state deyisende child component re-render olunmur ve gecikdirmir */}
    </Counter>
    </>
  )
}
