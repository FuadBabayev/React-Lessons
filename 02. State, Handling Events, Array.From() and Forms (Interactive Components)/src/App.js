import { useState } from 'react';
import './App.css';
import DateCounter from './components/dateCounter';

const messages = ["Learn React ⚛️", "Apply for jobs 💼", "Invest your new income 🤑", "Be a famous billioner 💵"];

function App() {
  // const steps = useState(10); console.log(steps);          // ! useState is array: B(2) [10, ƒ()]
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const handlePrev = function () {
    if (step > 1) {
      setStep((curStep) => curStep - 1);
      setStep((curStep) => curStep - 1);      // ! It change twice because we pass callback function and it changes state based on current state
    }       
    // if(step === 3) setStep(1);
  }
  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
      setStep(step + 1);
      setStep(step + 1);          // ! Although it written 3 times only 1 times work because we pass value and it DOES NOT changes => state NOT based on current state
    }
    // if(step === 1) setStep(3);
  }
  // function handleHide(){s
  //   setIsOpen(!isOpen)
  // }
  return (
    <>
    <button className='close' onClick={() => setIsOpen(!isOpen)}>&times;</button>
      {isOpen && <div className="App">
        <div className='steps'>
          <div className='numbers'>
            <div className={step >= 1 ? 'active' : ''}>1</div>
            <div className={`${step >= 2 ? 'active' : ''}`}>2</div>
            <div className={step >= 3 ? 'active' : null}>3</div>
            <div className={step >= 4 ? 'active' : null}>4</div>
          </div>
          <p className='message'>Step {step}: {messages[step - 1]}</p>
          <div className='buttons'>
            <button style={{ backgroundColor: "#7950f2", color: "#fff" }} onClick={handlePrev}>Previous</button>
            <button style={{ backgroundColor: "#7950f2", color: "#fff" }} onClick={handleNext}>Next</button>
          </div>
        </div>
      </div>}

      <DateCounter />
    </>
  );
}

export default App;
