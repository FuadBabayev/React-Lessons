import { useState } from "react";

const still = {
  padding: "20px",
  boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
  borderRadius: "7px",
};

function TextExpander({ text, collapsedNumWords }) {
  const [showMore, setShowMore] = useState(false);
  const handleShow = () => {
    setShowMore(() => !showMore);
  };
  return (
    <>
      <p style={still}>
        {showMore ? `${text}` : `${text.split(" ").slice(0, collapsedNumWords).join(' ')}...`} &nbsp;
        <span
          style={{ color: "blue", cursor: "pointer", fontSize: "14px" }}
          onClick={handleShow}
        >
          {showMore ? "Show less..." : "Show more..."}
        </span>
      </p>
    </>
  );
}

export default TextExpander;
