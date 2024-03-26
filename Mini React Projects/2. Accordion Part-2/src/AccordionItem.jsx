// import { useState } from "react"

function AccordionItem({number, title, text, curOpen, onOpen}) {
    const isOpen = (number === curOpen);
    const handleToggle = () => {
        onOpen(isOpen ? null : number);                 // ! Ana componente props gonderir (daha dogrusu LIFT UP edir stateni)
    }
    return (
        <>  
        <div className={`item ${isOpen ? 'open' : ''} `} onClick={handleToggle}>
            <p className="number">{number < 10 ? `0${number}` : number}</p>
            <p className="title" style={{ color : isOpen ? "deepskyblue" : "" }}>{title}</p>
            <p className="icon">{isOpen ? "-" : "+"}</p>
            {isOpen && <p className="content-box">{text}</p>}
        </div>            
        </>
    )
}

export default AccordionItem
