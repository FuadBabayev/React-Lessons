import { useState } from "react"
import AccordionItem from "./AccordionItem";


export default function Accordion({ data }) {
  const [curOpen, setCurOpen] = useState(null);
  
    return (
      <>
      <div className="accordion">        
       {data.map((item, index) => <AccordionItem number={index + 1} title={item.title} text={item.text} key={index}
       curOpen={curOpen} onOpen={setCurOpen} />) }
      </div>
      </>
    );
  }
  