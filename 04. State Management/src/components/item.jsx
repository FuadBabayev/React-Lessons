const Item = ({ info, funk, funk2 }) => {
  
  return (
    <>
      <li>
        <input type="checkbox" onChange={() => {funk2(info.id)}} value={info.packed} checked={info.packed ? true : false} />
        <span style={info.packed ? {textDecoration: "line-through"} : {}}>{info.quantity} {info.description}</span>
        <button onClick={() => funk(info.id)}><i className="fa-solid fa-trash" style={{ color: "#f50505" }}></i></button>
        {/* onClick={() => funk(info.id)} bu cur yazdiq cunki avtomatik funksiyani isletmesin deye Click olunanda isletsin */}
        {/* onClick={funk(info.id)} bu cur yazsaydiq avtomatik funksiyani islederdi bu ise ERROR demekdir */}
      </li>
    </>
  );
};

export default Item;
