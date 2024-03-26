import { useState } from 'react';
import './App.css';

const messages = ["Learn React ⚛️", "Apply for jobs 💼", "Invest your new income 🤑", "Be a famous billioner 💵"];

export default function App() {
  return (
    <>
      <Steps />
    </>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  const handlePrev = function () { if (step > 1) setStep((curStep) => curStep - 1) }
  const handleNext = () => { if (step < 4) setStep(step + 1) }

  return (
    <>
      <button className='close' onClick={() => setIsOpen((isOpen) => !isOpen)}>&times;</button>
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

            {/* // ! Bu cur yazanda ancaq sablon sekilde eyni olacaqlar */}
            {/* <Button textColor="#fff" bgColor="#7950f2" onClick={handlePrev} text="Previous" emoji="👈" />
            <Button textColor="#fff" bgColor="#7950f2" onClick={handleNext} text="Next" emoji="👉" /> */}

            {/* // ! Istediyimiz yerde istediyimiz seyi yazmaq ucun CHILDREN istifade olunur ve CLOSING TAGS */}
            {/* // ! <Button>CHILDREN</Button> yeni ki bu hisse : "<span>👈</span> Previous"  child componentde {children} olur*/}
            <Button textColor="#fff" bgColor="#7950f2" onClick={handlePrev}><span>👈</span> Previous</Button>
            <Button textColor="#fff" bgColor="#7950f2" onClick={handleNext}>Next <span>👉</span> </Button>
          </div>
        </div>
      </div>}
    </>
  )
}

function Button({textColor, bgColor, onClick /* text, emoji*/, children}){          // ! Burada children qeyd edirik
  return (
    <>
    {/* // ! Yuxarida ilk yazilan CHILDREN-siz sablon halidir bu deyismek olmur */}
    {/* <button style={{ backgroundColor: bgColor, color: textColor }} onClick={onClick}> <span>{emoji}</span> {text}</button> */}

    {/* // ! Sablondan kenar yazmaq ucun bele etmek lazimdir */}
    <button style={{ backgroundColor: bgColor, color: textColor }} onClick={onClick}>{children}</button>
    </>
  )
}