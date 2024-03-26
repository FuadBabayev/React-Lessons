import { useState } from "react";

function TextExpanderChildren({ children }) {
  const [showMore, setShowMore] = useState(false);
  const handleShow = () => {
    setShowMore((show) => !show);
  };
  return (
    <div>
      <p>
        {showMore ? `${children}` : `${children.slice(0, 100)}...`}{" "}
        <span
          style={{ color: "blue", cursor: "pointer", fontSize: "14px" }}
          onClick={handleShow}
        >
          {showMore ? "Show less..." : "Show more..."}
        </span>
      </p>
    </div>
  );
}

export default TextExpanderChildren;
