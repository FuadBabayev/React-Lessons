import "../index.css";

function Header() {                     // ! Function Declaration (Default)
  const text = "Fast React Pizza Co.";
  console.log(text); // It show twice becauswe we are in <React.StrictMode>
  const styling = { fontSize: "48px", textTransform: "uppercase" }; // ! Internal CSS

  return (
    <>
      <header className="header">
        {/* <h1 style={{fontSize: "48px", textTransform : "uppercase"}}>{text}</h1>      // ! Inline CSS style={JSX{object}} */}
        <h1 style={styling}>{text}</h1>
      </header>
    </>
  );
}

export default Header;
