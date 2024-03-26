import { useState } from "react"

function AccordionItem({number, title, text}) {
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = function(){
        // setIsOpen(!isOpen);
        setIsOpen((isOpen) => !isOpen);
    }
    return (
        <>  
        <div className={`item ${isOpen ? 'open' : ''} `}  onClick={handleToggle} /*style={{ borderTopColor : isOpen ? "green" : "" }}*/ >
            <p className="number">{number < 10 ? `0${number}` : number}</p>
            <p className="title" style={{ color : isOpen ? "deepskyblue" : "" }}>{title}</p>
            <p className="icon">{isOpen ? "-" : "+"}</p>
            {isOpen && <p className="content-box">{text}</p>}
        </div>
            
        </>
    )
}

export default AccordionItem
