import React, { useEffect, useRef, useState } from "react";

// ! useRef DOM elementleri daxilinde
// ! useRef-den daha cox DOM elemetleri etcatan etmek (Vanilla JavaScriptdeki kimi) ucun istifade olunur ve hemin element uzerinde gezinmek ucun ref-den istifade et
// ! Qisaca JavaScriptde elemtni tutmaq ucun document.querySelector() istifade etdiyim halda Reactda useRef() ve ref-dan istifade olunur
// Todo: useRef() baslangicda NULL kimi baslayir render olunduqdan sonra (useEffect) ref-in aid olduqu element olacaq


// ! useRef DOM elementleri xaricinde
// * Biz bilirikde useState-nin daxilindeki deyer deyisilinede page avtomatik olaraq re-render olur
// Todo: ancaq useRef-in daxilindeki deyer deyisilinde re-rendern olunmuyacaq

function UseReference() {
 // ! useRef DOM elementleri daxilinde
  const inputRef = useRef();             //  console.log(inputRef);     {current: undefined}
  const divRef = useRef();               //  console.log(divRef);       {current: undefined}

  // ! useRef DOM elementleri xaricinde
  const valueRef = useRef(0);            // console.log(valueRef);      {current: 0}
  const [render, setRender] = useState({});         // ! bilerekden obyetk yazdiq cunki REFERENCE tipdir

  function handleClick() {
    inputRef.current.focus();
    divRef.current.style.backgroundColor = "red";
  }
  function increaseRef(){
    valueRef.current = valueRef.current + 1;
    setRender({});                                  // ! Bele olmasina baxmayraq her defe re-rendere sebeb olur
  }

  useEffect(function () {
    // console.log(inputRef);              //  {current: input}
    // console.log(inputRef.current);      //  <input type="text" placeholder="Search">

    console.log(valueRef);                 // ! eslinde her clikc olunanda deyer artir ama useRef olduqu ucun re-renden getmediyi ucun onu gormuruk
    // Todo: Amma useState-den istifade etdiyimz ucun ve state deyeri her update olunanda page re-render olunduqu ucun mecbur olaraq useRef-in deyeride deyisir
  }, [render]);

  return (
    <div ref={divRef}>
      <input ref={inputRef} type="text" placeholder="Search" /> <br />
      <button onClick={handleClick}>Focus to Input</button> <br />
      <button onClick={increaseRef}>Increase Ref Value</button>
    </div>
  );
}

export default UseReference;
