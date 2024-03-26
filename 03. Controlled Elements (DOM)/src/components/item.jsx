const Item = ({ info }) => {
  return (
    <>
      <li>
        <span style={info.packed ? { textDecoration: "line-through" } : {}}>{info.quantity} {info.description}</span>
        <button><i className="fa-solid fa-trash fa-bounce" style={{ color: "#f50505" }}></i></button>
      </li>
    </>
  );
};

export default Item;
