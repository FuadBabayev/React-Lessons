import React from "react";

const Footer = () => {
  // ! Arrow Function
  // return React.createElement('footer', null, "We're currently open!");         // ! Create <footer>We're currently open</footer>
  const time = new Date().getHours();
  console.log(time);
  const openHour = 9;
  const closeHour = 21;
  const isOpen = time >= openHour && time <= closeHour ? true : false;
  return (
  <React.Fragment key='Random Names'>                              {/* // ! Totally same thing with <></> */}
    <footer className="footer">
      {/* {isOpen && <h3><span style={{ backgroundColor: "yellow" }}>{new Date().toLocaleTimeString()}</span> We're currently open!</h3>}    // ! Short Circuiting */}

      {isOpen                                                                                                                                // ! Ternary operator
      ? (<h3><span style={{ backgroundColor: "yellow" }}>{new Date().toLocaleTimeString()}</span> We're currently open!</h3>) 
      : (<>
          <p>We're open between {openHour}: 00 and {closeHour}: 00. Come visit us or order online.</p>
          <button className="btn">Order</button>
        </>
      )
      }     
    </footer>
  </React.Fragment>
  );
};

export default Footer;